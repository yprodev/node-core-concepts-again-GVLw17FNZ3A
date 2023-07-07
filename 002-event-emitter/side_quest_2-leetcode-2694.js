class EventEmitter {
	eventMap = {}; // event -> Set()

	subscribe(event, cb) {
		if (!this.eventMap.hasOwnProperty(event)) {
			this.eventMap[event] = new Set();
		}

		this.eventMap[event].add(cb);

		return {
			unsubscribe: () => {
				console.log('unsubscribed...');
				this.eventMap[event].delete(cb);
			}
		};
	}

	emit(event, args = []) {
		const res = [];

		console.log('emitted...');

		(this.eventMap[event] ?? [])
			.forEach((callback) => {
				res.push(callback(...args));
			});

		return res; // return array of results according to the requirements
	}
}

const emitter = new EventEmitter();

// Subscribe to the onClick event with onClickCallback
function onClickCallback() {
	const VALUE = 99;

	console.log(`Callback is here: ${VALUE}`);

	return VALUE;
}

const sub = emitter.subscribe('onClick', onClickCallback);

emitter.emit('onClick'); // 99
sub.unsubscribe(); // undefined
emitter.emit('onClick'); // []
