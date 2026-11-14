/**
 * Google Apps Script email workflow for the EcoTrace calculator.
 *
 * Expected Tally columns (header row, exact names):
 * Business name
 * Email
 * Electricity kWh
 * Electricity factor kgCO2e/kWh
 * Electricity factor source
 * Commute passenger-km
 * Commute factor kgCO2e/passenger-km
 * Commute factor source
 * Reporting period
 * Consent
 * Report sent at
 *
 * Activity values and emission factors must refer to the same reporting period.
 * A report is sent only when Consent is YES/TRUE and Report sent at is blank.
 */
function sendCarbonReports() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tally");
  if (!sheet) throw new Error('Required sheet "Tally" was not found.');

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return { sent: 0, skipped: 0, failed: 0 };

  var headers = values[0].map(function (value) {
    return String(value || "").trim();
  });
  var required = [
    "Business name",
    "Email",
    "Electricity kWh",
    "Electricity factor kgCO2e/kWh",
    "Electricity factor source",
    "Commute passenger-km",
    "Commute factor kgCO2e/passenger-km",
    "Commute factor source",
    "Reporting period",
    "Consent",
    "Report sent at"
  ];
  var index = {};
  required.forEach(function (name) {
    index[name] = headers.indexOf(name);
    if (index[name] < 0) throw new Error("Missing required Tally column: " + name);
  });

  var sent = 0;
  var skipped = 0;
  var failed = 0;
  var now = new Date();

  for (var rowIndex = 1; rowIndex < values.length; rowIndex++) {
    var row = values[rowIndex];
    var consent = String(row[index["Consent"]] || "").trim().toLowerCase();
    var alreadySent = row[index["Report sent at"]];
    if (!(consent === "yes" || consent === "true") || alreadySent) {
      skipped++;
      continue;
    }

    try {
      var company = cleanText(row[index["Business name"]], 100, "Business name");
      var email = String(row[index["Email"]] || "").trim();
      var period = cleanText(row[index["Reporting period"]], 80, "Reporting period");
      var electricityKwh = finiteNonNegative(row[index["Electricity kWh"]], "Electricity kWh");
      var electricityFactor = positiveNumber(row[index["Electricity factor kgCO2e/kWh"]], "Electricity factor");
      var electricitySource = cleanText(row[index["Electricity factor source"]], 300, "Electricity factor source");
      var commutePassengerKm = finiteNonNegative(row[index["Commute passenger-km"]], "Commute passenger-km");
      var commuteFactor = positiveNumber(row[index["Commute factor kgCO2e/passenger-km"]], "Commute factor");
      var commuteSource = cleanText(row[index["Commute factor source"]], 300, "Commute factor source");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        throw new Error("A valid report email address is required");
      }

      var electricityKg = electricityKwh * electricityFactor;
      var commuteKg = commutePassengerKm * commuteFactor;
      var totalKg = electricityKg + commuteKg;
      var totalTonnes = totalKg / 1000;

      var subject = "EcoTrace estimate for " + company.replace(/[\r\n]/g, " ");
      var message = [
        "Hello " + company + ",",
        "",
        "Here is your activity-based carbon screening estimate for " + period + ".",
        "",
        "Electricity: " + electricityKg.toFixed(2) + " kgCO2e",
        "  Activity: " + electricityKwh.toFixed(2) + " kWh",
        "  Factor: " + electricityFactor + " kgCO2e/kWh",
        "  Factor source: " + electricitySource,
        "",
        "Employee commuting: " + commuteKg.toFixed(2) + " kgCO2e",
        "  Activity: " + commutePassengerKm.toFixed(2) + " passenger-km",
        "  Factor: " + commuteFactor + " kgCO2e/passenger-km",
        "  Factor source: " + commuteSource,
        "",
        "TOTAL: " + totalKg.toFixed(2) + " kgCO2e (" + totalTonnes.toFixed(4) + " tonnes CO2e)",
        "",
        "This is an estimate based on the activity data and emission factors entered for this report period. Check the cited factor sources, organisational boundary and omissions before using it for external disclosure.",
        "",
        "EcoTrace"
      ].join("\n");

      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: message
      });

      // Mark only after the email API reports a successful send.
      sheet.getRange(rowIndex + 1, index["Report sent at"] + 1).setValue(now);
      sent++;
    } catch (error) {
      failed++;
      console.error("EcoTrace row " + (rowIndex + 1) + " was not sent: " + error.message);
    }
  }

  return { sent: sent, skipped: skipped, failed: failed };
}

function finiteNonNegative(value, label) {
  var number = Number(value);
  if (!isFinite(number) || number < 0) throw new Error(label + " must be non-negative.");
  return number;
}

function positiveNumber(value, label) {
  var number = finiteNonNegative(value, label);
  if (number <= 0) throw new Error(label + " must be greater than zero.");
  return number;
}

function cleanText(value, maximumLength, label) {
  var text = String(value || "").trim();
  if (!text || text.length > maximumLength || /[\u0000-\u001f]/.test(text)) {
    throw new Error(label + " is required and must be within the permitted length.");
  }
  return text;
}
