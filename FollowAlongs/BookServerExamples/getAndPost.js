const express = require("express");
var app = express();

// Add page handlers
app.get("/", (request, response) => {
  response.send("<h1>Default page</h1>");
});
app.get("/hello", (request, response) => {
  response.send("<h1>Hello Express</h1>");
});
app.get("/goodbye", (request, response) => {
  response.send("<h1>Goodbye from Express</h1>");
});

app.listen(3000);
