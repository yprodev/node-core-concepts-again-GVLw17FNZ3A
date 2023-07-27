const net = require('net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOST = '::1';
const DESTINATION = `storage/test.txt`;

const server = net.createServer(() => {});

server.on('connection', (socket) => {
  console.log('new connection');

  let fileHandle;

  socket.on('data', async (data) => {
    fileHandle = await fs.open(DESTINATION, 'w');
    const fileStream = fileHandle.createWriteStream();

    // Writing to the destination
    fileStream.write(data);
  });

  socket.on('end', () => {
    console.log('connection ended');
    fileHandle.close();
  });
});

server.listen(PORT, HOST,  () => {
  console.log(`Uploader server opened on ${server.address()}:${PORT}`);
});

