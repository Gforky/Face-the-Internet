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

    onDomRefresh: function() {

      var video = document.querySelector("#videoElement");
      var canvas = document.querySelector('#canvasElement');
      var ctx = canvas.getContext('2d');
      var localMediaStream = null;

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

      if (navigator.getUserMedia) {
          navigator.getUserMedia({video: true}, handleVideo, videoError);
      }

      function handleVideo(stream) {
          video.src = window.URL.createObjectURL(stream);
          localMediaStream = stream;
      }

      function videoError(e) {
          consol.log('Error in video stream: ', e);
      }

    }

});

module.exports = CameraView;
