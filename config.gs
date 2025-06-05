/**
 * config.gs - Configuration Data Handler
 * 
 * This file handles reading and processing configuration data from the spreadsheet:
 * - Reads NFT metadata from spreadsheet cells (B3-B25)
 * - Processes dynamic attributes from B13:C22 (trait_type/value pairs)
 * - Handles optional fields with smart filtering (animation_url, sendNotification, etc.)
 * - Builds properly formatted metadata object for single-recipient API calls
 */

function getMintData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Get configuration data from the new locations
  var apiKey = sheet.getRange('B3').getValue(); // Api key from B3
  var collectionId = sheet.getRange('B4').getValue(); // CollectionId from B4
  var nftName = sheet.getRange('B6').getValue(); // Nft Name from B6
  var description = sheet.getRange('B7').getValue(); // Description from B7
  var imageUrl = sheet.getRange('B8').getValue(); // Image url from B8
  var animationUrl = sheet.getRange('B9').getValue(); // Animation url from B9 (optional)
  var chain = sheet.getRange('B11').getValue(); // Chain from B11
  var sendNotificationValue = sheet.getRange('B24').getValue(); // Send notification from B24
  var reuploadLinkedFilesValue = sheet.getRange('B25').getValue(); // reuploadLinkedFiles from B25
  
  // Build attributes array from B13:C22 (10 attribute rows)
  var attributes = [];
  for (var i = 13; i <= 22; i++) {
    var traitType = sheet.getRange('B' + i).getValue();
    var value = sheet.getRange('C' + i).getValue();
    
    // Skip if empty or contains default placeholder values
    if (traitType && value && 
        traitType.toString().trim() !== '' && 
        value.toString().trim() !== '' &&
        traitType.toString().trim() !== '{name}' && 
        value.toString().trim() !== '{value}') {
      
      attributes.push({
        trait_type: traitType.toString().trim(),
        value: value.toString().trim()
      });
    }
  }
  
  // Build metadata object
  var metadata = {
    name: nftName,
    image: imageUrl,
    description: description
  };
  
  // Add animation_url only if it has a real value
  if (animationUrl && animationUrl.toString().trim() !== '' && 
      animationUrl.toString().trim() !== '{public animation URL}') {
    metadata.animation_url = animationUrl;
  }
  
  // Add attributes array only if we have attributes
  if (attributes.length > 0) {
    metadata.attributes = attributes;
  }
  
  // Process optional boolean fields
  var sendNotification = null;
  if (sendNotificationValue && sendNotificationValue.toString().trim() !== '' && 
      sendNotificationValue.toString().trim() !== '{true or false}') {
    sendNotification = sendNotificationValue.toString().toUpperCase() === 'TRUE';
  }
  
  var reuploadLinkedFiles = null;
  if (reuploadLinkedFilesValue && reuploadLinkedFilesValue.toString().trim() !== '' && 
      reuploadLinkedFilesValue.toString().trim() !== '{true or false}') {
    reuploadLinkedFiles = reuploadLinkedFilesValue.toString().toUpperCase() === 'TRUE';
  }
  
  return {
    metadata: metadata,
    collectionId: collectionId,
    apiKey: apiKey,
    chain: chain,
    sendNotification: sendNotification,
    reuploadLinkedFiles: reuploadLinkedFiles
  };
}