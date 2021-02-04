const { BlobServiceClient } = require('@azure/storage-blob');

export const getImage = async (blobName) => {
    const account = 'stdshans325321cf1b';
    const sas =
        '?sv=2019-12-12&ss=bfqt&srt=c&sp=rwdlacupx&se=2021-02-04T17:43:41Z&st=2021-02-04T09:43:41Z&spr=https&sig=hLEHHweLkE17e03XGbhYe4Jg8TSRJWhvC6K5clLuyMU%3D';
    if (sas && account) {
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);
        let i = 1;
        let iter = await blobServiceClient.listContainers();
        /*
        for await (const container of iter) {
            console.log('3');
            console.log(`Container ${i++}: ${container.name}`);
        }
        */
        const containerClient = blobServiceClient.getContainerClient('files');
        let blobs = containerClient.listBlobsFlat();
        let blobname = '';
        let blobExist = false;
        for await (const blob of blobs) {
            console.log(`Blob ${i++}: ${blob.name}`);
            blobname = blob.name;
            if (blobName == blobname) {
                blobExist = true;
            }
        }
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        blockBlobClient.uploadBrowserData();

        if (blobExist) {
            const blobClient = containerClient.getBlobClient(blobName);
            const downloadBlockBlobResponse = await blobClient.download();
            const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
            return downloaded;
        } else {
            return;
        }
    }
    return;
};

async function blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
            resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(blob);
    });
}

export const uploadFile = async (blobName, data) => {
    const account = '';
    const sas = '';
    if (sas && account) {
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);
        let i = 1;

        const containerClient = blobServiceClient.getContainerClient('files');
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        blockBlobClient.uploadBrowserData(data);
    }
};
