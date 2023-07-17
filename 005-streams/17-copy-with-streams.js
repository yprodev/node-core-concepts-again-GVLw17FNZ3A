const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  console.time('copy');

  const srcFile = await fs.open(SOURCE, 'r');
  const destFile = await fs.open(DESTINATION, 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // Automatically controls the drain event and backpressure
  readStream.pipe(writeStream);

  console.timeEnd('copy');
})();


