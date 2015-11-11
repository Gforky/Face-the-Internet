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

/*

  SERVER PORT LISTEN

*/

app.listen(3000);