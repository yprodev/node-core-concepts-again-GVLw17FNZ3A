// Source: https://www.youtube.com/watch?v=X-AhceP6jpA

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(eventName, callback) {
		if (this.events[eventName]) {
			this.events[eventName].push(callback)
		} else {
			this.events[eventName] = [callback];
		}
	}

	trigger(eventName, ...rest) {
		if (this.events[eventName]) {
			this.events[eventName].forEach((callback) => {
				callback.apply(null, rest);
			});
		}
	}
}

const ee = new EventEmitter();

ee.on('change', (x, y) => {
	console.log(`hello there: ${x}, ${y}`);
});

ee.trigger('change', 'args1', 'args2');
