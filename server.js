/*

  SETUP

*/

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

    var image = req.data;

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

    var imageBuffer = decodeBase64Image(image);

    var date = new Date();
    var time = date.getTime();

    fs.writeFile('captures/capture' + time + '.png', imageBuffer.data, function (err) {

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

var images = fs.readdirSync('captures');

var imageCount = images.length;

var imageCounter = 0;

function randomStringGenerator(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

(function getImage() {
    setTimeout(function () {
        if (imageCount > imageCounter) {

          var image = 'captures/' + images[imageCounter];

          gm(image).size(function(err, value){

            console.log('Error: ', err);

            var imageWidth = value.width;

            var imageHeight = value.height;

            var sliceCounter = 1;

            (function getSlices() {
              setTimeout(function() {
                if (imageHeight > sliceCounter) {

                  var randomString = randomStringGenerator(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

                  gm(image).crop(imageWidth, 1, sliceCounter, 0).write('slices/slice' + randomString + '.png', function (err) {
                    console.log('Error: ', err);
                    sliceCounter++;
                    getSlices();
                  });

                } else {

                  imageCounter++;
                  getImage();

                }
              }, 500);
            })();

          });

        }
    }, 500);
})();

/*

  SERVER PORT LISTEN

*/

app.listen(3000);
