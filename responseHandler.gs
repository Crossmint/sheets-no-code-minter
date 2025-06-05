/**
 * responseHandler.gs - API Response Processing
 * 
 * This file handles processing of individual API responses:
 * - Processes single mint results from individual API calls
 * - Updates spreadsheet immediately with success/failure status
 * - Manages Order IDs and real-time status tracking
 * - Handles error cases and failed mints with immediate feedback
 */

function processSingleMintResult(result, emailData, actionIdsToProcess) {
  const email = emailData.email;
  const row = emailData.row;
  
  if (result && result.id) {
    // IMMEDIATELY update the sheet with Order ID and Success status
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(row, 2).setValue(result.id); // Column B - Order ID
    var statusCell = sheet.getRange(row, 3); // Column C - Status
    statusCell.setValue('Success');
    statusCell.setFontColor('#00AA00'); // Green
    
    // Force the spreadsheet to update immediately
    SpreadsheetApp.flush();
    
    Logger.log(`✅ Successfully minted NFT for ${email} with ID: ${result.id} (row ${row})`);
    
    // Collect actionId for Phase 2 (transaction polling)
    if (result.actionId) {
      actionIdsToProcess.push({
        actionId: result.actionId,
        email: email,
        row: row
      });
      Logger.log(`📋 Collected actionId: ${result.actionId} for ${email}`);
    }
  } else {
    markEmailAsFailed(emailData);
  }
}

function markEmailAsFailed(emailData) {
  const email = emailData.email;
  const row = emailData.row;
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var statusCell = sheet.getRange(row, 3); // Column C - Status
  statusCell.setValue('Failure');
  statusCell.setFontColor('#FF0000'); // Red
  
  // Force the spreadsheet to update immediately
  SpreadsheetApp.flush();
  
  Logger.log(`❌ Marked ${email} as failed (row ${row})`);
}