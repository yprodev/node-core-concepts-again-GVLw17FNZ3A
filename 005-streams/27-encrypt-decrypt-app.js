const { Transform } = require('node:stream');
const fs = require('node:fs/promises');


class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
}

(async () => {
  const readFileHandle = await fs.open('src.txt', 'r');
  const writeFileHandle = await fs.open('dest.txt', 'w');

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();


