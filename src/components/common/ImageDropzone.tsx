import React from 'react';
import imageCompression from 'browser-image-compression';
import Dropzone from './Dropzone';
//import { NotificationManager } from 'react-notifications';

interface pieceInfo {
  pieceName: string;
  artistName: string;
  description: string;
  imageUrl: string;
}

let link1 = document.createElement('img');
const AddImageAndCompressionContainer = (
  props:any
) => {
  function handleImageUpload(imageEvent: File[]) {
    var imageFile = imageEvent[0];
    var options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1000,
      useWebWorker: false,
    };
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        link1.src = URL.createObjectURL(compressedFile);
        console.log(link1.src);
        props.setImageUrl(link1.src);
      })
      .catch(function (error) {
        
      });
  }

  return (
    <Dropzone
      onDrop={(event: File[]) => handleImageUpload(event)}
      accept={'image/*'}
    />
  );
};
export default AddImageAndCompressionContainer;

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
