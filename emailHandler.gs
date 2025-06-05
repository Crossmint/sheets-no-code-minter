/**
 * emailHandler.gs - Email Data Management
 * 
 * This file handles all email-related data operations for individual processing:
 * - Reads email addresses from spreadsheet starting at A29
 * - Tracks which emails have already been processed successfully
 * - Manages email data with corresponding row numbers for status updates
 * - Filters emails to prevent duplicate processing and API calls
 */

function getEmailsToSendWithRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var emailsWithRows = [];
  
  // Start from row 29 (where emails begin) and read until empty
  var row = 29;
  while (true) {
    var email = sheet.getRange(row, 1).getValue(); // Column A
    if (!email || email === '') {
      break;
    }
    emailsWithRows.push({
      email: email.toString().trim(),
      row: row
    });
    row++;
  }
  
  return emailsWithRows;
}

function getAlreadySentEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sentEmails = [];
  
  // Check which emails already have successful status
  var row = 29;
  while (true) {
    var email = sheet.getRange(row, 1).getValue(); // Column A
    var status = sheet.getRange(row, 3).getValue(); // Column C (Status)
    
    if (!email || email === '') {
      break;
    }
    
    if (status && status.toString().toLowerCase() === 'success') {
      sentEmails.push(email.toString().trim());
    }
    row++;
  }
  
  return sentEmails;
}