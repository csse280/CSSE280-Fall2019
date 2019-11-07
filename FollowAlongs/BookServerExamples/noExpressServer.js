const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!doctype html>\n");
  response.write("<html lang='en'>\n");
  response.write("<title>Dice Rolls</title>\n");
  response.write("<body>\n")
  response.write("<h1>Hello World!!!</h1>");
  response.write("</body>\n</html>");
  response.end();
}).listen(3000);