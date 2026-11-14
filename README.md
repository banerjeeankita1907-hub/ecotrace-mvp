# EcoTrace — Auditable MSME Carbon Screening

EcoTrace is an activity-based carbon-footprint calculator designed as a
transparent starting point for small-business reporting. It combines
electricity use and employee commuting activity with emission factors supplied
by the assessor.

The calculation engine is independent of any one factor database. Each factor
must carry its unit and a source reference; optional low/high factor bounds are
propagated into an output uncertainty range.

> **Important:** The included sample uses explicitly illustrative factors.
> It is a software demonstration, not a verified footprint for a real business.
> Replace every illustrative factor with a documented, region- and
> period-appropriate source before making a claim or sharing a report.

## Features

- Electricity activity in kWh multiplied by a factor in kgCO2e/kWh.
- Employee commuting in passenger-km multiplied by a factor in
  kgCO2e/passenger-km.
- Required factor source name and reference for every activity line.
- Optional low/high factor bounds and uncertainty-range propagation.
- Machine-readable JSON output in kgCO2e and tonnes CO2e.
- Strict validation of units, activity values, reporting periods and source metadata.
- Command-line report generator with no third-party runtime dependencies.
- Google Apps Script email workflow that requires explicit consent and
  source-backed factors before sending a report.
- Automated unit tests and GitHub Actions CI.

## Quick start

Requires Node.js 18 or newer.

```bash
npm test
node scripts/calculate-report.js examples/illustrative-msme.json report.json
```

The example produces a JSON report and prints the estimated period total. It
also displays a warning because the sample factor sources are marked
illustrative.

## Calculation method

For electricity:

```text
electricity emissions (kgCO2e) = electricity kWh × factor (kgCO2e/kWh)
```

For commuting:

```text
commuting emissions (kgCO2e) = passenger-km × factor (kgCO2e/passenger-km)
```

The calculator adds the activity line items and divides by 1,000 to report
tonnes CO2e. No monthly or annual extrapolation is applied automatically:
activity data and emission factors must refer to the same reporting period.
The reporting period is recorded as metadata for traceability.

Where low/high factor values are supplied, the calculator multiplies the same
activity data by each bound and adds line-item bounds to produce an indicative
range. It does not estimate uncertainty in activity measurements, boundaries
or omitted sources.

## Input schema

See [examples/illustrative-msme.json](examples/illustrative-msme.json).
Required factor units are:

- Electricity: `kgCO2e/kWh`
- Commuting: `kgCO2e/passenger-km`

Every factor requires `source.name` and `source.reference`. Optional
`version` and `retrievedAt` fields help record provenance. Factor references
are recorded, not independently verified by the program.

## Email report workflow

`scripts/autoEmailCarbonReport.js` is a Google Apps Script workflow. It expects
the exact Tally sheet headers listed in
[docs/google-sheets-workflow.md](docs/google-sheets-workflow.md). It sends only
rows where Consent is YES/TRUE and Report sent at is blank. It marks a row as
sent after the email API returns successfully. Configure and test it in a
separate spreadsheet before connecting any live customer data.

## Project structure

```text
src/carbon.js
scripts/calculate-report.js
scripts/autoEmailCarbonReport.js
examples/illustrative-msme.json
tests/carbon.test.cjs
docs/
  methodology.md
  google-sheets-workflow.md
.github/workflows/ci.yml
```

## Limits and responsible use

This is a screening calculator, not a verified GHG inventory, assurance
statement, life-cycle assessment, regulatory filing or carbon-credit method.
It currently covers only the electricity and commuting activities entered by
the user. It omits other sources unless they are added explicitly. It does not
verify source factors, organisational boundaries, reporting completeness or
data quality.

For external disclosure, use documented factors appropriate to the country,
grid region, time period, technology and accounting boundary. Preserve
evidence, review units and assumptions, and obtain qualified review where
required.

## Licence

No separate licence file is currently provided. Ask before reusing or
redistributing this repository's code.
