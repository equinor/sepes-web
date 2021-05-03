import { TransferProgressEvent } from '@azure/core-http';
import { BlockBlobClient } from '@azure/storage-blob';
import { findWithAttr, removeFirstOccurenceCharacter } from 'components/common/helpers/datasetHelpers';

const { BlobServiceClient } = require('@azure/storage-blob');

/*
export const uploadFile2 = async (
    blobUri: string,
    blobName: string,
    data: any,
    totalSize: any,
    setPercentComplete: any,
    percentComplete: any,
    controller: any,
    progressArray: any
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
                        //percentComplete[blobName] = percentCalculated;

                        let filePercent = { blobName: blobName, percent: percentCalculated };

                        var arrayObj = [
                            { name: 'bull', text: 'sour' },
                            { name: 'tom', text: 'tasty' },
                            { name: 'tom', text: 'tasty' }
                        ];
                        var index = progressArray.findIndex((x) => x.blobName == blobName);
                        // here you can check specific property for an object whether it exist in your array or not

                        index === -1
                            ? progressArray.push(filePercent)
                            : (progressArray[index].percent = percentCalculated);

                        let temp: any = [...percentComplete];
                        temp.push(filePercent);
                        console.log(temp);
                        setPercentComplete(temp);

                        //let temp: any = [...percentComplete];
                        //temp.push(percentCalculated);
                        //progressArray.push(percentCalculated);

                        //progressArray = temp;

                        //setPercentComplete(temp);
                        setPercentComplete(progressArray);
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
*/
/*
const findWithAttr = (array, attr, value) => {
    for (let i = 0; i < array.length; i += 1) {
        const compareValue = removeFirstOccurenceCharacter(array[i][attr], '/');
        if (compareValue === value) {
            return i;
        }
        if (compareValue.substring(compareValue.lastIndexOf('/') + 1) === value.substring(value.lastIndexOf('/') + 1)) {
            return i;
        }
    }
    return -1;
};
*/

export const updateWithProgress = (
    percentCalculated,
    progressArray,
    index,
    blobName,
    data,
    progress,
    setFiles,
    abortArray,
    numberOfFilesInProgress,
    updateTotalProgress
) => {
    let progressArrayIndex = findWithAttr(progressArray, 'path', blobName);
    if (index === -1) {
        progressArrayIndex = findWithAttr(progressArray, 'path', blobName.substring(1));
    }
    if (percentCalculated >= 0) {
        const temp: any = [...progressArray];
        if (progressArrayIndex === -1) {
            const modfiedBlob = data;
            modfiedBlob.percent = percentCalculated;
            modfiedBlob.uploadedBytes = progress.loadedBytes;
            temp.push(modfiedBlob);
            progressArray.push(modfiedBlob);
        } else if (temp[progressArrayIndex] && temp) {
            progressArray[progressArrayIndex].percent = percentCalculated;
            temp[progressArrayIndex].percent = percentCalculated;
            progressArray[progressArrayIndex].uploadedBytes = progress.loadedBytes;
            temp[progressArrayIndex].uploadedBytes = progress.loadedBytes;
        }
        if (numberOfFilesInProgress <= 100) {
            setFiles(temp);
        } else {
            updateTotalProgress();
        }

        const filePercent = {
            blobName,
            percent: percentCalculated,
            controller: new AbortController()
        };

        if (index === -1) {
            abortArray.push(filePercent);
        } else if (abortArray[index]) {
            abortArray[index].percent = percentCalculated;
        }
    }
};
export const uploadFile = async (
    blobUri: string,
    blobName: string,
    data: any,
    totalSize: any,
    abortArray: any,
    setFiles: any,
    progressArray: any,
    fileName: string,
    numberOfFilesInProgress: number,
    updateTotalProgress: any
) => {
    const blobServiceClient = new BlobServiceClient(blobUri);
    const containerClient = blobServiceClient.getContainerClient('files');
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        const index = abortArray.findIndex((x: any) => x.blobName === fileName);

        if (totalSize === 0) {
            updateWithProgress(
                100,
                progressArray,
                index,
                blobName,
                data,
                { loadedBytes: 0 },
                setFiles,
                abortArray,
                numberOfFilesInProgress,
                updateTotalProgress
            );
        }

        blockBlobClient
            .uploadBrowserData(data, {
                onProgress: (progress: TransferProgressEvent) => {
                    let percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
                    if (percentCalculated < 1) {
                        percentCalculated = 1;
                    } else if (Math.floor(totalSize) === 0) {
                        percentCalculated = 100;
                    }
                    updateWithProgress(
                        percentCalculated,
                        progressArray,
                        index,
                        blobName,
                        data,
                        progress,
                        setFiles,
                        abortArray,
                        numberOfFilesInProgress,
                        updateTotalProgress
                    );
                },
                abortSignal: abortArray[index] && abortArray[index].controller.signal
            })
            .catch(() => {
                //Do nothing
            });
    } catch (e) {
        console.log('abort');
        if (e.name === 'AbortError') {
            // abort was called on our abortSignal
            console.log('Operation was aborted by the user');
        } else {
            // some other error occurred 🤷‍♂️
            console.log('Uploading file failed');
        }
    }
};

export const deleteFile = async (blobUri: string, blobName: string) => {
    const blobServiceClient = new BlobServiceClient(blobUri);
    const containerClient = blobServiceClient.getContainerClient('files');

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(
        removeFirstOccurenceCharacter(blobName, '/')
    );

    try {
        blockBlobClient.delete().catch(() => {
            console.log('Error deleting file(s)');
        });
    } catch (e) {
        console.log('abort');
        if (e.name === 'AbortError') {
            // abort was called on our abortSignal
            console.log('Operation was aborted by the user');
        } else {
            // some other error occurred 🤷‍♂️
            console.log('Uploading file failed');
        }
    }
};

export default uploadFile;
