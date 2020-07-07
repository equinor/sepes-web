const { BlobServiceClient } = require('@azure/storage-blob');

export const getImage = async (blobName) => {
    const account = "";
    const sas = "";
    if (sas && account) {
        const blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net${sas}`
            );
        
            let i = 1;
            let iter = await blobServiceClient.listContainers();
            for await (const container of iter) {
              console.log(`Container ${i++}: ${container.name}`);
            }
            const containerClient = blobServiceClient.getContainerClient('studylogos');
            let blobs = containerClient.listBlobsFlat();
            let blobname = ''
            let blobExist = false;
            for await (const blob of blobs) {
                console.log(`Blob ${i++}: ${blob.name}`);
                blobname = blob.name;
                if (blobName == blobname) {
                    blobExist = true;
                }
              }
            if(blobExist){
                const blobClient = containerClient.getBlobClient(blobName);
                const downloadBlockBlobResponse = await blobClient.download();
                const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
                return downloaded;
            }
            else{
                return;
            }
    }
    return;
    
};

async function blobToString(blob){
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(blob);
    });
  }