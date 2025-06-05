<div align="center">

<img src="https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafkreiehkgtumzfwi4zkdnhanmth6vpejqa2lsxk3teuu25csyeelv42bu" alt="Crossmint Logo" width="200">

# Crossmint NFT Minter for Google Sheets

[Live Demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0) | [Docs](https://docs.crossmint.com/minting/introduction) | [See all quickstarts](https://github.com/crossmint)

![Crossmint Embedded Checkout](https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafybeieizns63wosfik3rhorni5ghg2t3ctcorkjhdthcxndc6sjffxsxe)

</div>

---

## Introduction

Mint NFTs in less than 1 minute from Google Sheets using Crossmint's API with the [following demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0).

If you want to create your own collection of NFTs and mint to an unlimited number of users follow the steps from this quickstart and get it up and running in 10 minutes.

Both the demo and the quickstart include: 

• Batch mint NFTs to multiple email addresses  
• Dynamic NFT attributes configuration  
• Real-time minting status tracking with transaction links  


## Prerequisites

• Create a developer account in Crossmint's [staging environment](https://staging.crossmint.com).  
• Create a new collection in your preferred blockchain and copy the `collectionId`.  
• Navigate to "Integrate -> API Keys" and generate a Server Side API Key with the following scopes:
     <div>`wallets.create`, `wallets.read`, `nfts.create` & `nfts.read`</div>


## Deploy

Easily create your own mint template on Google Sheets with the button below. The scripts from this repo will be automatically included in Google App Scripts and linked to the file:

<a href="https://docs.google.com/spreadsheets/d/174WtEdkiDY1woPfUv0l_QdllaXUp0mWQj1-KTjsNhbQ/copy">
  <img src="https://img.shields.io/badge/Deploy%20to-Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" alt="Deploy to Google Sheets">
</a>


## Setup

#### 1. Configure Your NFT Collection

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

#### 2. Set Up NFT Attributes (Optional)

```
B13:C13: trait_type | value (e.g., "rarity" | "legendary")
B14:C14: trait_type | value (e.g., "background" | "blue")
...
B22:C22: trait_type | value
```

#### 3. Configure Optional Settings

```
B24: Send Notification (true/false) - Email notifications to recipients
B25: Reupload Linked Files (true/false) - Reupload metadata files to IPFS
```

#### 4. Add Recipient Email Addresses

```
A29: first.recipient@example.com
A30: second.recipient@example.com
A31: third.recipient@example.com
...
```

#### 5. Start Minting

• In your spreadsheet, click **Mint NFTs**  
• Monitor progress in real-time as the script processes each email  
• Check status updates in columns D (Order ID), E (Status)
• Wait ~20 seconds for the transaction hash to show on column F and verify the mint on-chain. 


## Using in Production


1. Create an account in Crossmint's [production console](https://www.crossmint.com).
2. Generate Server side API Keys with the same scopes used on staging.
3. Configure your production collection.
4. Update cell D16 with your production blockchain (e.g., "polygon" instead of "polygon-amoy")

<div align="center" style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 12px; margin: 16px 0;">
<strong>⚠️ Important:</strong> Always test with a small batch first in production
</div>



## Common Issues

*No emails to process*
- Ensure emails are in column A starting from row 29
- Check that cells aren't empty or contain only spaces

*Failed to mint NFT*
- Verify your API key is correct and has minting permissions
- Check that your collection ID exists and is properly configured

*Action still pending*
- This is normal for blockchain transactions
- The script will retry up to 5 times with 5-second intervals

*Script authorization required*
- First-time users need to authorize the script
- Click "Advanced" → "Go to [script name] (unsafe)" → "Allow"
- This is a one-time setup per user