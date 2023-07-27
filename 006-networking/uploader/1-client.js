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
    const fileStream = fileHandle.createReadStream();

    // Reading from source file
    fileStream.on('data', (data) => {
      socket.write(data);
    });
  }
);

