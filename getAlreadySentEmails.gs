function getAlreadySentEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mintStatusSheet = ss.getSheets()[2];
  var lastCount = mintStatusSheet.getLastRow()
  if (lastCount === 0) return [];
  const existingEmailsData = mintStatusSheet.getRange(`B1:B${lastCount}`).getValues()
  var emails = []
  for (var i = 0; i < existingEmailsData.length; i++){
    emails.push(existingEmailsData[i][0])
  }
  Logger.log(`already sent emails: ${emails}`)
  return emails
}
