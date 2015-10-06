/*

  SETUP

*/

// define the websockets express server
var app = require('express.io')(),
    express = require('express.io');

// start server
app.http().io();

/*

  NODE MODULES

*/

// project dependencies
var browserify = require('browserify'),
    fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true}),
    mkdirp = require('mkdirp'),
    cv = require('opencv');

/*

  FILE REQUESTS

*/

// set static/public file access
app.use(express.static(__dirname + '/public'));

/*

  VARIABLES

*/

var isFirstUser = (function () {

  var captureCount = fs.readdirSync('public/captures').length;

  if (captureCount != 0) {

    var outputCount = fs.readdirSync('public/outputs').length;

    if (outputCount != 0) {

      return false;

    }

  } else {

    return true;

  }

})();

/*

  FUNCTIONS

*/

function saveCapture(capture) {

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
  var imageBuffer = decodeBase64Image(capture);

  // use time to give each string a unique ID
  var date = new Date();
  var time = date.getTime();
  var fileName = 'public/captures/capture' + time + '.png'

  fs.writeFile(fileName, imageBuffer.data, function (err) {

    if (err == null) {

      console.log('capture saved')
      app.io.broadcast('capture saved');
      detectFace(fileName);

    }
  });
};

function detectFace(fileName) {
  cv.readImage(fileName, function(err, im){
    im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
      if (faces.length > 0) {
        console.log('face detected');
        app.io.broadcast('face detected');
        sliceCapture();
      } else {
        console.log('no face detected');
        app.io.broadcast('no face detected');
      }
    });
  });
}

function sliceCapture() {

  console.log('slicing capture...');

  // saved captures as an array
  var captures = fs.readdirSync('public/captures');

  // amount of saved captures on disk
  var captureCount = captures.length;

  // get last capture in array
  var lastCapture = 'public/captures/' + captures[captureCount - 1];

  app.io.broadcast('slicing capture');

  // use the size method to get the image width and height, useful for images submitted on mobile etc.
  gm(lastCapture).size(function(err, value){

    if (err != undefined) {

      console.log('Error: ', err);

    } else {

      // make directory to put image in
      mkdirp('public/slices/' + captureCount + '/', function (err) {

          if (err) {

            console.log('Error: ', err);

          } else {

            // get current image width
            var captureWidth = value.width;

            // get current image height
            var captureHeight = value.height;

            // start slicing on first pixel

            if (captureCount > captureHeight) {

              var sliceCounter = captureCount - 719;

            } else {

              var sliceCounter = 1;

            }

            (function makeSlice() {

              // use 'setTimeout' to get around memory issues
              setTimeout(function() {

                // if the image height is bigger than the current slice
                if (captureHeight > sliceCounter) {

                  var slice = 'slices/' + captureCount + '/' + sliceCounter + '.png';

                  // crop image to the full width of current image and increments of 1 pixel
                  gm(lastCapture).crop(captureWidth, 1, 0, sliceCounter).write('public/' + slice, function (err) {

                    if (err == undefined) {

                      // for production uncomment below:
                      // if (sliceCounter = captureCount) {
                      if (sliceCounter >= captureCount) {
                        app.io.broadcast('slice url', {'sliceUrl': slice, 'yPosition': sliceCounter});
                      }

                      // increase the slice counter, to affect the next slice
                      sliceCounter++;

                      // fire function recurssively, to help with memory
                      makeSlice();

                      console.log('slice ' + sliceCounter + ' sliced');

                      if (captureHeight == sliceCounter) {

                        console.log('capture sliced');

                        app.io.broadcast('capture sliced');

                      }

                    } else {

                      console.log('Error: ', err);

                    }

                  });

                }

              }, 25);

            })();

          }

      });

    }

  });

}

function saveOutput(output) {

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
  var imageBuffer = decodeBase64Image(output);

  // use time to give each string a unique ID
  var date = new Date();
  var time = date.getTime();

  // write file to disk
  fs.writeFile('public/outputs/output' + time + '.png', imageBuffer.data, function (err) {

    if (err != undefined) {

      console.log('Error: ', err);

    } else {

      console.log('output saved');

      app.io.broadcast('output saved');

    }

  });

}

/*

  WEBSOCKET EVENTS

*/

// setup complete...
app.io.route('loaded', function(req, res) {

  if (isFirstUser) {

    console.log('first user');

    req.io.emit('first user');

  } else {

    console.log('user');

    var outputs = fs.readdirSync('public/outputs');

    var outputCount = outputs.length;

    if (outputCount == 1) {

      var lastOutput = 'outputs/' + outputs[0];

    } else {

      var lastOutput = 'outputs/' + outputs[outputCount - 1];

    }

    req.io.emit('user', {'lastOutput': lastOutput});

  }

});

// save capture
app.io.route('capture', function(req, res) {

  console.log('saving capture...');

  var capture = req.data;

  saveCapture(capture);

});

// 'first slice' event
app.io.route('first slice', function(req, res) {

  console.log('first slice');

  if (isFirstUser) {

    var captures = fs.readdirSync('public/captures');

    var firstCapture = 'captures/' + captures[0];

    req.io.emit('first slice', {'isFirstUser': isFirstUser, 'firstCapture': firstCapture});

  } else {

    var outputs = fs.readdirSync('public/outputs');

    var outputCount = outputs.length;

    var lastOutput = outputs[outputCount - 1];

    var lastSliceIndex =  outputCount;

    req.io.emit('first slice', {'isFirstUser': isFirstUser, 'lastOutput': lastOutput});

  }


});

// save output
app.io.route('output', function(req, res) {

  console.log('saving output...');

  req.io.emit('saving output');

  var output = req.data;

  saveOutput(output);

});

/*

  SERVER PORT LISTEN

*/

app.listen(3000);
