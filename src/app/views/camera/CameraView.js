"use strict";

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');

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
        save: '.save',
        retake: '.retake',
        video: 'video' // TODO: Read docs to find out how to make this the 'var', rather than: var video = document.querySelector("#videoElement");
    },

    events: {
        'click @ui.capture': 'captureImage',
        'click @ui.save': 'saveImage',
        'click @ui.retake': 'retakeImage'
    },

    captureImage: function (e) {

        // TODO: Make me DRY!
        var video = document.querySelector("#videoElement");

        var canvas = document.querySelector('#canvasElement');
        canvas.width = $(video).width();
        canvas.height = $(video).height();
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);
    },

    saveImage: function(e) {
        var canvas = document.querySelector('#canvasElement');
        var base64 = canvas.toDataURL();

        $.ajax({
            url: '/save',
            type: 'POST',
            contentType: 'application/json',
            // data: JSON.stringify({image: base64})
            data: JSON.stringify({image: 'string'})
        });
    },

    retakeImage: function(e) {

        // TODO: Make me DRY!
        var canvas = document.querySelector('#canvasElement');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    onDomRefresh: function() {

      // TODO: Make me DRY!
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
          console.log('Error in video streaming: ', e);
      }
    }
});

module.exports = CameraView;
