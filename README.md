<div align="center">

<img src="https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafkreiehkgtumzfwi4zkdnhanmth6vpejqa2lsxk3teuu25csyeelv42bu" alt="Crossmint Logo" width="200">

# Crossmint NFT Minter for Google Sheets

[Live Demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0) | [Docs](https://docs.crossmint.com/minting/introduction) | [See all quickstarts](https://github.com/crossmint)

![Crossmint Embedded Checkout](https://tan-odd-galliform-276.mypinata.cloud/ipfs/bafybeieizns63wosfik3rhorni5ghg2t3ctcorkjhdthcxndc6sjffxsxe)

</div>

---

## Introduction

Mint NFTs in less than 1 minute from Google Sheets using Crossmint's API using [the following demo](https://docs.google.com/spreadsheets/d/1HRgXotJTJ_ojE3RcgV9uzY0ya51YoSPDbEFarRPjMAc/edit?gid=0#gid=0).

If you want to create your own collection of NFTs and mint to an unlimited number of users follow the steps from this quickstart and get it up and running in 10 minutes.

### Key features:

• **Batch mint NFTs** to multiple email addresses  
• **Dynamic NFT attributes** configuration  
• **Real-time minting status** tracking with transaction links  

---

## Prerequisites

• Create a developer account in the [Staging Console](https://staging.crossmint.com).  
• Create a new collection in your preferred blockchain and copy the `collectionId`.  
• Go to Integatre > API Keys and generate a Server Side API Key with the `wallets.create`, `wallets.read`, `nfts.create` and `nfts.read` scopes.

---

## Deploy

Easily deploy the template to Google Sheets with the button below. The scripts from this repo will be automatically included with the template.

<a href="https://docs.google.com/spreadsheets/d/174WtEdkiDY1woPfUv0l_QdllaXUp0mWQj1-KTjsNhbQ/copy">
  <img src="https://img.shields.io/badge/Deploy%20to-Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" alt="Deploy to Google Sheets">
</a>

---

## Setup

### 1. Configure Your NFT Collection

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

### 2. Set Up NFT Attributes (Optional)

Configure dynamic attributes in rows 13-22:

```
B13:C13: trait_type | value (e.g., "rarity" | "legendary")
B14:C14: trait_type | value (e.g., "background" | "blue")
...
B22:C22: trait_type | value
```

### 3. Configure Optional Settings

```
B24: Send Notification (true/false) - Email notifications to recipients
B25: Reupload Linked Files (true/false) - Reupload metadata files to IPFS
```

### 4. Add Recipient Email Addresses

Starting from row 29, add email addresses in column A:

```
A29: first.recipient@example.com
A30: second.recipient@example.com
A31: third.recipient@example.com
...

### 5. Start Minting

1. In your spreadsheet, click **NFT Minting** → **Mint NFTs**
2. Monitor progress in real-time as the script processes each email
3. Check status updates in columns D (Order ID), E (Status), and F (Transaction Hash)

---

## Using in Production

<div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 12px; margin: 16px 0;">
<strong>⚠️ Important:</strong> Always test with a small batch first in production
</div>


1. Create an account in the [Crossmint Production Console](https://www.crossmint.com).
2. Generate Server side API Keys with the same scopes used on staging.
3. Configure your production collection.
4. Update cell D16 with your production blockchain (e.g., "polygon" instead of "polygon-amoy")


---

## Advanced Usage

For advanced usage, refer to the Crossmint documentation:

• **Add Apple Pay**: [https://docs.crossmint.com/payments/embedded/guides/apple-pay](https://docs.crossmint.com/payments/embedded/guides/apple-pay)
• **Customize the UI**: [https://docs.crossmint.com/payments/embedded/guides/ui-customization](https://docs.crossmint.com/payments/embedded/guides/ui-customization)
• **Edit payment methods**: [https://docs.crossmint.com/payments/embedded/guides/payment-methods](https://docs.crossmint.com/payments/embedded/guides/payment-methods)
• **API Reference**: [https://docs.crossmint.com/api-reference](https://docs.crossmint.com/api-reference)
• **Collection Management**: [https://docs.crossmint.com/nft-checkout/collection-management](https://docs.crossmint.com/nft-checkout/collection-management)
• **Error Handling**: [https://docs.crossmint.com/api-reference/common-errors](https://docs.crossmint.com/api-reference/common-errors)

---

## Support

<div align="center">

For support and questions:

[📖 **Documentation**](https://docs.crossmint.com) • [💬 **Discord Community**](https://discord.gg/crossmint) • [📧 **Support Email**](mailto:support@crossmint.com)

</div>
