const express = require("express");
var app = express();

// Add page handlers
app.get("/hello", (request, response) => {

  const name = request.query.name;
  const myAge = request.query.age;

  response.send(`
    <h1>Learning about query parameters</h1>
    <p>Hello ${name}!  You are ${myAge} years old.</p>
  `);
});

app.listen(3000);