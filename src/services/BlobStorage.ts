import { TransferProgressEvent } from '@azure/core-http';
import { BlockBlobClient } from '@azure/storage-blob';
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
const findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};

export const uploadFile = async (
    blobUri: string,
    blobName: string,
    data: any,
    totalSize: any,
    abortArray: any,
    setFiles: any,
    progressArray: any
) => {
    const blobServiceClient = new BlobServiceClient(blobUri);
    const containerClient = blobServiceClient.getContainerClient('files');
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        const index = abortArray.findIndex((x: any) => x.blobName === blobName);

        blockBlobClient
            .uploadBrowserData(data, {
                onProgress: (progress: TransferProgressEvent) => {
                    let percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
                    if (percentCalculated < 1) {
                        percentCalculated = 1;
                    }
                    let index2 = findWithAttr(progressArray, 'name', blobName);
                    if (percentCalculated >= 0) {
                        let temp: any = [...progressArray];
                        if (index2 === -1) {
                            let modfiedBlob = data;
                            modfiedBlob.percent = percentCalculated;
                            temp.push(modfiedBlob);
                            progressArray.push(modfiedBlob);
                        } else if (temp[index2] && temp) {
                            progressArray[index2].percent = percentCalculated;
                            temp[index2].percent = percentCalculated;
                        }

                        setFiles(temp);

                        const filePercent = {
                            blobName,
                            percent: percentCalculated,
                            controller: new AbortController()
                        };

                        if (index === -1) {
                            abortArray.push(filePercent);
                        } else {
                            if (abortArray[index]) {
                                abortArray[index].percent = percentCalculated;
                            }
                        }
                    }
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

export default uploadFile;
