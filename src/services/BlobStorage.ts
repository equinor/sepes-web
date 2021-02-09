import { TransferProgressEvent } from '@azure/core-http';
import { BlockBlobClient } from '@azure/storage-blob';
const { BlobServiceClient } = require('@azure/storage-blob');

export const uploadFile = async (
    blobUri: string,
    blobName: string,
    data: any,
    totalSize: any,
    setPercentComplete,
    controller: any
) => {
    if (blobUri) {
        const blobServiceClient = new BlobServiceClient(blobUri);
        const containerClient = blobServiceClient.getContainerClient('files');
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        try {
            await blockBlobClient.uploadBrowserData(data, {
                onProgress: (progress: TransferProgressEvent) => {
                    const percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
                    if (percentCalculated > 0) {
                        setPercentComplete(percentCalculated);
                    }
                },
                abortSignal: controller.signal
            });
        } catch (e) {
            if (e.name === 'AbortError') {
                // abort was called on our abortSignal
                console.log('Operation was aborted by the user');
            } else {
                // some other error occurred 🤷‍♂️
                console.log('Uploading file failed');
            }
        }
    }
};

export default uploadFile;
