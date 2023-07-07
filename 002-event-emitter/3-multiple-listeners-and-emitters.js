const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('foo', () => {
	console.log('An event occurred 1');
});

myEmitter.on('foo', () => {
	console.log('An event occurred 2');
});

myEmitter.on('foo', (x) => {
	console.log(`An event with the parameter occurred: ${x}`);
});

myEmitter.on('bar', () => {
	console.log('An event occurred: bar');
});

myEmitter.emit('foo');
myEmitter.emit('foo', 42);
myEmitter.emit('bar');
