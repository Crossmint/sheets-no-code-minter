/**
 * transactionTracker.gs - Transaction ID Fetching
 * 
 * This file handles fetching transaction IDs from the Crossmint API:
 * - Polls action status until completion with optimized timing
 * - Retries pending transactions with 5-second intervals
 * - Extracts transaction hashes from various response formats
 * - Updates spreadsheet with clickable transaction links
 * - Uses 333ms delays between requests for efficient rate limiting
 */

function fetchAndLogTransactionId(actionId, apiKey, baseUrl, email, row) {
  const getActionUrl = `${baseUrl}/api/2022-06-09/actions/${actionId}`;
  const maxRetries = 5;
  const retryDelay = 5000;
  
  var options = {
    method: "get",
    headers: {
      "X-API-KEY": apiKey
    },
    followRedirects: false
  };
  
  // Retry loop for pending transactions
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    Logger.log(`=== GET ACTION REQUEST for ${email} (row ${row}) - Attempt ${attempt}/${maxRetries} ===`);
    Logger.log(`URL: ${getActionUrl}`);
    
    try {
      const actionResponse = UrlFetchApp.fetch(getActionUrl, options);
      const actionResponseText = actionResponse.getContentText();
      
      Logger.log(`=== GET ACTION RESPONSE for ${email} (row ${row}) - Attempt ${attempt} ===`);
      Logger.log(`Status Code: ${actionResponse.getResponseCode()}`);
      Logger.log(`Raw Response: ${actionResponseText}`);
      
      const actionResponseContent = JSON.parse(actionResponseText);
      Logger.log(`Parsed Action Response: ${JSON.stringify(actionResponseContent, null, 2)}`);
      
      var actionStatus = actionResponseContent.status || 'unknown';
      Logger.log(`Action Status: ${actionStatus}`);
      
      if (actionStatus.toLowerCase() === 'pending') {
        Logger.log(`⏳ Action still pending for ${email} (attempt ${attempt}/${maxRetries})`);
        
        if (attempt < maxRetries) {
          Logger.log(`⏱️ Waiting ${retryDelay/1000} seconds before retry...`);
          Utilities.sleep(retryDelay);
          continue;
        } else {
          Logger.log(`⚠️ Action still pending after ${maxRetries} attempts for ${email}. Giving up.`);
          return;
        }
      }
      
      // Extract transaction ID
      var txIdFound = false;
      
      if (actionResponseContent.data && actionResponseContent.data.txId) {
        const txId = actionResponseContent.data.txId;
        Logger.log(`✅ Found Transaction ID: ${txId}`);
        writeTransactionIdToSheet(row, txId);
        txIdFound = true;
      } else {
        // Check alternative fields
        var alternativeFields = ['txId', 'transactionId', 'transactionHash'];
        for (var field of alternativeFields) {
          if (actionResponseContent[field]) {
            Logger.log(`Found alternative ${field}: ${actionResponseContent[field]}`);
            writeTransactionIdToSheet(row, actionResponseContent[field]);
            txIdFound = true;
            break;
          }
        }
        
        if (!txIdFound && actionResponseContent.data) {
          for (var field of alternativeFields) {
            if (actionResponseContent.data[field]) {
              Logger.log(`Found data.${field}: ${actionResponseContent.data[field]}`);
              writeTransactionIdToSheet(row, actionResponseContent.data[field]);
              txIdFound = true;
              break;
            }
          }
        }
      }
      
      if (!txIdFound) {
        Logger.log(`⚠️ No transaction ID found in any expected field for ${email}`);
      }
      
      Logger.log(`=== END GET ACTION RESPONSE for ${email} ===\n`);
      break;
      
    } catch (error) {
      Logger.log(`❌ Failed to fetch action details for ${email} (actionId: ${actionId}) - Attempt ${attempt}: ${error}`);
      
      if (attempt < maxRetries) {
        Logger.log(`⏱️ Waiting ${retryDelay/1000} seconds before retry...`);
        Utilities.sleep(retryDelay);
        continue;
      } else {
        Logger.log(`❌ Failed after ${maxRetries} attempts for ${email}. Giving up.`);
        break;
      }
    }
  }
}