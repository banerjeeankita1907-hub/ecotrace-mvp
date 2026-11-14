# EcoTrace calculation methodology

## Boundary

The current engine calculates only the activities explicitly supplied:
purchased electricity and employee commuting. It does not infer other
emissions sources, estimate missing activity, annualize partial data or assign
a certification/compliance grade.

## Units

The electricity activity is kWh for the stated reporting period. The factor
must be kgCO2e per kWh.

The commute activity is passenger-km for the same reporting period. The factor
must be kgCO2e per passenger-km. A vehicle-km factor must not be entered in
this field without converting it to a passenger-km basis using a documented
occupancy assumption.

## Line-item formulae

    electricity_kgCO2e = electricity_kWh × electricity_factor

    commuting_kgCO2e = passenger_km × commute_factor

    total_kgCO2e = sum(line_item_kgCO2e)
    total_tCO2e = total_kgCO2e / 1000

Activity data and factors must cover the same dates and accounting boundary.
The calculator records the reporting-period label and duration but does not
change activity values to make them annual.

## Factor provenance

Every factor requires:
- A numeric positive factor value.
- An exact expected unit.
- A source name.
- A source reference (document, dataset or URL).
- Optional version and retrieval date.
- Optional low/high factor values satisfying low <= value <= high.

The application stores source metadata but does not fetch or validate the cited
source. Users must verify that the source covers the correct geography,
technology, year, gas basis and reporting boundary.

## Uncertainty range

If a line-item factor has low and high bounds, the calculator multiplies the
activity value by each bound. Line-item lower and upper values are summed to
produce an aggregate range. If a factor has no range, its central value is
used as both bounds for that line item.

This is a deterministic factor-range propagation, not a confidence interval or
probabilistic uncertainty model. It excludes uncertainty in activity data,
meter quality, business boundaries, missing sources and factor correlation.

## Example status

The example JSON contains intentionally illustrative factors to exercise the
calculation and uncertainty code. The report flags those sources. Do not
interpret its numeric output as an actual business footprint or regional
emissions estimate.
