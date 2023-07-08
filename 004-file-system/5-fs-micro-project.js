const fs = require('fs/promises');

(async () => {
	const commandFileHadler = await fs.open('./command.txt', 'r');
	const watcher = fs.watch('./command.txt');

	// async iterator
	for await (const event of watcher) {
		if (event.eventType === 'change') {
			console.log('The file was changed');

			// get the size of the file
			// needed for buffer size allocation
			const fileSize = (await commandFileHadler.stat()).size;

			// allocate hte buffer with the size of the file
			const buffer = Buffer.alloc(fileSize),
				// the location at which we want to start filling the buffer
				offset = 0,
				// how many bytes we want to read
				length = buffer.byteLength,
				// the position that we want to start reading the file from
				position = 0;

			// we always want to read the whole content from the biginning all the way to the end
			const content = await commandFileHadler.read(buffer, offset, length, position);

			console.log('buffer size', buffer);
			console.log(content);
		}
	}
})();
