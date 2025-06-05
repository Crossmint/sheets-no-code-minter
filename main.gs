/**
 * main.gs - Main NFT Minting Function
 * 
 * This file contains the primary minting logic that orchestrates the entire process:
 * - Fetches configuration and email data
 * - Processes emails individually (one API call per recipient)
 * - Handles API responses and updates spreadsheet in real-time
 * - Manages transaction ID retrieval with retry logic
 */

function mintNftsAndTrackRequestIds() {
  var {metadata, collectionId, apiKey, chain, sendNotification, reuploadLinkedFiles} = getMintData();
  var baseUrl = 'https://staging.crossmint.com';
  const mintApiPath = `/api/2022-06-09/collections/${collectionId}/nfts`;
  
  // Check if using production API
  if (apiKey.search("production") > 0) {
    baseUrl = 'https://www.crossmint.com';
  }
  
  const mintUrl = `${baseUrl}${mintApiPath}`;
  const emailsWithRows = getEmailsToSendWithRows();
  const alreadySentEmails = getAlreadySentEmails();
  
  Logger.log(`Found ${emailsWithRows.length} emails to process`);
  Logger.log(emailsWithRows);
  
  // Filter out already sent emails
  const emailsToProcess = emailsWithRows.filter(emailData => !alreadySentEmails.includes(emailData.email));
  Logger.log(`${emailsToProcess.length} emails remaining to process after filtering already sent`);
  
  if (emailsToProcess.length === 0) {
    Logger.log("No emails to process - all have already been sent");
    return;
  }
  
  // Phase 1: Mint NFTs - One API call per recipient
  var actionIdsToProcess = [];
  var mintedCount = 0;
  
  Logger.log("=== PHASE 1: MINTING NFTs - ONE CALL PER RECIPIENT ===");
  Logger.log(`Processing ${emailsToProcess.length} emails individually`);
  
  // Process each email individually
  for (var i = 0; i < emailsToProcess.length; i++) {
    var emailData = emailsToProcess[i];
    var email = emailData.email;
    var row = emailData.row;
    
    Logger.log(`=== PROCESSING EMAIL ${i + 1}/${emailsToProcess.length}: ${email} (row ${row}) ===`);
    
    // Set initial status to Processing
    writeToSheetByRow(row, '', 'Processing', '#FF9900'); // Orange for Processing
    
    // Build payload for single recipient
    var payload = {
      metadata: metadata,
      recipient: `email:${email}:${chain}`,
      locale: "en-US",
      compressed: true
    };
    
    // Add optional fields only if they have real values
    if (sendNotification !== null) {
      payload.sendNotification = sendNotification;
    }
    
    if (reuploadLinkedFiles !== null) {
      payload.reuploadLinkedFiles = reuploadLinkedFiles;
    }
    
    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      headers: {
        "X-API-KEY": apiKey
      },
      followRedirects: false
    };
    
    // Log the complete request details
    Logger.log(`=== REQUEST for ${email} (row ${row}) ===`);
    Logger.log(`URL: ${mintUrl}`);
    Logger.log(`Method: ${options.method.toUpperCase()}`);
    Logger.log(`Request Body: ${JSON.stringify(payload, null, 2)}`);
    Logger.log(`=== END REQUEST ===\n`);
    
    try {
      const response = UrlFetchApp.fetch(mintUrl, options);
      const responseText = response.getContentText();
      
      // Log response status and headers
      Logger.log(`=== RESPONSE for ${email} (row ${row}) ===`);
      Logger.log(`Status Code: ${response.getResponseCode()}`);
      Logger.log(`Raw Response: ${responseText}`);
      
      const responseContent = JSON.parse(responseText);
      Logger.log(`Parsed Response: ${JSON.stringify(responseContent, null, 2)}`);
      
      // Process single response
      if (responseContent && responseContent.id) {
        processSingleMintResult(responseContent, emailData, actionIdsToProcess);
        mintedCount++;
      } else {
        markEmailAsFailed(emailData);
      }
      
      Logger.log(`=== END RESPONSE for ${email} ===\n`);
      
    } catch (error) {
      markEmailAsFailed(emailData);
      Logger.log(`❌ Failed to mint NFT for ${email} (row ${row}): ${error}`);
      Logger.log(`Error details: ${error.toString()}`);
    }
    
    // Small delay between requests to avoid rate limiting
    if (i < emailsToProcess.length - 1) {
      Logger.log("⏱️ Waiting 0.33 seconds between requests...");
      Utilities.sleep(333);
    }
  }
  
  Logger.log(`=== PHASE 1 COMPLETE ===`);
  Logger.log(`Successfully minted ${mintedCount} NFTs out of ${emailsToProcess.length} attempts`);
  Logger.log(`Collected ${actionIdsToProcess.length} actionIds for transaction lookup`);
  
  // Phase 2: Wait and then fetch transaction IDs
  if (actionIdsToProcess.length > 0) {
    Logger.log(`=== WAITING 5 SECONDS FOR TRANSACTIONS TO PROCESS ===`);
    Utilities.sleep(5000);
    
    Logger.log(`=== PHASE 2: FETCHING TRANSACTION IDs ===`);
    
    for (var j = 0; j < actionIdsToProcess.length; j++) {
      var actionData = actionIdsToProcess[j];
      Logger.log(`Fetching transaction ID for ${actionData.email} (actionId: ${actionData.actionId})`);
      
      fetchAndLogTransactionId(actionData.actionId, apiKey, baseUrl, actionData.email, actionData.row);
      
      // Small delay between requests to avoid rate limiting
      if (j < actionIdsToProcess.length - 1) {
        Utilities.sleep(333);
      }
    }
    
    Logger.log(`=== PHASE 2 COMPLETE ===`);
    Logger.log(`Processed ${actionIdsToProcess.length} transaction lookups`);
  }
  
  Logger.log(`=== ALL PROCESSING COMPLETE ===`);
}