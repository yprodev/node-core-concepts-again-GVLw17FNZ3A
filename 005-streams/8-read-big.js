const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('text.txt');
  const stream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });

  stream.on('data', (chunk) => {
    console.log('-----');
    console.log('chunk', chunk.length);
  });
})();


