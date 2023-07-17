const { Writable } = require('node:stream');
const fs = require('node:fs');

class FileWriteSteam extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fileDescriptor = null;
  }

  // It will run after your constructor and before
  // any other method insice your custom
  // It will put off all calling the other methods until
  // we call the callback function.
  _construct(callback) {
    fs.open(this.fileName, 'w', (error, fileDescriptor) => {
      if (error) {
        // If there were arguments, it means we have an console.error
        // so we should not proceed
        callback(error);
      } else {
        this.fileDescriptor = fileDescriptor;
        // No arguments means it was sucessful
        callback();
      }
    });
  }

  // Use method with underscore only! _write
  _write(chunk, encoding, callback) {

    console.log('file descriptor', this.fileDescriptor);
    
    // Tbis callback emits 'drain' event
    callback();

    // Never ever emit 'drain' event from inside
    // you child class
    // this.emit('error');
    // this.emit('drain');
  }

  // _final() {
  //
  // }
  //
  // _destroy() {
  //
  // }
}

const stream = new FileWriteSteam({ highWaterMark: 1800, fileName: 'src.txt' });

// Never ever use your methods explicitelly
// like: stream._write();
stream.write(Buffer.from('this is the test string'));
// stream.end(Buffer.from('Our last write'));
//
// steam.on('drain', () => {
//
// });


