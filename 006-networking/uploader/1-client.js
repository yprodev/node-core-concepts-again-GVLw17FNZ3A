const net = require('net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOST = '::1';
const FILEPATH = './src.txt';

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

async function displayProgress(
  fileSize,
  data,
  uploadedPercentage,
  bytesUploaded
) {
  let newUploadedPercentage = Math.round((bytesUploaded / fileSize) * 100);

  if (newUploadedPercentage !== uploadedPercentage) {
    uploadedPercentage = newUploadedPercentage; 

    await moveCursor(0, -1);
    await clearLine(0);

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

    let uploadedPercentage = 0;
    let bytesUploaded = 0;

    // Reading from source file
    fileReadStream.on('data', async (data) => {
      if (!socket.write(data)) {
        fileReadStream.pause();
      }

      bytesUploaded += data.length; // add the number of bytes
      await displayProgress(fileSize, data, uploadedPercentage, bytesUploaded);
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

