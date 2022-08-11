function checkStatus() {
  var { projectId, apiSecret} = getMintData();
  var baseUrl = 'https://staging.crossmint.io';
  
  if (apiSecret.search("live") > 0){
    baseUrl = 'https://www.crossmint.io';
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mintStatusSheet = ss.getSheets()[2];
  var lastCount = mintStatusSheet.getLastRow()
  var requestIds = mintStatusSheet.getRange(`A1:A${lastCount}`).getValues()
  var statuses = mintStatusSheet.getRange(`C1:C${lastCount}`).getValues()
  for (var i = 0; i < requestIds.length; i++){
    const status = statuses[i][0]
    const requestId = requestIds[i][0]
    if (status !== 'success'){
      const statusUrlPath = `/api/2022-06-09/collections/default/nfts/${requestId}`
      const statusUrl = `${baseUrl}${statusUrlPath}`
      var options = {
        "method" : "get",
        "contentType": "application/json",
        "headers": {"X-CLIENT-SECRET": apiSecret, "X-PROJECT-ID": projectId},
        "followRedirects": false,
        };
      Logger.log(options)
      Logger.log(statusUrl)
      const response = UrlFetchApp.fetch(statusUrl, options);
      
      const jsonResponse = JSON.parse(response.getContentText())
      var data = mintStatusSheet.getRange(`C${i+1}`);
      data.setValue(jsonResponse['status']);
    }
  }
}
