"use strict";

var _ = require('lodash');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

var Views = require('../views/Views');

/**
 * @export core.Router
 * @class
 * @augments Marionette.AppRouter
 */
var Router = Marionette.AppRouter.extend({

    routes: {
        "home": "home",
        "about": "about",
        "camera": "camera"
    },

    initialize: function (options) {

        this.layout = options.layout;
        this.tracker = options.tracker;

        Radio.channel('views').on('navigate:to', _.bind(function (route, trigger) {
            this.navigate(route, {trigger: trigger !== false});
        }, this));
    },

    onRoute: function (name, path, args) {
        var pageView = [name].concat(args).join("/").slice(0, -1);
        console.log('[Router] navigate to "%s"', pageView);
        Radio.channel('analytics').trigger('pageView', {page: pageView});
    },

    home: function () {
        this.layout.views.show(new Views.Home());
    },

    about: function () {
        this.layout.views.show(new Views.About());
    },

    camera: function () {
        this.layout.views.show(new Views.Camera());
    }
});

module.exports = Router;
