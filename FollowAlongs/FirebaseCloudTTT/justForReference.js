var express = require("express");
var app = express();

app.use(express.static("public"));

function getOpenLocations(boardString) {
  const openLocations = [];
  for (let k = 0; k < boardString.length; k++) {
    if (boardString.charAt(k) == '-') {
      openLocations.push(k)
    }
  }
  return openLocations;
}

app.get("/api/getmove/:board", (request, response) => {
  const boardString = request.params.board;
  const openLocations = getOpenLocations(boardString);
  const moveSelected = openLocations[Math.floor(Math.random()*openLocations.length)];

  //var item = items[Math.floor(Math.random()*items.length)];

  // console.log(openLocations);
  // console.log(moveSelected);
  response.json({move: moveSelected});
});

app.listen(3000, (err) => {
  if (err) {
     console.log("Node Error!", err);
   }
   console.log("Listening on port 3000");
});
