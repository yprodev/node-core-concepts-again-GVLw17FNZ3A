const { Writable } = require('node:stream');

class FileWriteSteam extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
  }

  // It will run after your constructor and before
  // any other method insice your custom
  _construct() {
    
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

  _final() {

  }

  _destroy() {

  }
}

const stream = new FileWriteSteam({ highWaterMark: 1800 });

// Never ever use your methods explicitelly
// like: stream._write();
stream.write(Buffer.from('this is the test string'));
stream.end(Buffer.from('Our last write'));

steam.on('drain', () => {

});


