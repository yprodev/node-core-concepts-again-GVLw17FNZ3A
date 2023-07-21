const net = require('net');

const PORT = 3008;
const HOSTNAME = '127.0.0.1';

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('A new connection to the server');
});

server.listen(PORT, HOSTNAME, () => {
  console.log('opened server on', server.address());
});

