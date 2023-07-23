const net = require('net');

const PORT = 3008;
const HOSTNAME = '127.0.0.1';

const server = net.createServer();

const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  socket.on('data', (data) => {
    clients.map((client) => {
      // Client is the same as socket
      client.write(data);
    });
  });

  clients.push(socket);
});

server.listen(PORT, HOSTNAME, () => {
  console.log('opened server on', server.address());
});

