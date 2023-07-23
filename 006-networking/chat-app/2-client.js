const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3008 
  },
  async () => {
    console.log('connected to server');

    const message = await rl.question('Enter a message: ');

    client.write(message);
  }
);

client.on('data', (data) => {
  console.log('Received message: ', data);
});

client.on('close', () => {
  console.log('connection closed');
});

client.on('end', () => {
  console.log('ended');
});

