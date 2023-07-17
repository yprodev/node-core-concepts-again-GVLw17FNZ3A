const { pipeline } = require('node:stream');
const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  console.time('copy');

  const srcFile = await fs.open(SOURCE, 'r');
  const destFile = await fs.open(DESTINATION, 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  pipeline(readStream, writeStream, (error) => {
    console.log('Error in pipeline: ', error);
    console.timeEnd('copy');
  });

})();


