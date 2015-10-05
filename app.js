/*

  BROWSERIFY REQUIRES - browserify will make me in to a friendly bundle for the client

*/

var $ = require('jquery'),
    react = require('react');

/*

  APPLICATION OBJECT

*/

// main application object...
var app = {} || app;

//
app.connectServer = function () {

  // connect to websocket
  io = io.connect();

  // emit 'loaded' event
  io.emit('loaded');

}

function drawOutput(output) {

  var canvas = document.querySelector('#canvasElement');
  var context = canvas.getContext('2d');

  var image = new Image();

  image.src = output;

  image.onload = function () {
    context.drawImage(image, 0, 0);
  }

}

function startWebcam() {

  var video = document.querySelector("#videoElement");

  // create cross-browser var to check for webcam support
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

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
      app.localStream = stream;
  }

  function errorCallback(e) {
      console.log('Error in video streaming: ', e);
  }

  $('.view').append('<canvas id="hiddenCanvas" width="320" height="240" style="display:none"></canvas>');

  var hiddenCanvas = document.querySelector('#hiddenCanvas');

}

function stopWebcam() {

  app.localStream.stop();
  app.localStream = null;

}

function captureImage() {

  var video = document.querySelector("#videoElement");

  var canvas = document.querySelector('#canvasElement');
  canvas.width = $(video).width();
  canvas.height = $(video).height();
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0);

}

function saveCapture() {

  var canvas = document.querySelector('#canvasElement');
  var base64 = canvas.toDataURL();

  // emit 'capture' event
  io.emit('capture', base64);

}

function drawCapture(capture) {

  var canvas = document.querySelector('#canvasElement');
  var context = canvas.getContext('2d');

  var image = new Image();

  image.src = capture;

  image.onload = function () {
    context.drawImage(image, 0, 0);
  }

}

function drawSlice(slice, yPosition) {

  var canvas = document.querySelector('#canvasElement');
  var context = canvas.getContext('2d');

  var image = new Image();

  image.src = slice;

  image.onload = function () {
    context.drawImage(image, 0, yPosition);
  }

}

function saveOutput() {

  var canvas = document.querySelector('#canvasElement');
  var base64 = canvas.toDataURL();

  // emit 'output' event
  io.emit('output', base64);

}

/*

  VIEWS

*/

$(document).on('ready', function() {

  app.connectServer();

  /*

    VIEW 1)

  */

  // listen for 'first user' event
  io.on('first user', function() {

    console.log('first user');

    $('.view').append('<h1>Face the Internet</h1>' +
    '<br>' +
    '<button class="start">Start</button>' +
    '<br>' +
    '<h2>You are the first user, nothing to display.</h2>');

  });

  // listen for 'first user' event
  io.on('user', function(data) {

    console.log('user');

    $('.view').append('<h1>Face the Internet</h1>' +
    '<br>' +
    '<button class="start">Start</button>' +
    '<br>' +
    '<canvas id="canvasElement" width="1280" height="720"></canvas>');

    var output = data.lastOutput;

    drawOutput(output);

  });

  /*

    VIEW 2)

  */

  $(document).on('click', '.start', function() {

    // replace current html with video
    $('.view').html('<video autoplay="true" id="videoElement"></video>' +
    '<br>' +
    '<button class="capture">Capture</button>' +
    '<br>');

    startWebcam();

  });

  /*

    VIEW 3)

  */

  $(document).on('click', '.capture', function() {

    // replace current html with video
    $('.view').prepend('<canvas id="canvasElement" width="1280" height="720"></canvas>' +
      '<br>' +
    '<button class="retake">Retake</button>' +
    '<button class="save">Save</button>' +
    '<br>');

    captureImage();

  });

  /*

    VIEW 4)

  */

  $(document).on('click', '.retake', function() {

    $('canvas, .retake, .save').remove();

  });

  $(document).on('click', '.save', function() {

    console.log('saving capture...')

    saveCapture();

  });

  /*

    VIEW 4)

  */

  // listen for 'capture saved' event
  io.on('capture saved', function() {

    console.log('capture saved');

    stopWebcam();

    $('.view').html('<h1>Capture saved</h1>');

  });

  /*

    VIEW 5)

  */

  var hasSliced = false;

  io.on('slicing capture', function() {

    console.log('slicing capture...');

    if (!hasSliced) {

      console.log('first slice');

      hasSliced = true;

      io.emit('first slice');

    }

    $('.view').html('<h1>Slicing capture...</h1>');

  });

  io.on('first slice', function(data) {

    var isFirstUser = data.isFirstUser;

    if (isFirstUser) {

      $('.view').append('<canvas id="canvasElement" width="1280" height="720"></canvas>');

      var capture = data.firstCapture;

      drawCapture(capture);

    } else {

      $('.view').append('<canvas id="canvasElement" width="1280" height="720"></canvas>');

      var output = 'outputs/' + data.lastOutput;

      drawOutput(output);

    }

  });

  io.on('slice url', function(data) {

    var slice = data.sliceUrl;

    var yPosition = data.yPosition;

    drawSlice(slice, yPosition);


  });

  /*

    VIEW 6)

  */

  io.on('capture sliced', function() {

    console.log('capture sliced');

    $('h1').remove();
    $('.view').prepend('<h1>Capture sliced</h1>');

    saveOutput();

  });

  io.on('saving output', function() {

    console.log('saving output...');

  });

  io.on('output saved', function() {

    console.log('output saved');

    setTimeout(function() {

      window.location.href = '/';

    }, 500);

  });

});
