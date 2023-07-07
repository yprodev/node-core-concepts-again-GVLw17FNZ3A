const fs = require('fs');

const content = fs.readFileSync('./text.txt');

console.log(content); // <Buffer 53 6f 6d 65 20 72 61 6e 64 6f 6d 20 74 65 78 74>
console.log(content.toString('utf-8')); // Some random text
