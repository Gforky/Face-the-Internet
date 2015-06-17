/*

  SETUP

*/

app = require('express.io')();
app.http().io();

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
    console.log(req.data);
});

/*

  SERVER PORT LISTEN

*/

app.listen(3000);
