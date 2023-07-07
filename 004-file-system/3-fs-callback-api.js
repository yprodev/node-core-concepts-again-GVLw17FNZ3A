const fs = require('fs');

fs.copyFile('text.txt', 'copied-promise.txt', (error) => {
	if (error) console.log(error);
});
