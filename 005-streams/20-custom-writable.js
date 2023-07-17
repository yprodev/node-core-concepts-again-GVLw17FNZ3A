const { Writable } = require('node:stream');

class FileWriteSteam extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
  }

  // Use method with underscore only! _write
  _write(chunk, encoding, callback) {
    
    // Tbis callback emits 'drain' event
    callback();

    // Never ever emit 'drain' event from inside
    // you child class
    // this.emit('error');
    // this.emit('drain');
  }
}

const stream = new FileWriteSteam({ highWaterMark: 1800 });

// Never ever use your methods explicitelly
// like: stream._write();
stream.write(Buffer.from('this is the test string'));
stream.end(Buffer.from('Our last write'));

steam.on('drain', () => {

});


