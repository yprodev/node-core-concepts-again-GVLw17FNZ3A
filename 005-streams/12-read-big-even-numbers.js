const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('src.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = '';

  streamRead.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split('  ');

    const lastNumberCheck = Number(numbers[numbers.length - 2]) + 1 === Number(numbers[numbers.length - 1]);

    const firstNumberCheck = Number(numbers[0]) === Number(numbers[1] - 1);

    if (!firstNumberCheck) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if (!lastNumberCheck) {
      // Remove and take the las element from the array
      split = numbers.pop(); 
    }

    numbers.forEach((number) => {
      const jsNumber = Number(number);

      if (jsNumber % 2 === 0) {
        if (!streamWrite.write(' ' + jsNumber + ' ')) {
          streamRead.pause();
        }
      }
    });

  });

  streamWrite.on('drain', () => {
    console.log('drained');
    streamRead.resume();
  });
})();

