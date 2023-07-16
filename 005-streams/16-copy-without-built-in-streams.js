const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  console.time('copy');

  const srcFile = await fs.open(SOURCE, 'r');
  const destFile = await fs.open(DESTINATION, 'w');

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    bytesRead = readResult.bytesRead;

    if (bytesRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0);
      const newBuffer = Buffer.alloc(indexOfNotFilled);

      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);

      destFile.write(newBuffer);
    } else {
      destFile.write(readResult.buffer);
    }

  }


  console.timeEnd('copy');
})();


