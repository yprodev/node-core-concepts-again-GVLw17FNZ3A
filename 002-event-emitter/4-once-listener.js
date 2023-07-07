const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

// Not .on(), but .once()
myEmitter.once('bar', () => {
	console.log('An event occurred: bar');
});

myEmitter.emit('bar');
myEmitter.emit('bar');
myEmitter.emit('bar');
myEmitter.emit('bar');
myEmitter.emit('bar');
