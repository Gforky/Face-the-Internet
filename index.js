/*

  SETUP SERVER

*/

// define the websockets express server
var app = require('express.io')(),
    express = require('express.io');

// start http server
app.http().io();

// set static/public file access
app.use(express.static(__dirname + '/public'));

// test connection
app.get('/', function (req, res) {
  res.send('Hello World!');
});
var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  
  var port = server.address().port;
  console.log('App listening on port:', port);

});