/* global window,require,module */

"use strict";

var _ = require('lodash');

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var breel = require('framework');
var Environment = breel.Environment;
var Analytics = breel.Analytics;
var I18n = breel.I18n;
var Share = breel.Share;
var AssetManager = breel.AssetManager;

var Global = require('./Global');
var Router = require('./Router');
var Model = require('./Model');
var Layout = require('../views/Layout');
var config = require('../../_harp.json');


var ma = new Marionette.Application();

ma.addInitializer(function (options) {

    // Parse config according to environment
    var parsed = config.globals;
    var cc = _.merge(parsed.env['*'], parsed.env[options.env]);
    delete parsed.env;
    for (var s in cc) {
        parsed[s] = cc[s];
    }
    config = parsed;

    // Bootstrap the application:
    // Add the core modules, enable logs, create the main model,
    // define an environment, parse the copy doc and
    // setup a tracker for analytics.

    console.log('[Application] init...');

    //var dev = Environment.ENV_DEVELOPMENT;

    this.execute('task:setup_environment', this, options.env);
    this.execute('task:add_application_model', this, config);
    this.execute('task:setup_i18n', this, options.lang, this.copy);
    //this.execute('task:setup_share', this);
    this.execute('task:setup_layout+router', this, options.env);
    this.execute('task:setup_analytics_tracker', this, options.env);

    Backbone.Radio.channel('analytics').trigger('event', {
        eventAction: 'global',
        eventCategory: 'application',
        eventLabel: 'initialized'
    });

    console.log('[Application] initialized.');
});

ma.on("start", function (options) {

    var files = this.model.get('config').loader.files;
    var allFiles = files['*'].concat(files[this.env.platform]);

    AssetManager.getManager('main', allFiles)
        .loadFiles().then(_.bind(function () {

            this.execute('task:application_start', options);

        }, this), function (error) {
            console.log(error);
            // loader error
        }, function (progress) {
            console.log(progress);
            // loader progress
        });
});


///////////////////////////////////////
// TASKS
///////////////////////////////////////

ma.commands.setHandler('task:add_application_model', function (app, config) {

    console.log('[Application]', 'add application model');

    // Put in the application model the content of /config.json
    app.model = new Model({
        config: config
    });

    Global.model = app.model;
});

ma.commands.setHandler('task:setup_environment', function (app, environment) {

    console.log('[Application] setup environment: %s', environment);

    // Define an environment for this application
    app.env = new Environment({
        env: environment
    });

    Global.env = app.env;
});

ma.commands.setHandler('task:setup_i18n', function (app, lang, copyDoc) {

    console.log('[Application]', 'setup i18n');

    // Setup internationalization, expose the content of /copy.json
    app.i18n = new I18n({
        lang: lang,
        doc: copyDoc
    });

    Marionette.ItemView.prototype.templateHelpers = function () {
        return {
            i18n: function (id) {
                return app.i18n.str(id);
            }
        };
    };

    Global.i18n = app.i18n;
});

ma.commands.setHandler('task:setup_share', function (app) {

    console.log('[Application]', 'setup share');

    window.FB.init({
        appId: '646749068776684',
        xfbml: true,
        cookie: true,
        version: 'v2.1'
    });

    app.share = new Share();
    app.share.register('facebook:url', function (options, resolve, reject) {

        window.FB.ui(_.merge({method: 'share'}, options), function (response) {
            if (!response) {
                reject();
            } else if (response.error) {
                reject(response.error);
            } else {
                resolve(response);
            }
        });
    });

});

ma.commands.setHandler('task:setup_analytics_tracker', function (app) {

    console.log('[Application]', 'setup analytics tracker');

    // Setup the Analytics processor, by default add
    // Google Analytics processors

    app.tracker = new Analytics();
    app.tracker.add('pageView', Analytics.processor.google.pageView);
    app.tracker.add('event', Analytics.processor.google.event);

    // Listen for events in the radio channel "analytics"
    // useful to send notifications from any point of your app.

    Backbone.Radio.channel('analytics').on('pageView', _.bind(function (options) {
        this.tracker.send('pageView', {page: options.page});
    }, app));

    Backbone.Radio.channel('analytics').on('event', _.bind(function (options) {
        this.tracker.send('event', {
            eventAction: options.eventAction,
            eventCategory: options.eventCategory,
            eventLabel: options.eventLabel
        });
    }, app));
});

ma.commands.setHandler('task:setup_layout+router', function (app) {

    console.log('[Application]', 'setup setup_layout+router');
    // Add an initializer to perform some
    // layout/visual setup, create a router and
    // define the main regions for you app

    app.addRegions({main: '#main'});

    var layout = new Layout();

    new Router({
        layout: layout
    });

    app.main.show(layout);
});

ma.commands.setHandler('task:application_start', function (options) {

    // Start the application, initialize Backbone History
    // and display the main view.

    // FIXME: This hack prevent deep-links
    // prevent enter on the previous # view...
    window.document.location.hash = '';

    if (!Backbone.History.started) {
        Backbone.history.start();
    }

    Backbone.Radio.channel('analytics').trigger('event', {
        eventAction: 'global',
        eventCategory: 'application',
        eventLabel: 'started'
    });

    console.log('[Application] started.');

    // Navigate to the first view
    Backbone.Radio.channel('views').trigger('navigate:to', options.view);
});

module.exports = ma;