const net = require('net');

const PORT = 3008;
const HOSTNAME = '127.0.0.1';

const server = net.createServer();

const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  const clientId = clients.length + 1;

  // Broadcasting the message to everyone when somebody
  // joined the chat
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });

  socket.write(`id-${clientId}`);

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8');
    const verticalPipeIdx = dataString.indexOf('|');
    const colonIdx = dataString.indexOf(':');
    const id = dataString.substring(0, verticalPipeIdx - 1);
    const message = dataString.substring(colonIdx + 2);
    
    
    clients.map((client) => {
      // Client is the same as socket
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  // Broadcasting the message to everyone when somebody
  // left the chat
  socket.on('end', () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left`);
    });
  });

  clients.push({
    id: clientId.toString(),
    socket
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log('opened server on', server.address());
});

