const fs = require('node:fs/promises');

(async () => {
  console.time('writeMany');

  const fileHandle = await fs.open('text.txt', 'w');
  const stream = fileHandle.createWriteStream();


  const FINISH = 1000000;
  let i = 0;

  const writeMany = () => {
    while (i < FINISH) {
      const buff = Buffer.from(` ${i} `, 'utf-8');

      // This is our last write
      if (i === FINISH) {
        return stream.end(buff); // will emit a finish event
      }

      // if false, stop the loop 
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  // resume our loop once ourstream
  // stream's internal buffer is emptied
  stream.on('drain', () => {
    console.log('drained');
    writeMany();
  });

  // Finish event does not work when the file opened. You need to listen
  // to 'close' event..
  stream.on('finish', () => {
    console.log('finished event happened');
    console.timeEnd('writeMany');
    fileHandle.close();
  });

})();

