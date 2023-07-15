const fs = require('node:fs/promises');

(async () => {
  const fileHandle = await fs.open('text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  let i = 0;
  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, 'utf-8');

      // if false - the buffer is full
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  stream.on('drain', () => {
    writeMany();
  });

})();

