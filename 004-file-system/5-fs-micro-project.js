const fs = require('fs/promises');

(async () => {
	const commandFileHadler = await fs.open('./command.txt', 'r');
	const watcher = fs.watch('./command.txt');

	// async iterator
	for await (const event of watcher) {
		if (event.eventType === 'change') {
			console.log('The file was changed');
			const content = await commandFileHadler.read();
			console.log(content);
		}
	}
})();