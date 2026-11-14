# Google Sheets email-report workflow

The Apps Script at `scripts/autoEmailCarbonReport.js` reads a sheet named
`Tally`. The header row must contain these exact column names:

| Column header | Meaning |
|---|---|
| Business name | Business display name |
| Email | Recipient email address |
| Electricity kWh | Electricity activity for the reporting period |
| Electricity factor kgCO2e/kWh | User-supplied electricity factor |
| Electricity factor source | Source reference for that factor |
| Commute passenger-km | Employee commuting activity for the reporting period |
| Commute factor kgCO2e/passenger-km | User-supplied commute factor |
| Commute factor source | Source reference for that factor |
| Reporting period | Human-readable period label |
| Consent | Must be YES or TRUE |
| Report sent at | Leave blank until a report is sent |

Run `sendCarbonReports()` from the Apps Script editor or a reviewed
time-driven trigger. The script processes only rows with explicit consent and
an empty sent timestamp. It validates email, text length, non-negative
activity, positive factors and source notes. The send timestamp is recorded
only after MailApp returns successfully.

The email contains activity, factor, factor source and the resulting estimate.
It does not send a report for rows with missing data or without consent.

## Setup precautions

1. Create a test spreadsheet and populate one clearly synthetic row first.
2. Use an email address you control for the test.
3. Verify that the factors are correctly sourced, unit-compatible and for the
   same reporting period as the activity data.
4. Review the exact report text before enabling a scheduled trigger.
5. Restrict spreadsheet and Apps Script editor access to authorised operators.
6. Add a user-facing privacy notice, correction/deletion process and retention
   policy before collecting real customer information.

This workflow does not provide a transactional mail queue. A successful send
followed by a spreadsheet write failure could result in a duplicate reminder
on the next run. Monitor executions and reconcile failed rows.
