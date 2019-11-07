const hello = "Hello from NodeJS";
console.clear();
// for (let k = 0; k < 10; k++) {
//   setTimeout(() => {
//     console.log(k, hello);
//     console.log("11"-1);
//     console.log("11"+1);
//   }, k * 1000);
// }

let counter = 0;
setInterval(() => {
  counter++;
  console.log("counter = ", counter);
}, 500);