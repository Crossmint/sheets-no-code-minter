function mintNftsAndTrackRequestIds() {
  var {metadata, projectId, apiSecret} = getMintData();

  var baseUrl = 'https://staging.crossmint.io';
  const mintApiPath = `/api/2022-06-09/collections/default/nfts`

  if (apiSecret.search("live") > 0){
    baseUrl = 'https://www.crossmint.io';
  }

  const mintUrl = `${baseUrl}${mintApiPath}`

  const emailsToSend = getEmailsToSend()
  const alreadySentEmails = getAlreadySentEmails()

  Logger.log(emailsToSend)


  for (var i = 0; i < emailsToSend.length; i++){
    var email = emailsToSend[i]

    if (alreadySentEmails.includes(email)){
      Logger.log(`Already sent NFT to ${email}, skipping...`)
      continue;
    }
    Logger.log(email)
    Logger.log(mintUrl)
    var options = {
      "method" : "post",
      "contentType": "application/json",
      "payload" : JSON.stringify({"metadata": metadata, "recipient": `email:${email}:sol`}),
      "headers": {"X-CLIENT-SECRET": apiSecret, "X-PROJECT-ID": projectId},
      "followRedirects": false,
      };
      

  
    const response = UrlFetchApp.fetch(mintUrl, options);
    Logger.log(response)
    Logger.log(response.getContentText())
    const responseContent = JSON.parse(response.getContentText())
    
    writeRequestIdToSheet(responseContent.id, email)
  }
};





