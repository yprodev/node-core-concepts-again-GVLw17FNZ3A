const fs = require('node:fs');

// Number of iterations: 10000000
// Execution time:       19s
// CPU:                  40% (one core)
// Memory:               15% (~6Gig)
console.time('writeMany');
fs.open('text3.txt', 'w', (error, fileDescriptor) => {
  for (let i = 0; i < 10000000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8');
    fs.writeSync(fileDescriptor, buff);
  }

  console.timeEnd('writeMany');
});

