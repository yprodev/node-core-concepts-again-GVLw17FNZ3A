const { Readable } = require('node:stream');
const fs = require('node:fs');

class FileReadSteam extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fileDescriptor = null;
  }

  _construct(callback) {
    fs.open(this.fileName, 'r', (error, fileDescriptor) => {
      if (error) return callback(error);

      this.fileDescriptor = fileDescriptor;
      callback();
    });
  }

  _read(size) {
    const buffer = Buffer.alloc(size);

    fs.read(this.fileDescriptor, buffer, 0, size, null, (error, bytesRead) => {
      // Pushing null will emit 'end' event on readable stream
      // this.push(null);

      // With readable stream we will NOT call the callback with error.
      // Readable stream should destroy itself in case of an error.
      if (error) return this.destroy();


      // Pushing data to the internal stream buffer.
      // The 'data' event will be emitted.
      this.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

const readStream = new FileReadSteam({ fileName: 'dest.txt' });

readStream.on('data', (chunk) => {
  console.log('Read data: ', chunk.toString('utf-8'));
});

readStream.on('end', () => {
  console.log('Stream is done reading');
});

