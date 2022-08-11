function getMintData() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var mintConfigSheet = ss.getSheets()[0];
    var data = mintConfigSheet.getRange('A3:B16').getValues();
    const apiSecret = data[0][1]
    const projectId = data[1][1]
  
    const nftName = data[4][1]
    const nftSymbol = data[5][1]
    const nftDescription = data[6][1]
    const sellerFeeBasisPoints = data[7][1]
    const imageUrl = data[8][1]
  
    const imageType = data[9][1]
    const projectUrl = data[10][1]
    const collectionName = data[11][1]
    const collectionFamily = data[12][1]
    const creatorAddress = data[13][1]
  
    
    const metadata = {
          name: nftName,
          symbol: nftSymbol,
          description: nftDescription,
          seller_fee_basis_points: sellerFeeBasisPoints,
          image: imageUrl,
          animation_url: "",
          external_url: projectUrl,
          collection: {name: collectionName, family: collectionFamily},
          properties: {
            files: [
              {
                "uri": imageUrl,
                "type": imageType
              }
            ],
            category: "image",
            creators: [
              {
                "address": creatorAddress,
                "share": 100
              }
            ]
          }
    }
    
    return {metadata, apiSecret, projectId}
  }
  