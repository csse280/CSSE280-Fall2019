var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen(3000, (err) => {
  if (err) {
     console.log("Node Error!", err);
   }
   console.log("Listening on port 3000");
});
