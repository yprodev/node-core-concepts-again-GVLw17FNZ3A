const fs = require('fs/promises');

(async () => {
	// commands
	const COMMAND_CREATE_FILE = "create a file";
	const COMMAND_DELETE_FILE = "delete a file";
	const COMMAND_RENAME_FILE = "rename a file";
	const COMMAND_ADD_TO_FILE = "add to a file";

	const createFile = async (path) => {
		let existingFileHandle;

		try {
			// check if the file is already being existed
			existingFileHandle = await fs.open(path, 'r');
			existingFileHandle.close();
			// return if the file exists
			return console.log(`the file ${path} already exists`);
		} catch (error) {
			// we don't have the file, so let's create it
			const newFileHandle = await fs.open(path, 'w');
			console.log('A new file was successfully created');
			newFileHandle.close();
		}
	};

	const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log('The file was successfully removed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No file at this path');
      } else {
        console.log(`An error occurred while removing the file: ${error}`);
      }
    }
	};

	const renameFile = async (path, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log('The file was successfully renamed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No file at this path to rename or destination does\'nt exist');
      } else {
        console.log(`An error occurred while removing the file: ${error}`);
      }
    }
	};

  let addedContent;

	const addToFile = async (path, content) => {
    if (addedContent === content) return;
    // Append descriptor
    try {
      const fileHandle = await fs.open(path, 'a');
      fileHandle.write(content);
      addedContent = content;
      console.log('The content was added successfully');
    } catch (error) {
      console.log(`An error occurred while removing the file: ${error}`);
    }
    fileHandle.close();
	};

	const commandFileHadler = await fs.open('./command.txt', 'r');
	const watcher = fs.watch('./command.txt');

	commandFileHadler.on("change", async () => {
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
		await commandFileHadler.read(buffer, offset, length, position);

		const command = buffer.toString('utf-8');

		// create a file
		// COMMAND: create a file <path>
		if (command.includes(COMMAND_CREATE_FILE)) {
			const filePath = command.substring(COMMAND_CREATE_FILE.length + 1);
			await createFile(filePath);
		}

		// delete a file
		// COMMAND: delete a file <path>
		if (command.includes(COMMAND_DELETE_FILE)) {
			const filePath = command.substring(COMMAND_DELETE_FILE.length + 1);
			await deleteFile(filePath);
		}

		// rename a file
		// COMMAND: rename a file <path> to <new-path>
		if (command.includes(COMMAND_RENAME_FILE)) {
			const SEPARATOR = ' to ';
			const _idx = command.indexOf(SEPARATOR);
			const oldFilePath = command.substring(COMMAND_RENAME_FILE.length + 1, _idx);
			const newFilePath = command.substring(_idx + SEPARATOR.length);

			await renameFile(oldFilePath, newFilePath);
		}

		// add to a file
		// COMMAND: add to a file <path> this content: <content>
		if (command.includes(COMMAND_ADD_TO_FILE)) {
			const SEPARATOR = ' this content: ';
			const _idx = command.indexOf(' this content: ');
			const filePath = command.substring(COMMAND_ADD_TO_FILE + 1, _idx);
			const content = command.substring(_idx + SEPARATOR.len);

			await addToFile(filePath, content);
		}
	});

	// async iterator
	for await (const event of watcher) {
		if (event.eventType === 'change') {
			commandFileHadler.emit(event.eventType);
		}
	}
})();
