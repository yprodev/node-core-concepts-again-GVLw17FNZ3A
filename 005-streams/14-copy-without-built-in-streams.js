const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  console.time('copy');

  const srcFile = await fs.open(SOURCE, 'r');
  const destFile = await fs.open(DESTINATION, 'w');

  // fileHandler.read() returns a chunk of a file,
  // not the whole file.
  console.log(await srcFile.read());

  console.timeEnd('copy');
})();


