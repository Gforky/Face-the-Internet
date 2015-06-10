"use strict";

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var AssetManager = require('framework').AssetManager;

/**
 * @exports views.HomeView
 * @class
 * @augments Marionette.ItemView
 */
var HomeView = Marionette.ItemView.extend({

    template: '#HomeView',
    className: 'home-view',

    ui: {
        'button': 'button'
    },

    events: {
        'click @ui.button': 'buttonClicked'
    },

    buttonClicked: function (e) {
        e.preventDefault();
        console.log('BUTTON CLICK!')
        // var viewId = this.$(e.target).attr('href').replace('#', '');
        // Radio.channel('views').trigger('navigate:to', viewId);
    }

});

module.exports = HomeView;
