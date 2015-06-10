"use strict";

var Marionette = require('backbone.marionette');

/**
 * @exports views.AboutView
 * @class
 * @augments Marionette.ItemView
 */
var AboutView = Marionette.ItemView.extend({

    template: '#AboutView',
    className: 'about-view'
});

module.exports = AboutView;