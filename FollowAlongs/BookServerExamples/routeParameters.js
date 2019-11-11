const express = require("express");
var app = express();

// Add page handlers
app.get("/users/:username/:age", (request, response) => {
  const myUsername = request.params.username;
  const myAge = request.params.age;
  response.send(`<h1>Profile for ${myUsername}, age ${myAge}</h1>`);
});

app.listen(3000);