const net = require('net');

const PORT = 3099;
const HOSTNAME = '127.0.0.1';

// Create a TCP server
const server = net.createServer((socket) => {

});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Opened TCP server on ${JSON.stringify(server.address(), null, 2)}`);
});


