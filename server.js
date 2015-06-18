/*

  SETUP

*/

// define the websockets express server
app = require('express.io')();
app.http().io();

/*

  NODE MODULES

*/

var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

/*

  FILES REQUESTS

*/

// send index.html
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

// send style.css
app.get('/css/style.css', function(req, res) {
    res.sendfile(__dirname + '/public/css/style.css');
});

// send jquery
app.get('/bower_components/jquery/dist/jquery.min.js', function(req, res) {
    res.sendfile(__dirname + '/bower_components/jquery/dist/jquery.min.js');
});

// send app.js
app.get('/js/app.js', function(req, res) {
    res.sendfile(__dirname + '/public/js/app.js');
});

// send camera.html
app.get('/camera', function(req, res) {
    res.sendfile(__dirname + '/public/views/camera.html');
});

/*

  WEBSOCKET EVENTS

*/

// setup complete...
app.io.route('loaded', function(req) {
    req.io.emit('ready', {
        message: 'ready'
    });
});

// image saving...
app.io.route('image', function(req) {

  // data send as base64 from client <canvas> element
  var image = req.data;

  // remove unnecessary junk from string
  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  // create image buffer to write file to disk
  var imageBuffer = decodeBase64Image(image);

  // use time to give each string a unique ID
  var date = new Date();
  var time = date.getTime();

  // write file to disk
  fs.writeFile('captures/capture' + time + '.png', imageBuffer.data, function (err) {

    // if all is working, broadcast event to client, else throw error
    if (err == null) {

      app.io.broadcast('saved');

    } else {

      console.log('Error: ', err);

    }

  });

});

/*

  SLICE IMAGES

*/

// saved images as an array
var images = fs.readdirSync('captures');

// amount of saved images on disk
var imageCount = images.length;

// assume there are no images currently
var imageCounter = 0;

// create a random string to ID the slices
function randomStringGenerator(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

// get images function to iterate over the images saved to disk
(function getImage() {

    // use 'setTimeout' to get around memory issues
    setTimeout(function () {

        // if there are more images than have been currently iterated through
        if (imageCount > imageCounter) {

          // path to current image to be sliced
          var image = 'captures/' + images[imageCounter];

          // use the size method to get the image width and height, useful for images submitted on mobile etc.
          gm(image).size(function(err, value){

            // check for errors, TO DO: put this in 'if' statement
            console.log('Error: ', err);

            // get current image width
            var imageWidth = value.width;

            // get current image height
            var imageHeight = value.height;

            // start slicing on first pixel
            var sliceCounter = 1;

            //
            (function getSlices() {

              // use 'setTimeout' to get around memory issues
              setTimeout(function() {

                // if the image height is bigger than the current slice
                if (imageHeight > sliceCounter) {

                  // apply the random string to the slice name, time not needed here as it is in the parent image file name
                  var randomString = randomStringGenerator(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

                  // crop
                  gm(image).crop(imageWidth, 1, sliceCounter, 0).write('slices/slice' + randomString + '.png', function (err) {
                    console.log('Error: ', err);
                    sliceCounter++;
                    getSlices();
                  });

                } else {

                  imageCounter++;
                  getImage();

                }
              }, 250);
            })();

          });

        }
    }, 250);
})();

/*

  SERVER PORT LISTEN

*/

app.listen(3000);
