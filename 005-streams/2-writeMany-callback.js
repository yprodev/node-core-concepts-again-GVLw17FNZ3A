const fs = require('node:fs');

// Execution time: 1.6s
// CPU: 40% (one core)
// Memory: 15% (~6Gig)
console.time('writeMany');
fs.open('text.txt', 'w', (error, fileDescriptor) => {
  for (let i = 0; i < 10000000; i++) {
    fs.writeSync(fileDescriptor, ` ${i} `);
  }

  console.timeEnd('writeMany');
});

