const { Writable } = require('node:stream');
const fs = require('node:fs');

class FileWriteSteam extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fileDescriptor = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, 'w', (error, fileDescriptor) => {
      if (error) {
        callback(error);
      } else {
        this.fileDescriptor = fileDescriptor;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fileDescriptor, Buffer.concat(this.chunks, (error) => {
        if (error) {
          return callback(error);
        }

        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      }));
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (error) => {
      if (error) return callback(error);

      this.chunks = [];
      // If this callback will not be executed, the stream will
      // not emit a 'finish' event. You may comment out callback();
      // to see the result
      callback();
    });
  }

  _destroy(err, callback) {
    console.log('Number of writes: ', this.writesCount);
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (error) => {
        callback(err || error);
      });
    } else {
      // Never ever do this: throw new Error();
      // Use callback(error) instead
      // Never ever do this: this.emit('error')
      // Use callback(error) instead
      callback(err);
    }
  }
}

const stream = new FileWriteSteam({ highWaterMark: 1800, fileName: 'dest.txt' });

stream.write(Buffer.from('this is the test string'));
stream.end(Buffer.from('Our last write'));

stream.on('finish', () => {
  console.log('stream was finished');
});


