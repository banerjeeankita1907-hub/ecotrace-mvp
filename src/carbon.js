"use strict";

const ELECTRICITY_UNIT = "kgCO2e/kWh";
const COMMUTE_UNIT = "kgCO2e/passenger-km";

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function finiteNonNegative(value, field) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new TypeError(field + " must be a finite non-negative number");
  }
  return value;
}

function round(value, digits = 6) {
  const scale = 10 ** digits;
  return Math.round((value + Number.EPSILON) * scale) / scale;
}

function validateFactor(factor, expectedUnit, field) {
  if (!isObject(factor)) throw new TypeError(field + " factor must be an object");
  finiteNonNegative(factor.value, field + ".value");
  if (factor.value === 0) throw new RangeError(field + ".value must be greater than zero");
  if (factor.unit !== expectedUnit) {
    throw new TypeError(field + ".unit must be exactly " + expectedUnit);
  }
  if (!isObject(factor.source)
      || typeof factor.source.name !== "string"
      || !factor.source.name.trim()
      || typeof factor.source.reference !== "string"
      || !factor.source.reference.trim()) {
    throw new TypeError(field + ".source must include a name and reference");
  }

  const hasLow = factor.low !== undefined;
  const hasHigh = factor.high !== undefined;
  if (hasLow !== hasHigh) {
    throw new TypeError(field + " uncertainty must include both low and high bounds");
  }
  if (hasLow) {
    finiteNonNegative(factor.low, field + ".low");
    finiteNonNegative(factor.high, field + ".high");
    if (!(factor.low <= factor.value && factor.value <= factor.high)) {
      throw new RangeError(field + " must satisfy low <= value <= high");
    }
  }

  return {
    value: factor.value,
    unit: factor.unit,
    source: {
      name: factor.source.name.trim(),
      reference: factor.source.reference.trim(),
      version: typeof factor.source.version === "string" ? factor.source.version.trim() : null,
      retrievedAt: typeof factor.source.retrievedAt === "string" ? factor.source.retrievedAt : null,
    },
    uncertainty: hasLow ? { low: factor.low, high: factor.high } : null,
  };
}

function calculateCarbonFootprint(input) {
  if (!isObject(input)) throw new TypeError("Input must be a JSON object");
  if (!isObject(input.business) || typeof input.business.name !== "string" || !input.business.name.trim()) {
    throw new TypeError("business.name is required");
  }
  if (!isObject(input.reportingPeriod)) throw new TypeError("reportingPeriod is required");
  const months = input.reportingPeriod.months;
  if (!Number.isInteger(months) || months < 1 || months > 12) {
    throw new RangeError("reportingPeriod.months must be an integer from 1 to 12");
  }

  if (!isObject(input.electricity)) throw new TypeError("electricity activity is required");
  const electricityKwh = finiteNonNegative(input.electricity.kwh, "electricity.kwh");
  const electricityFactor = validateFactor(input.electricity.factor, ELECTRICITY_UNIT, "electricity");
  const electricityKg = electricityKwh * electricityFactor.value;

  if (!Array.isArray(input.commuting) || input.commuting.length > 20) {
    throw new TypeError("commuting must be an array with at most 20 entries");
  }

  const commuting = input.commuting.map((entry, index) => {
    const field = "commuting[" + index + "]";
    if (!isObject(entry) || typeof entry.mode !== "string" || !entry.mode.trim()) {
      throw new TypeError(field + ".mode is required");
    }
    const passengerKm = finiteNonNegative(entry.passengerKm, field + ".passengerKm");
    const factor = validateFactor(entry.factor, COMMUTE_UNIT, field);
    return {
      mode: entry.mode.trim(),
      passengerKm,
      factor,
      emissionsKg: passengerKm * factor.value,
      lowKg: factor.uncertainty ? passengerKm * factor.uncertainty.low : passengerKm * factor.value,
      highKg: factor.uncertainty ? passengerKm * factor.uncertainty.high : passengerKm * factor.value,
    };
  });

  const electricityLowKg = electricityFactor.uncertainty
    ? electricityKwh * electricityFactor.uncertainty.low
    : electricityKg;
  const electricityHighKg = electricityFactor.uncertainty
    ? electricityKwh * electricityFactor.uncertainty.high
    : electricityKg;

  const commutingKg = commuting.reduce((sum, entry) => sum + entry.emissionsKg, 0);
  const totalKg = electricityKg + commutingKg;
  const lowKg = electricityLowKg + commuting.reduce((sum, entry) => sum + entry.lowKg, 0);
  const highKg = electricityHighKg + commuting.reduce((sum, entry) => sum + entry.highKg, 0);

  const illustrativeFactors = [
    electricityFactor,
    ...commuting.map(entry => entry.factor),
  ].filter(factor =>
    factor.source.name.toLowerCase().includes("illustrative")
    || factor.source.reference.toLowerCase().includes("example-only")
  ).length;

  return {
    business: {
      name: input.business.name.trim(),
      industry: typeof input.business.industry === "string" ? input.business.industry.trim() : null,
    },
    reportingPeriod: {
      label: typeof input.reportingPeriod.label === "string" ? input.reportingPeriod.label : null,
      months,
    },
    methodology: {
      basis: "Activity data multiplied by user-supplied emission factors",
      units: "kg CO2-equivalent (kgCO2e)",
      factorUnitRequirements: {
        electricity: ELECTRICITY_UNIT,
        commuting: COMMUTE_UNIT,
      },
      factorSourcesRequired: true,
      illustrativeFactorCount: illustrativeFactors,
      warning: "Screening estimate only. Factor sources and boundaries must be reviewed before external reporting.",
    },
    breakdown: {
      electricity: {
        activityKwh: electricityKwh,
        factor: electricityFactor,
        emissionsKg: round(electricityKg),
      },
      commuting: commuting.map(entry => ({
        mode: entry.mode,
        passengerKm: entry.passengerKm,
        factor: entry.factor,
        emissionsKg: round(entry.emissionsKg),
      })),
    },
    totals: {
      emissionsKg: round(totalKg),
      emissionsTonnes: round(totalKg / 1000),
      uncertaintyRangeKg: {
        low: round(lowKg),
        high: round(highKg),
      },
      uncertaintyRangeTonnes: {
        low: round(lowKg / 1000),
        high: round(highKg / 1000),
      },
    },
  };
}

module.exports = {
  ELECTRICITY_UNIT,
  COMMUTE_UNIT,
  calculateCarbonFootprint,
};
