/*

  FUNCTIONS

*/

// define 'localStream' to allow access to the camera after access has been granted
var localStream;

function stopWebcam() {

  localStream.stop();
  localStream = null;

}

$(document).on('ready', function() {

  /*

    VIEW 1)

  */

  // connect to websocket
  io = io.connect();

  // emit 'loaded' event
  io.emit('loaded');

  // listen for 'ready' event
  io.on('ready', function(data) {
      console.log(data.message);
  });

  /*

    VIEW 2)

  */

  $('.start').on('click', function() {

    // replace current html with video
    $('.view').html('<video autoplay="true" id="videoElement"></video>' +
      '<br>' +
    '<button class="capture">Capture</button>');

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
        localStream = stream;
    }

    function errorCallback(e) {
        console.log('Error in video streaming: ', e);
    }

  });

  /*

    VIEW 3)

  */

  $(document).on('click', '.capture', function() {

    // replace current html with video
    $('.view').prepend('<canvas id="canvasElement"></canvas>' +
      '<br>' +
    '<button class="retake">Retake</button>' +
    '<button class="save">Save</button>');

    var video = document.querySelector("#videoElement");

    var canvas = document.querySelector('#canvasElement');
    canvas.width = $(video).width();
    canvas.height = $(video).height();
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

  });

  /*

    VIEW 4)

  */

  $(document).on('click', '.retake', function() {

    $('canvas, .retake, .save').remove();

  });

  $(document).on('click', '.save', function() {

    var canvas = document.querySelector('#canvasElement');
    var base64 = canvas.toDataURL();

    // emit 'image' event
    io.emit('image', base64);

  });

  /*

    VIEW 4)

  */

  // listen for 'saved' event
  io.on('saved', function() {

    console.log('saved');

    stopWebcam();

    $('.view').html('<h1>Image saved</h1>');

  });

  /*

    VIEW 5)

  */

  // listen for 'sliced' event

  io.on('sliced', function(data) {

    console.log('sliced', data);

    $('.view').html('<h1>Image sliced</h1>');

  });


});
