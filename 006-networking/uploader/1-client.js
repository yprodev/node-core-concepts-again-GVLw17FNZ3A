const net = require('net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOST = '::1';
const FILEPATH = './text.txt';

function displayProgress(fileSize, data) {
  // Show the upload progress
  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  bytesUploaded += data.length; // add the number of bytes
  let newUploadedPercentage = Math.floor((bytesUploaded / fileSize) * 100);

  if (
    newUploadedPercentage % 5 === 0
    && newUploadedPercentage !== uploadedPercentage
  ) {
    uploadedPercentage = newUploadedPercentage; 
    console.log(`Uploading... ${uploadedPercentage}%`);
  }
}

const socket = net.createConnection(
  {
    host: HOST,
    port: PORT
  }, async () => {
    const filePath = FILEPATH;
    const fileHandle = await fs.open(filePath, 'r');
    const fileReadStream = fileHandle.createReadStream();
    const fileSize = (await fileHandle.stat()).size;


    // Reading from source file
    fileReadStream.on('data', (data) => {
      if (!socket.write(data)) {
        fileReadStream.pause();
      }

      displayProgress(fileSize, data);
    });

    socket.on('drain', () => {
      fileReadStream.resume();
    });

    fileReadStream.on('end', () => {
      console.log('The file was successfully uploaded');
      fileHandle.close();
      socket.end();
    });
  }
);

