const path = require("path");
const util = require("util");
const fs = require("fs");

console.clear();
// console.log(__dirname);
const filesDirectory = path.join(__dirname, "files");
// console.log(filesDirectory);
// util.log(filesDirectory);
const filename = path.join(filesDirectory, "test.txt");

// fs.writeFile(filename, "File contents:  Hello World!", (err) => {
//   if (err) {
//     console.log("Error writing file", err);
//     return;
//   }
//   console.log("Writing the file worked!");
// });

const fileContents = fs.readFileSync(filename, "UTF-8");
console.log(fileContents);
