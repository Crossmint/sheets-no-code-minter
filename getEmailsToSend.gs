function getEmailsToSend() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mintStatusSheet = ss.getSheets()[1];
  var lastCount = mintStatusSheet.getLastRow()
  if (lastCount === 0) return [];
  const emailsToSendData = mintStatusSheet.getRange(`A1:A${lastCount}`).getValues()
  var emails = []
  for (var i = 0; i < emailsToSendData.length; i++){
    emails.push(emailsToSendData[i][0])
  }
  Logger.log(`emails to send: ${emails}`)
  return emails
}
