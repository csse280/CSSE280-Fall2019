const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase and Dave Fisher!");
// });

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

function getOpenLocations(boardString) {
  const openLocations = [];
  for (let k = 0; k < boardString.length; k++) {
    if (boardString.charAt(k) == '-') {
      openLocations.push(k)
    }
  }
  return openLocations;
}

app.get("/getmove/:board", (request, response) => {
  const boardString = request.params.board;
  const openLocations = getOpenLocations(boardString);
  const moveSelected = openLocations[Math.floor(Math.random()*openLocations.length)];

  //var item = items[Math.floor(Math.random()*items.length)];

  // console.log(openLocations);
  // console.log(moveSelected);
  response.json({move: moveSelected});
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);