"use strict";

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

/**
 * @exports views.CameraView
 * @class
 * @augments Marionette.ItemView
 */
var CameraView = Marionette.ItemView.extend({

    template: '#CameraView',
    className: 'camera-view',

    ui: {
        capture: '.capture',
        video: 'video'
    },

    events: {
        'click @ui.capture': 'captureClicked'
    },

    captureClicked: function (e) {

        var video = document.querySelector("#videoElement");

        var canvas = document.querySelector('#canvasElement');
        canvas.width = $(video).width();
        canvas.height = $(video).height();
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
    },

    onDomRefresh: function() {

      var video = document.querySelector("#videoElement");

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

      if (navigator.getUserMedia) {
          var hdConstraints = {
            video: {
              mandatory: {
                minWidth: 1280,
                minHeight: 720
              }
            }
          };
          navigator.getUserMedia(hdConstraints, successCallback, errorCallback);
      }

      function successCallback(stream) {
          video.src = window.URL.createObjectURL(stream);
      }

      function errorCallback(e) {
          consol.log('Error in video streaming: ', e);
      }
    }
});

module.exports = CameraView;
