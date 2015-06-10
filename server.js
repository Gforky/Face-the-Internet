var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    paths = require('./paths'),
    sass = require('node-sass-middleware'),
    browserify = require('browserify-middleware'),
    app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (app.get('env') === 'development') {

    // sass - sourceMap: cssPath, sourceMapEmbed: true
    app.use('/css', sass({src: './src/scss', debug: true, outputStyle: 'expanded', response: true}));
    // harp
    app.use(require('harp').mount(paths.SRC));
    // browserify
    app.get('/javascript/app.js', browserify('./src/app/app.js', {
        debug: true,
        external: [
            'jquery',
            'lodash',
            'underscore',
            'backbone',
            'backbone.marionette',
            'backbone.radio',
            'bowser'
        ]
    }));

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
    });

    app.use('/docs', express.static(paths.DOCS));

} else {

    app.use(favicon(path.join(paths.PUBLIC, 'favicon.ico')));
    app.use(express.static(paths.PUBLIC));
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next();
});

var debug = require('debug')('base');

app.set('port', 3000);

app.listen(app.get('port'), function () {
    debug('Express server listening on port 3000');
    debug('Ready!');
});
