const net = require('net');
const fs = require('node:fs/promises');

const PORT = 5050;
const HOST = '::1';
const DESTINATION = `storage/test.txt`;

const server = net.createServer(() => {});

server.on('connection', async (socket) => {
  console.log('new connection');

  const fileHandle = await fs.open(DESTINATION, 'w');
  const fileStream = fileHandle.createWriteStream();

  socket.on('data', (data) => {
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

