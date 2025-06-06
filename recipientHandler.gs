/**
 * recipientHandler.gs 
 * 
 * This file handles all email-related data operations for individual processing:
 * - Reads recipient addresses from spreadsheet starting at A29
 * - Categorizes recipient into wallet or email
 * - Tracks which recipients have already been processed successfully
 * - Manages recipient data with corresponding row numbers for status updates
 * - Filters recipient to prevent duplicate processing and API calls
 */

// Function to determine if a string is an email or wallet address
function determineRecipientType(recipient) {
  var cleanRecipient = recipient.toString().trim();
  
  // Check if it contains "@" - if yes, it's an email
  if (cleanRecipient.includes('@')) {
    return {
      type: 'email',
      isValid: true
    };
  }
  
  // If no "@", treat as wallet address
  // Basic validation for common wallet address formats
  var isValidWallet = false;
  var walletType = 'unknown';
  
  // EVM addresses start with 0x and are 42 characters long
  if (cleanRecipient.startsWith('0x') && cleanRecipient.length === 42) {
    isValidWallet = true;
    walletType = 'evm';
  }
  // Solana addresses are typically 32-44 characters, base58 encoded
  else if (cleanRecipient.length >= 32 && cleanRecipient.length <= 44 && 
           /^[1-9A-HJ-NP-Za-km-z]+$/.test(cleanRecipient)) {
    isValidWallet = true;
    walletType = 'solana';
  }
  // If it doesn't match common patterns but has no @, still treat as wallet
  else if (cleanRecipient.length > 20) {
    isValidWallet = true;
    walletType = 'other';
  }
  
  return {
    type: 'wallet',
    walletType: walletType,
    isValid: isValidWallet
  };
}

// Function to format recipient for API call
function formatRecipientForAPI(recipient, chain) {
  var cleanRecipient = recipient.toString().trim();
  var recipientInfo = determineRecipientType(cleanRecipient);
  
  if (recipientInfo.type === 'email') {
    return `email:${cleanRecipient}:${chain}`;
  } else {
    // For wallet addresses, format as chain:walletAddress
    return `${chain}:${cleanRecipient}`;
  }
}

function getRecipientsToSendWithRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var recipientsWithRows = [];
  var {chain} = getMintData(); // Get chain for formatting
  
  // Start from row 29 (where recipients begin) and read until empty
  var row = 29;
  while (true) {
    var recipient = sheet.getRange(row, 1).getValue(); // Column A
    if (!recipient || recipient === '') {
      break;
    }
    
    var cleanRecipient = recipient.toString().trim();
    var recipientInfo = determineRecipientType(cleanRecipient);
    var formattedRecipient = formatRecipientForAPI(cleanRecipient, chain);
    
    recipientsWithRows.push({
      recipient: cleanRecipient,
      row: row,
      type: recipientInfo.type,
      walletType: recipientInfo.walletType || null,
      isValid: recipientInfo.isValid,
      formattedRecipient: formattedRecipient
    });
    
    Logger.log(`Found recipient: ${cleanRecipient} (${recipientInfo.type}) -> API format: ${formattedRecipient}`);
    row++;
  }
  
  return recipientsWithRows;
}

function getAlreadySentRecipients() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sentRecipients = [];
  
  // Check which recipients already have successful status
  var row = 29;
  while (true) {
    var recipient = sheet.getRange(row, 1).getValue(); // Column A
    var status = sheet.getRange(row, 3).getValue(); // Column C (Status)
    
    if (!recipient || recipient === '') {
      break;
    }
    
    if (status && status.toString().toLowerCase() === 'success') {
      sentRecipients.push(recipient.toString().trim());
    }
    row++;
  }
  
  return sentRecipients;
}