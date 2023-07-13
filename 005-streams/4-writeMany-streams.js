const fs = require('node:fs/promises');

// IMPORTANT: Don't do it this way! It's not a
// good practice
// --------------------------------------------
// Number of iterations: 1000000
// Execution time: 436 ms
// CPU: could not event see it :)
// Memory: could not event see it :) 
(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8');
    stream.write(buff);
  }

  console.timeEnd('writeMany');
})();

