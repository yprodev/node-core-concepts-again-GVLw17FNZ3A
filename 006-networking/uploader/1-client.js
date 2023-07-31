const net = require('net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOST = '::1';
const FILEPATH = './text.txt';

const socket = net.createConnection(
  {
    host: HOST,
    port: PORT
  }, async () => {
    const filePath = FILEPATH;
    const fileHandle = await fs.open(filePath, 'r');
    const fileReadStream = fileHandle.createReadStream();

    // Reading from source file
    fileReadStream.on('data', (data) => {
      if (!socket.write(data)) {
        fileReadStream.pause();
      }
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

