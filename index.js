/*

  SETUP SERVER

*/

var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);

app.use(express.static('build'));

app.get('/',function(request, response){
	console.log('----------------------------------');
	console.log('[SERVER - EVENT] ', 'Express server connected to client...');
	console.log('----------------------------------');
});

app.post('/capture', function(request, response, next) { 

	console.log(request, response, next);

	response.send(request.body);

});

http.createServer(app).listen(app.get('port'), function(){

	console.log('----------------------------------');
	console.log('[SERVER - EVENT] ', 'Express server listening on port ' + app.get('port'));
	console.log('----------------------------------');

});