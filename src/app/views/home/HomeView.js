"use strict";

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

/**
 * @exports views.HomeView
 * @class
 * @augments Marionette.ItemView
 */
var HomeView = Marionette.ItemView.extend({

    template: '#HomeView',
    className: 'home-view',

    ui: {
        'link': 'a'
    },

    events: {
        'click @ui.link': 'linkClicked'
    },

    linkClicked: function (e) {
        e.preventDefault();
        var viewId = this.$(e.target).attr('href').replace('#', '');
        Radio.channel('views').trigger('navigate:to', viewId);
    }
});

module.exports = HomeView;
