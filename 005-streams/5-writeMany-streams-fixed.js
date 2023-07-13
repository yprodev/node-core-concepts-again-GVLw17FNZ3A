const fs = require('node:fs/promises');

(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  // 1. stream.writableLength value should never reachstream
  // stream.writableHighWaterMark value.
  // It is the value that shows the internal buffersize
  // size of the stream object created.
  
  // 2. Check what stream.write() method returns. If it is false,
  // then the internal stream's buffer is full.

  // 3. Before writing again to the stream (internal streram 
  // buffer) wait for 'drain' event first, to continue writing.
  console.log(stream.writableHighWaterMark);
  console.log(stream.writableLength);

  const buff = Buffer.alloc(16383, 10);

  console.log(stream.write(buff));
  console.log(stream.write(Buffer.alloc(1, 'a')));


  stream.on('drain', () => {
    console.log('We are now safe to write more');
  });

  // fileHandle.close();
  console.timeEnd('writeMany');
})();

