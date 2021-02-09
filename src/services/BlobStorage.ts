import { TransferProgressEvent } from '@azure/core-http';
import { distinctUntilChanged } from 'rxjs/operators';
import { BlockBlobClient, BlockBlobParallelUploadOptions } from '@azure/storage-blob';
import { AbortSignalLike, AbortController } from '@azure/abort-controller';
import { type } from 'os';
//import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
const { BlobServiceClient } = require('@azure/storage-blob');
/*
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
*/

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
        //let test2: AbortSignalLike = { addEventListener: listener, aborted: false, removeEventListener: () => {} };
        //let test: BlockBlobParallelUploadOptions = { abortSignal: test2 };
        //test.abortSignal()
        //let test3 = AbortSignal: type: 'abort', addEventListener('abort', test2), }
        //let test: AbortSignalLike = { addEventListener: listener, aborted: false, removeEventListener: () => {} };
        //test.aborted();
        //let test:addEventListener('abort', listener)

        //const controller = new AbortController();
        /*
        controller.signal.addEventListener('abort', function () {
            controller.abort();
            console.log('Download aborted');
        });
        //uploadData(controller.signal, blockBlobClient, setPercentComplete, data, totalSize);

        // at some point later
        try {
            controller.abort();
        } catch (error) {
            console.log(error);
            console.log('abortaaaa');
        }
        
        //controller.signal;
        console.log('aborted', controller.signal);
        */

        try {
            await blockBlobClient.uploadBrowserData(data, {
                onProgress: (progress: TransferProgressEvent) => {
                    const percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
                    setPercentComplete(percentCalculated);
                },
                abortSignal: controller.signal
            });
        } catch (e) {
            if (e.name === 'AbortError') {
                // abort was called on our abortSignal
                console.log('Operation was aborted by the user');
            } else {
                // some other error occurred 🤷‍♂️
                console.log('Downloading the shopping list failed');
            }
        }
        //controller.abort();
    }
};

const uploadData = async (abortSignal, blockBlobClient: BlockBlobClient, setPercentComplete, data, totalSize) => {
    await blockBlobClient.uploadBrowserData(data, {
        onProgress: (progress: TransferProgressEvent) => {
            const percentCalculated = Math.floor((progress.loadedBytes * 100) / totalSize);
            setPercentComplete(percentCalculated);
        },
        abortSignal
    });
};

/*
export const uploadFile2 = async (blobName: string, file: any) => {
    const account = 'stdshans325321cf1b';
    const sas =
        '?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-02-05T17:11:29Z&st=2021-02-05T09:11:29Z&spr=https&sig=1WnkwJtpQ6q%2FZfWuQzXFV6HHs23GVJLbB%2B3yacUNm3s%3D';
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);
    let i = 1;
    console.log('hmm');
    const containerClient = await blobServiceClient.getContainerClient('files');
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);
    console.log('hmm2');
    debugger;
    return new Observable<number>((observer) => {
        console.log('777');
        blockBlobClient
            .uploadBrowserData(file, {
                onProgress: onProgress(observer),
                blobHTTPHeaders: {
                    blobContentType: file.type
                }
            })
            .then(console.log('hmm4'), onUploadComplete(observer, file), onUploadError(observer));
    }).pipe(distinctUntilChanged());
};

const onUploadError = (observer: Subscriber<number>) => {
    return (error: any) => observer.error(error);
};

const onUploadComplete = (observer: Subscriber<number>, file: File) => {
    return () => {
        observer.next(file.size);
        observer.complete();
    };
};

const onProgress = (observer: Subscriber<number>) => {
    return (progress: TransferProgressEvent) => observer.next(progress.loadedBytes);
};
*/

export default uploadFile;
