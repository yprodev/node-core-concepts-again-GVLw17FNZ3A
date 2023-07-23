const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const clearLine = (direction) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(direction, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};


const ask = async (client) => {
  const message = await rl.question('Enter a message: ');
  // move the cursor one line up
  await moveCursor(0, -1);
  // Clear the current line that the cursor is in
  await clearLine(0);
  client.write(message);
};

const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3008 
  },
  async () => {
    console.log('connected to server');

    ask(client);
  }
);

client.on('data', (data) => {
  console.log('Received message: ', data.toString('utf-8'));
  ask(client);
});

client.on('close', () => {
  console.log('connection closed');
});

client.on('end', () => {
  console.log('ended');
});

