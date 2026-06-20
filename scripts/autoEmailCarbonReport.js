function sendCarbonReport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tally");
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) return;
  
  var data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  var email = data[4];      // Column E
  var company = data[3];    // Column D
  var kwh = data[5];        // Column F
  var commute = data[7];    // Column H
  
  if (!email) return;
  
  var elecYear = kwh * 12 * 0.417;
  var commYear = 0;
  if (commute === "Car") commYear = 2020;
  if (commute === "Public Transit") commYear = 530;
  
  var totalTonnes = (elecYear + commYear) / 1000;
  
  var subject = "Your Eco-Trace Carbon Report for " + company;
  var message = "Hello " + company + ",\n\n" +
    "Thank you for using Eco-Trace! Here is your estimated annual carbon footprint:\n\n" +
    "📊 Electricity: " + (elecYear/1000).toFixed(2) + " tonnes CO₂e\n" +
    "🚗 Commute: " + (commYear/1000).toFixed(2) + " tonnes CO₂e\n" +
    "🌍 Total: " + totalTonnes.toFixed(2) + " tonnes CO₂e\n\n" +
    "Based on your data, we recommend:\n" +
    "- Switch to LED lighting and energy‑efficient appliances\n" +
    "- Explore remote work options to reduce commute emissions\n" +
    "- Consider a green electricity tariff\n\n" +
    "Let's shrink that footprint!\nThe Eco‑Trace Team";
  
  MailApp.sendEmail(email, subject, message);
}
