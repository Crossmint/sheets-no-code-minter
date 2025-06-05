<div align="center">

![Crossmint Logo](https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafkreiehkgtumzfwi4zkdnhanmth6vpejqa2lsxk3teuu25csyeelv42bu)

# Crossmint NFT Minter for Google Sheets

[Live Demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0) | [Docs](https://docs.crossmint.com/minting/introduction) | [See all quickstarts](https://github.com/crossmint)

![Crossmint Embedded Checkout](https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafybeieizns63wosfik3rhorni5ghg2t3ctcorkjhdthcxndc6sjffxsxe)

</div>

---

## Introduction

Mint NFTs directly from Google Sheets using Crossmint's API. This quickstart provides a seamless way to batch mint NFTs to multiple recipients using a simple spreadsheet interface with automated processing and transaction tracking.

### Key features:

• **Batch mint NFTs** to multiple email addresses  
• **Dynamic NFT attributes** configuration  
• **Real-time minting status** tracking with transaction links  
• **Automatic duplicate prevention**  
• **Individual API calls** with optimized rate limiting (333ms intervals)  
• **Built-in retry logic** for pending transactions  

---

## Prerequisites

• Create a developer account in the [Staging Console](https://staging.crossmint.com).  
• Create a [new collection](https://docs.crossmint.com/nft-checkout/collection-management) or [import yours](https://docs.crossmint.com/nft-checkout/collection-management) in the console, and have your `collectionId` ready.  
• Make sure your collection has at least one NFT configured  
• From the detail view of your collection, navigate to the Checkout tab to configure the pricing settings and enable Credit Card and Crypto payments.  

---

## Deploy

<div align="center">

Easily deploy the template to Google Sheets with the button below. The Google Apps Script will be automatically included with the template.

<a href="https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/copy">
  <img src="https://img.shields.io/badge/Deploy%20to-Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" alt="Deploy to Google Sheets">
</a>

</div>

### Option 1: Make a Copy (Recommended)

1. Open the [template spreadsheet](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0)
2. Click **"File"** → **"Make a copy"**
3. The script will be automatically copied with the spreadsheet

### Option 2: Manual Setup
Set up the Google Apps Script manually by following the setup instructions from step 6.

---

## Setup

### 1. Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/jorge2393/sheets-no-code-minter.git
cd sheets-no-code-minter
```

### 2. Configure Your NFT Collection

Open your copied spreadsheet and fill in the configuration:

| Cell | Description | Example |
|------|-------------|---------|
| `D8` | Your Collection ID | `your-collection-id` |
| `D10` | NFT Name | `"My Awesome NFT"` |
| `D12` | NFT Description | `"Limited edition NFT"` |
| `D14` | Image URL | `"https://example.com/image.png"` |
| `D16` | Blockchain | `"polygon-amoy"` |

### 3. Set Up Your API Key

1. Go to **Extensions** → **Apps Script**
2. Click on the settings gear icon
3. Add your server-side API key as a script property named `'API_KEY'`

### 4. Set Up NFT Attributes (Optional)

Configure dynamic attributes:

| Cell | Attribute | Example Value |
|------|-----------|---------------|
| `D18` | Rarity | `"legendary"` |
| `D20` | Size | `"large"` |

### 5. Configure Optional Settings

| Cell | Setting | Options |
|------|---------|---------|
| `D22` | Send Notification | `true/false` |

### 6. Add Recipient Email Addresses

Starting from row 30, add email addresses in column C:

```
C30: first.recipient@example.com
C31: second.recipient@example.com
C32: third.recipient@example.com
...
```

### 7. Install Google Apps Script (Manual Setup Only)

If you didn't copy the template, manually set up the script:

1. Open Google Apps Script: **Extensions** → **Apps Script**
2. Copy the provided Google Apps Script code
3. Save the project
4. Set up your API key in script properties

### 8. Start Minting

1. In your spreadsheet, click **NFT Minting** → **Mint NFTs**
2. Monitor progress in real-time as the script processes each email
3. Check status updates in columns D (Order ID), E (Status), and F (Transaction Hash)

---

## Using in Production

<div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 12px; margin: 16px 0;">
<strong>⚠️ Important:</strong> Always test with a small batch first in production
</div>

1. **Production Environment**: Create an account in the [Crossmint Production Console](https://www.crossmint.com)
2. **API Keys**: Update your script properties with your production API key (contains "production" in the key)
3. **Collection Setup**: Configure your production collection and verify it
4. **Blockchain**: Update cell D16 with your production blockchain (e.g., "polygon" instead of "polygon-amoy")

---

## File Structure

```
crossmint-nft-minter/
├── main.gs                    # Main minting orchestration
├── config.gs                  # Configuration data handler
├── emailHandler.gs            # Email data management
├── responseHandler.gs         # API response processing
├── sheetUtils.gs             # Spreadsheet utilities
├── transactionTracker.gs     # Transaction ID fetching
└── README.md                 # This file
```

---

## Advanced Usage

For advanced usage and customization, refer to the Crossmint documentation:

<div align="center">

| Resource | Description |
|----------|-------------|
| [📚 API Reference](https://docs.crossmint.com/api-reference) | Complete API documentation |
| [🏗️ Collection Management](https://docs.crossmint.com/nft-checkout/collection-management) | Managing your NFT collections |
| [⚙️ Blockchain Configuration](https://docs.crossmint.com/nft-checkout/blockchain-setup) | Blockchain setup guide |
| [🐛 Error Handling](https://docs.crossmint.com/api-reference/common-errors) | Common errors and solutions |

</div>

---

## Support

<div align="center">

For support and questions:

[📖 **Documentation**](https://docs.crossmint.com) • [💬 **Discord Community**](https://discord.gg/crossmint) • [📧 **Support Email**](mailto:support@crossmint.com)

</div>

---

<div align="center">

**Made with ❤️ by [Crossmint](https://crossmint.com)**

</div>