const http = require("http");
const _ = require("underscore");

let abcCounter = 0;
let totalRequestsCounter = 0;

const abcHandler = (request, response) => {
  response.write("<h1>ABC Page</h1>");
  for (let k = 0; k < 5; k++) {
    let randNum = _.random(1, 6);
    response.write(`<p>${randNum}</p>`)
  }
  response.end();
};

const xyzHandler = (request, response) => {
  response.write("<!doctype html>\n");
  response.write("<html lang='en'>\n");
  response.write("<title>Dice Rolls</title>\n");
  response.write("<body>\n")
  response.write("<h1>Hello World!!!</h1>");
  response.write(`<div>abcCounter = ${abcCounter}</div>`);
  response.write(`<div>totalRequestsCounter = ${totalRequestsCounter}</div>`);
  response.write("</body>\n</html>");
  response.end();
};

const mainHandler = (request, response) => {
  response.writeHead(200, {
    // "Content-Type": "text/plain"
    "Content-Type": "text/html"
  });
  console.log("request.url = ", request.url);
  if (request.url == "/abc" || request.url == "/") {
    abcCounter++;
    abcHandler(request, response);
  } else if (request.url == "/xyz") {
    xyzHandler(request, response);
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html"
    });
    response.write("Page not found");
    response.end();
  }
  totalRequestsCounter++;
}

const server = http.createServer(mainHandler);
server.listen(3000, (err) => {
  if (err) {
    console.log("Err!", err);
  }
  console.log("The server is listening on port 3000");
});