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

for (var i = imageCount - 1; i >= 0; i--) {

    var image = 'captures/' + images[i];

    var date = new Date();
    var time = date.getTime();

    gm(image).crop(1280, 1).write('slices/slice' + time + '.png', function (err) {
      console.log('Error: ', err);
    });

};


/*

  SERVER PORT LISTEN

*/

app.listen(3000);
