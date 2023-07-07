const fs = require('fs/promises');

(async () => {
	const watcher = fs.watch('./command.txt');

	// async iterator
	for await (const event of watcher) {
		if (event.eventType === 'change' && event.filename === 'command.txt') {
			console.log('The file was changed');
		}
	}
})();