function writeRequestIdToSheet(requestId, email) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mintStatusSheet = ss.getSheets()[2];
  var nextCount = mintStatusSheet.getLastRow() + 1
  var data = mintStatusSheet.getRange(`A${nextCount}`);
  data.setValue(requestId);
  var data = mintStatusSheet.getRange(`B${nextCount}`);
  data.setValue(email);
}
