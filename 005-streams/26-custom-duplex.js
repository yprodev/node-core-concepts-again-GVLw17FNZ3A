const { Duplex } = require('node:stream');
const fs = require('node:fs');

class DuplexStream extends Duplex {
  constructor({
    writableHighWaterMark,
    readableHighWaterMark,
    readFileName,
    writeFileName
  }) {
    super({ writableHighWaterMark, readableHighWaterMark });

    this.writeFileName = writeFileName;
    this.readFileName = readFileName;
    this.writeFileDescriptor = null;
    this.readFileDescriptor = null;
    this.chunks = [];
    this.chunksSize = 0;
  }

  _construct(callback) {
    fs.open(this.readFileName, 'r', (errorRead, readFileDescriptor) => {
      if (errorRead) return callback(errorRead);

      this.readFileDescriptor = readFileDescriptor;

      fs.open(this.writeFileName, 'w', (errorWrite, writeFileDescriptor) => {
        if (errorWrite) return callback(errorWrite);

        this.writeFileDescriptor = writeFileDescriptor;

        callback();
      });
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(
        this.writeFileDescriptor,
        Buffer.concat(this.chunks),
        (error) => {
          if (error) return callback(error);

          this.chunks = [];
          this.chunksSize = 0;
          
          callback();
        }
      );
    } else {
      callback();
    }
  }

  _read(size) {
    const buffer = Buffer.alloc(size);
    fs.read(
      this.readFileDescriptor,
      buffer,
      0,
      size,
      null,
      (error, bytesRead) => {
        if (error) return this.destroy(error);
        
        this.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null);
      }
    );
  }

  _final(callback) {
    fs.write(this.writeFileDescriptor, Buffer.concat(this.chunks), (error) => {
      if (error) return callback(error);

      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    // We did NOT close the files here, but we should
    // Skipping this to speed up
    callback(error);
  }

}

const duplex = new DuplexStream({
  readFileName: 'src.txt',
  writeFileName: 'dest.txt',
});

duplex.write(Buffer.from('this is string 0\n'));
duplex.write(Buffer.from('this is string 1\n'));
duplex.write(Buffer.from('this is string 2\n'));
duplex.write(Buffer.from('this is string 3\n'));
duplex.write(Buffer.from('this is string 4\n'));
duplex.end(Buffer.from('end of write'));


duplex.on('data', (chunk) => {
  console.log(chunk.toString('utf-8'));
});


