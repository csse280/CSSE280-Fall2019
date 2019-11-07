const myModule = require("./myOtherFile");

console.clear();
console.log(myModule.name);

console.log(myModule.getCounter());
myModule.inc();
myModule.inc();
myModule.inc();
console.log(myModule.getCounter());
myModule.dec();
console.log(myModule.getCounter());