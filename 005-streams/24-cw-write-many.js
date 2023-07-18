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
      fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (error) => {
        if (error) {
          return callback(error);
        }

        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      });
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

  _destroy(err, callback) {
    console.log('Number of writes: ', this.writesCount);
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (error) => {
        callback(err || error);
      });
    } else {
      callback(err);
    }
  }
}

(() => {
  console.time('writeMany');

  const stream = new FileWriteSteam({
    fileName: 'dest.txt'
  });


  const FINISH = 1_000_000;
  let i = 0;

  const writeMany = () => {
    while (i < FINISH) {
      const buff = Buffer.from(` ${i} `, 'utf-8');

      if (i === FINISH - 1) {
        return stream.end(buff);
      }

      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  stream.on('drain', () => {
    console.log('drained');
    writeMany();
  });

  stream.on('finish', () => {
    console.timeEnd('writeMany');
  });

})();


