var figlet = require('figlet');
const imgToAscii = require('ascii-img-canvas-nodejs');

// Text to ASCII Art
console.clear();
figlet('Dr. David Fisher', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
});


// Image to ASCII Art

const opts = {};

imgToAscii('images/RoseLogo.png', opts).then((asciiImgLocal) => {
  console.log(asciiImgLocal);
});