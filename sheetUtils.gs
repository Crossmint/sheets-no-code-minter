/**
 * sheetUtils.gs - Spreadsheet Utilities
 * 
 * This file contains utility functions for spreadsheet operations:
 * - Writing data to specific rows and columns with real-time updates
 * - Formatting cells with colors and styles for status indication
 * - Managing spreadsheet updates and immediate flushing
 * - Creating hyperlinks for transaction hashes with shortened display
 */

function writeToSheetByRow(row, requestId, status, fontColor) {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Write request ID to column B
  if (requestId) {
    sheet.getRange(row, 2).setValue(requestId); // Column B
  }
  
  // Write status to column C with color formatting
  var statusCell = sheet.getRange(row, 3); // Column C
  statusCell.setValue(status);
  statusCell.setFontColor(fontColor);
  
  Logger.log(`Updated row ${row}: ID=${requestId}, Status=${status}`);
}

function writeTransactionIdToSheet(row, txId) {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Create shortened version: first 8 characters + ".."
  var shortTxId = txId.substring(0, 8) + "..";
  
  // Create hyperlink to Polygonscan
  var polygonscanUrl = "https://amoy.polygonscan.com/tx/" + txId;
  
  // Set hyperlink formula in column D
  var cell = sheet.getRange(row, 4); // Column D
  cell.setFormula('=HYPERLINK("' + polygonscanUrl + '", "' + shortTxId + '")');
  
  Logger.log(`Updated row ${row}: Shortened TxId=${shortTxId} with hyperlink to ${polygonscanUrl} in column D`);
}