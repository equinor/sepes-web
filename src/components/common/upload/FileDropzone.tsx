import React from 'react';
import Dropzone from './DropzoneFile';

const FileDropzoneContainer = (props: any) => {
    function handleImageUpload(fileEvent: File[]) {
        const file = fileEvent[0];
        props.setFiles(fileEvent);
        props.setImageUrl(URL.createObjectURL(file));
    }

    return (
        <div style={{ position: 'relative' }}>
            <Dropzone onDrop={(event: File[]) => handleImageUpload(event)} disabled={props.disabled} />
        </div>
    );
};
export default FileDropzoneContainer;

// This is options for the compression algorithm
// you should provide one of maxSizeMB, maxWidthOrHeight in the options
// const options = {
//   maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
//   // maxWidthOrHeight: 1000,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
//   useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
//   maxIteration: 10,       // optional, max number of iteration to compress the image (default: 10)
//   // exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
//   // onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100)
//   // fileType: string            // optional, fileType override
// }
