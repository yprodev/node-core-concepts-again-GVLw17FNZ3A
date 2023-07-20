const http = require('http');

const PORT = 4090;
const HOSTNAME = '127.0.0.1';

const server = http.createServer((req, res) => {
  const data = { message: 'Hi there!' };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Connection', 'close');
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});

// If you will not specify IP address, the loopback
// interface will be used by default
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on port ${PORT}`);
});

