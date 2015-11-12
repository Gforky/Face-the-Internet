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

var server = app.listen(3000, function() {
  
  var port = server.address().port;
  console.log('App listening on port: ', port);

});