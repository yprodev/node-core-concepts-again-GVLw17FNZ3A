const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let clientId;


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
  client.write(`${clientId} | messaged: ${message}`);
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

client.on('data', async (data) => {
  const isIdPrefix = data.toString('utf-8').substring(0, 3) === 'id-';

  // log an empty line
  console.log();
  // move the cursor one line up
  await moveCursor(0, -1);
  // Clear the current line that the cursor is in
  await clearLine(0);

  if (isIdPrefix) {
    // when we get the id
    clientId = data.toString('utf-8').substring(3);
    
    console.log(`Your id is: ${clientId}\n`);
  } else {
    // when we get the message

    console.log('Received message: ', data.toString('utf-8'));
  }

  ask(client);

});

client.on('close', () => {
  console.log('connection closed');
});

client.on('end', () => {
  console.log('ended');
});

