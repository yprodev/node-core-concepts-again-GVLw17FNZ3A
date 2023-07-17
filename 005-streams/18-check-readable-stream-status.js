const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  console.time('copy');

  const srcFile = await fs.open(SOURCE, 'r');
  const destFile = await fs.open(DESTINATION, 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // Check readable stream status
  console.log(readStream.readableFlowing);

  readStream.pipe(writeStream);

  console.log(readStream.readableFlowing);

  readStream.unpipe(writeStream);

  console.log(readStream.readableFlowing);

  readStream.pipe(writeStream);

  console.log(readStream.readableFlowing);

  readStream.on('end', () => {
    console.timeEnd('copy');
  })

})();


