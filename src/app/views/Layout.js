"use strict";

var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

/**
 * @exports views.Layout
 * @class
 * @augments Marionette.LayoutView
 */
var Layout = Marionette.LayoutView.extend({

    template: '#Layout',
    className: 'row',

    regions: {
        header: "header",
        views: ".views"
    },

    ui: {
        'links': 'nav .sections a'
    },

    events: {
        'click @ui.links': 'navClicked'
    },

    navClicked: function (e) {
        e.preventDefault();
        var viewId = this.$(e.target).attr('href').replace('#', '');
        Radio.channel('views').trigger('navigate:to', viewId);
    }
});

module.exports = Layout;
