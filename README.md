# Crossmint NFT Minter for Google Sheets

**NFT Minting Spreadsheet Quickstart**

[Live Demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0) | [Docs](https://docs.crossmint.com/minting/introduction) | [See all quickstarts](https://github.com/crossmint)

![Crossmint Embedded Checkout](https://your-image-url-here.png)

**Introduction**

Mint NFTs directly from Google Sheets using Crossmint's API. This quickstart provides a seamless way to batch mint NFTs to multiple recipients using a simple spreadsheet interface with automated processing and transaction tracking.

**Key features:**
* Batch mint NFTs to multiple email addresses
* Dynamic NFT attributes configuration
* Real-time minting status tracking with transaction links
* Automatic duplicate prevention
* Individual API calls with optimized rate limiting (333ms intervals)
* Built-in retry logic for pending transactions

## Prerequisites

* Create a developer account in the [Crossmint Staging Console](staging.crossmint.com).
* Create a new collection or import yours in the console, and have your `collectionId` ready.
* Make sure your collection is properly configured for minting
* Get your server-side API key from the Crossmint Console

## Deploy

**Option 1: Make a Copy (Recommended)**
1. Open the [template spreadsheet](https://docs.google.com/spreadsheets/d/174WtEdkiDY1woPfUv0l_QdllaXUp0mWQj1-KTjsNhbQ/edit?gid=0#gid=0)
2. Click "File" → "Make a copy"
3. The script will be automatically copied with the spreadsheet

**Option 2: Manual Setup**
Set up the Google Apps Script manually by following the setup instructions from point 6. 

## Setup

### 1. Copy the Template Spreadsheet

```
1. Open the template: [NFT Minting Template](#)
2. Click "File" → "Make a copy"
3. Rename your copy as desired
```

### 2. Configure Your NFT Collection

Open your copied spreadsheet and fill in the configuration:

```
B3:  Your Crossmint API Key (server-side key)
B4:  Your Collection ID
B6:  NFT Name
B7:  NFT Description
B8:  Image URL
B9:  Animation URL (optional)
B11: Blockchain (e.g., polygon-amoy)
```

### 3. Set Up NFT Attributes (Optional)

Configure dynamic attributes in rows 13-22:

```
B13:C13: trait_type | value (e.g., "rarity" | "legendary")
B14:C14: trait_type | value (e.g., "background" | "blue")
...
B22:C22: trait_type | value
```

### 4. Configure Optional Settings

```
B24: Send Notification (true/false) - Email notifications to recipients
B25: Reupload Linked Files (true/false) - Reupload metadata files to IPFS
```

### 5. Add Recipient Email Addresses

Starting from row 29, add email addresses in column A:

```
A29: first.recipient@example.com
A30: second.recipient@example.com
A31: third.recipient@example.com
...
```

### 6. Install Google Apps Script (Manual Setup Only)

If you didn't copy the template, manually set up the script:

1. Open Google Apps Script: `Extensions` → `Apps Script`
2. Copy the code from each `.gs` file in this repository:
   - [main.gs](#)
   - [config.gs](#)
   - [emailHandler.gs](#)
   - [responseHandler.gs](#)
   - [sheetUtils.gs](#)
   - [transactionTracker.gs](#)
3. Save the project

### 7. Start Minting

1. In your spreadsheet, click `NFT Minting` → `Mint NFTs`
2. Monitor progress in real-time as the script processes each email
3. Check status updates in columns B (Order ID), C (Status), and D (Transaction Hash)

## Using in Production

1. **Production Environment**: Create an account in the Crossmint Production Console
2. **API Keys**: Update cell B3 with your production API key (contains "production" in the key)
3. **Collection Setup**: Configure your production collection and verify it
4. **Blockchain**: Update cell B11 with your production blockchain (e.g., "polygon" instead of "polygon-amoy")
5. **Testing**: Always test with a small batch first in production

```

## How It Works

### Phase 1: NFT Minting
- Reads configuration and email list from spreadsheet
- Processes emails individually (one API call per recipient)
- Updates spreadsheet with real-time status (Processing → Success/Failure)
- Collects action IDs for transaction tracking

### Phase 2: Transaction Tracking
- Waits 5 seconds for blockchain transactions to process
- Fetches transaction IDs using collected action IDs
- Creates clickable links to blockchain explorer
- Retries pending transactions up to 5 times

### Status Tracking
- **Processing** (Orange): API call in progress
- **Success** (Green): NFT minted successfully
- **Failure** (Red): Minting failed
- **Transaction Hash**: Clickable link to view on blockchain explorer

## Advanced Usage

For advanced usage and customization, refer to the Crossmint documentation:

* **API Reference**: [https://docs.crossmint.com/api-reference](#)
* **Collection Management**: [https://docs.crossmint.com/nft-checkout/collection-management](#)
* **Blockchain Configuration**: [https://docs.crossmint.com/nft-checkout/blockchain-setup](#)
* **Error Handling**: [https://docs.crossmint.com/api-reference/common-errors](#)

## Troubleshooting

### Common Issues

**"No emails to process"**
- Ensure emails are in column A starting from row 29
- Check that cells aren't empty or contain only spaces

**"Failed to mint NFT"**
- Verify your API key is correct and has minting permissions
- Check that your collection ID exists and is properly configured
- Ensure your collection has sufficient mint capacity

**"Action still pending"**
- This is normal for blockchain transactions
- The script will retry up to 5 times with 5-second intervals
- Check the blockchain explorer directly if needed

**Script authorization required**
- First-time users need to authorize the script
- Click "Advanced" → "Go to [script name] (unsafe)" → "Allow"
- This is a one-time setup per user

## Support

For support and questions:
* **Documentation**: [Crossmint Docs](#)
* **Community**: [Discord Server](#)
* **Contact**: [Support Portal](#)
