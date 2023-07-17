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
      callback();
    });
  }

  // _destroy() {
  //
  // }
}

const stream = new FileWriteSteam({ highWaterMark: 1800, fileName: 'dest.txt' });

stream.write(Buffer.from('this is the test string'));
// stream.end() fill notify _final() {} method to be executed
stream.end(Buffer.from('Our last write'));

// steam.on('drain', () => {
//
// });


