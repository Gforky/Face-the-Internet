/*

  SETUP

*/

// define the websockets express server
app = require('express.io')();
express = require('express.io');
app.http().io();

/*

  NODE MODULES

*/

// project dependencies
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

/*

  FILES REQUESTS

*/

// send jquery TO DO: Browserify
app.get('/bower_components/jquery/dist/jquery.min.js', function(req, res) {
    res.sendfile(__dirname + '/bower_components/jquery/dist/jquery.min.js');
});

// set static/public file access
app.use(express.static(__dirname + '/public'));

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

  // remove unnecessary junk from base64 string
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

      // saved images as an array
      var images = fs.readdirSync('captures');

      // amount of saved images on disk
      var imageCount = images.length;

      // get last image in the array
      var lastImage = 'captures/' + images[imageCount - 1];

      // create a random string to ID the slices
      function randomStringGenerator(length, chars) {

        var result = '';

        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

        return result;

      }

      // use the size method to get the image width and height, useful for images submitted on mobile etc.
      gm(lastImage).size(function(err, value){

        // check for errors, TO DO: put this in 'if' statement
        if (err != 'undefined') {

          console.log('Error: ', err);

        }

        // get current image width
        var imageWidth = value.width;

        // get current image height
        var imageHeight = value.height;

        // start slicing on first pixel
        var sliceCounter = 1;

        (function makeSlice() {

          // use 'setTimeout' to get around memory issues
          setTimeout(function() {

            // if the image height is bigger than the current slice
            if (imageHeight > sliceCounter) {

              // apply the random string to the slice name, time not needed here as it is in the parent image file name
              var randomString = randomStringGenerator(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

              var slice = 'slices/slice' + randomString + '-' + sliceCounter + '.png';

              // crop image to the full width of current image and increments of 1 pixel
              gm(lastImage).crop(imageWidth, 1, 0, sliceCounter).write('public/' + slice, function (err) {

                app.io.broadcast('slice', slice);

                // check for errors, TO DO: put this in 'if' statement
                if (err != 'undefined') {

                  console.log('Error: ', err);

                }

                // increase the slice counter, to affect the next slice
                sliceCounter++;

                // fire function recurssively, to help with memory
                makeSlice();

              });

            } else if (imageHeight ==  sliceCounter) {

              var slices = fs.readdirSync('public/slices');

              // tell the client the image is now sliced
              app.io.broadcast('sliced', slices);

            }

          }, 250);

        })();

      });

    } else {

      if (err != 'undefined') {

        console.log('Error: ', err);

      }

    }

  });

});

/*

  SERVER PORT LISTEN

*/

app.listen(3000);
