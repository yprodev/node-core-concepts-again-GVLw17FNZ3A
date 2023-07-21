const net = require('net');

const PORT = 3099;
const HOSTNAME = '127.0.0.1';

const server = net.createServer((socket) => {
  // Socket is a duplex stream
  socket.on('data', (data) => {
    console.log(data.toString('utf-8'));
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Opened TCP server on ${JSON.stringify(server.address(), null, 2)}`);
});


