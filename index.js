/*

  SETUP SERVER

*/

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    fs = require('fs');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));

app.set('port', process.env.PORT || 3000);

app.use(express.static('build'));

app.get('/',function(request, response){
    console.log('----------------------------------');
    console.log('[SERVER - EVENT] ', 'Express server connected to client...');
    console.log('----------------------------------');
});

app.post('/capture', function(request, response, next) {

    console.log(request.body);

    var capturedImageData = request.body.image.replace(/^data:image\/jpeg;base64,/, '');

    fs.writeFile('captures/' + Date.now() + '.png', capturedImageData, 'base64', function(error) {
        if (error) {
            console.log('----------------------------------');
            console.log('[PHOTOBOOTH - DATA] ', 'Error writing image to server: ', error);
            console.log('----------------------------------');
        } else {
            console.log('----------------------------------');
            console.log('[PHOTOBOOTH - DATA] ', 'Success writing image to server!');
            console.log('----------------------------------');

            response.jsonp(request.body);
        }
    });

});

http.createServer(app).listen(app.get('port'), function(){
    console.log('----------------------------------');
    console.log('[SERVER - EVENT] ', 'Express server listening on port ' + app.get('port'));
    console.log('----------------------------------');
});