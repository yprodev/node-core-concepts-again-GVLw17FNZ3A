const buff = Buffer.alloc(8);

buff.write("s", "utf-8");

console.log(buff); // <Buffer 73 00 00 00 00 00 00 00>
