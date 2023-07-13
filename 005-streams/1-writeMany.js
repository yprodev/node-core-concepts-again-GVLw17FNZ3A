const fs = require('node:fs/promises');

// Execution time: 13s
// CPU: 100% (one core)
// Memory: 0.5%
(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('text.txt', 'w');

  for (let i = 0; i < 1000000; i++) {
    await fileHandle.write(` ${i} `);
  }
  console.timeEnd('writeMany');
})();

