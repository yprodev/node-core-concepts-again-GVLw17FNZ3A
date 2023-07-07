const buff = Buffer.alloc(8);

buff.write("s", "utf-8");

console.log(buff); // <Buffer 73 00 00 00 00 00 00 00>
console.log(buff.toJSON()); // JSON representation of buffer
console.log(buff.length); // get buffer length
console.log(buff[0]); // access the first element
