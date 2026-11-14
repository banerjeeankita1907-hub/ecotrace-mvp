"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { calculateCarbonFootprint } = require("../src/carbon");

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3] || "carbon-report.json";
  if (!inputPath) {
    console.error("Usage: node scripts/calculate-report.js <input.json> [output.json]");
    process.exitCode = 2;
    return;
  }

  try {
    const absoluteInput = path.resolve(inputPath);
    const data = JSON.parse(fs.readFileSync(absoluteInput, "utf8"));
    const report = calculateCarbonFootprint(data);
    const absoluteOutput = path.resolve(outputPath);
    fs.writeFileSync(absoluteOutput, JSON.stringify(report, null, 2) + "\n", "utf8");
    console.log("Report written to " + absoluteOutput);
    console.log("Estimated period footprint: " + report.totals.emissionsTonnes + " tCO2e");
    if (report.methodology.illustrativeFactorCount > 0) {
      console.warn("WARNING: one or more factor sources are marked illustrative; do not use this report for external disclosure.");
    }
  } catch (error) {
    console.error("Carbon report failed: " + error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { main };
