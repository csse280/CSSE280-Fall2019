const express = require("express");
var app = express();

// Add page handlers
app.use(express.static("public"));

app.listen(3000);
