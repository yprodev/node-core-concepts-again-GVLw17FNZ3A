const buff_1 = Buffer.alloc(8);
const buff_2 = Buffer.from("string", 'utf-8');
const buff_3 = Buffer.from([115], 'utf-8');
const buff_4 = Buffer.from([115, 116, 114, 105, 110, 103], 'hex');
const buff_5 = Buffer.from('E4BDA0', 'hex');

buff_1.write("s", "utf-8");

console.log(buff_1);

console.log(`-----------------------------`);

console.log(`Buffer from: ${buff_2}`);
console.log(`Buffer from: ${JSON.stringify(buff_2.toJSON(), null, 2)}`);

console.log(`-----------------------------`);

console.log(buff_3); // <Buffer 73>
console.log(buff_3.toString()); // s, instead of <Buffer 73>
console.log(`Buffer from: ${buff_3}`); // s, instead of [115] and <Buffer 73>

console.log(`-----------------------------`);

console.log(buff_4.toString('utf-8'));
console.log(buff_4.toString('utf-16le'));

console.log(`-----------------------------`);

console.log(buff_5.toString('utf-8'));
