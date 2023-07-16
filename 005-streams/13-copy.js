const fs = require('node:fs/promises');

const DESTINATION = 'dest.txt';
const SOURCE = 'src.txt';

(async () => {
  const destFile = await fs.open(DESTINATION, 'w');
  // Opens file and do it in one buffer - fs.readFile()
  const srcFile = await fs.readFile(SOURCE);

  await destFile.write(srcFile);
})();


