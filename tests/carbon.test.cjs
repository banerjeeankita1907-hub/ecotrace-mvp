const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateCarbonFootprint, ELECTRICITY_UNIT, COMMUTE_UNIT } = require("../src/carbon");

const sample = {
  business: { name: "Example Cafe", industry: "food service" },
  reportingPeriod: { label: "Illustrative quarter", months: 3 },
  electricity: {
    kwh: 900,
    factor: {
      value: 0.7,
      low: 0.6,
      high: 0.8,
      unit: ELECTRICITY_UNIT,
      source: { name: "Illustrative factor", reference: "example-only" },
    },
  },
  commuting: [
    {
      mode: "bus",
      passengerKm: 1200,
      factor: {
        value: 0.05,
        low: 0.04,
        high: 0.06,
        unit: COMMUTE_UNIT,
        source: { name: "Illustrative factor", reference: "example-only" },
      },
    },
  ],
};

test("calculates activity data times factors with consistent kgCO2e units", () => {
  const report = calculateCarbonFootprint(sample);
  assert.equal(report.breakdown.electricity.emissionsKg, 630);
  assert.equal(report.breakdown.commuting[0].emissionsKg, 60);
  assert.equal(report.totals.emissionsKg, 690);
  assert.equal(report.totals.emissionsTonnes, 0.69);
});

test("propagates low/high factor ranges without hiding the central estimate", () => {
  const report = calculateCarbonFootprint(sample);
  assert.equal(report.totals.uncertaintyRangeKg.low, 588);
  assert.equal(report.totals.uncertaintyRangeKg.high, 792);
  assert.equal(report.totals.emissionsKg, 690);
});

test("records source metadata and flags illustrative factor references", () => {
  const report = calculateCarbonFootprint(sample);
  assert.equal(report.methodology.illustrativeFactorCount, 2);
  assert.equal(report.breakdown.electricity.factor.source.reference, "example-only");
});

test("supports zero activity and an empty commuting list", () => {
  const input = {
    business: { name: "No commute test" },
    reportingPeriod: { months: 1 },
    electricity: {
      kwh: 0,
      factor: { value: 1, unit: ELECTRICITY_UNIT, source: { name: "Source", reference: "Dataset v1" } },
    },
    commuting: [],
  };
  const report = calculateCarbonFootprint(input);
  assert.equal(report.totals.emissionsKg, 0);
  assert.equal(report.totals.emissionsTonnes, 0);
});

test("rejects unsupported units, missing source and invalid activity data", () => {
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    electricity: { ...sample.electricity, factor: { ...sample.electricity.factor, unit: "kg/kWh" } },
  }), /unit must be exactly/);
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    electricity: { ...sample.electricity, factor: { value: 0.7, unit: ELECTRICITY_UNIT } },
  }), /source must include/);
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    electricity: { ...sample.electricity, kwh: -1 },
  }), /non-negative/);
});

test("rejects invalid reporting period and uncertainty intervals", () => {
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    reportingPeriod: { months: 13 },
  }), /integer from 1 to 12/);
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    electricity: {
      ...sample.electricity,
      factor: { ...sample.electricity.factor, low: 0.9, high: 0.8 },
    },
  }), /low <= value <= high/);
});

test("rejects too many commuting categories", () => {
  assert.throws(() => calculateCarbonFootprint({
    ...sample,
    commuting: Array.from({ length: 21 }, () => sample.commuting[0]),
  }), /at most 20/);
});
