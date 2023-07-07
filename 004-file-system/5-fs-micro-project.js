const fs = require('fs/promises');

(async () => {
	const watcher = fs.watch('./command.txt');

	// async iterator
	for await (const event of watcher) {
		console.log(event);
	}
})();