/*

  FUNCTIONS

*/

function connectServer() {

  // connect to websocket
  io = io.connect();

  // emit 'loaded' event
  io.emit('loaded');

}

// define 'localStream' to allow access to the camera after access has been granted
var localStream;

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
      localStream = stream;
  }

  function errorCallback(e) {
      console.log('Error in video streaming: ', e);
  }

}

function stopWebcam() {

  localStream.stop();
  localStream = null;

}

function captureImage() {

  var video = document.querySelector("#videoElement");

  var canvas = document.querySelector('#canvasElement');
  canvas.width = $(video).width();
  canvas.height = $(video).height();
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0);

}

function saveImage() {

  var canvas = document.querySelector('#canvasElement');
  var base64 = canvas.toDataURL();

  // emit 'image' event
  io.emit('image', base64);

}

/*

  VIEWS

*/

$(document).on('ready', function() {

  connectServer();

  /*

    VIEW 1)

  */

  // listen for 'slice' creation
  io.on('ready', function(sliceGroupCount) {

    var sliceCounter = 1;

    var sliceGroupCounter = 1;

    var maxSliceCount = 719;

    (function getSlice() {

      setTimeout(function () {

        var slice = 'slices/' + sliceGroupCounter + '/' + sliceCounter + '.png';

        $('.view').append('<img style="float: left;" src="' + slice + '"/>');

        if (maxSliceCount > sliceCounter) {

          if (sliceGroupCounter == sliceGroupCount) {

            sliceCounter++;
            sliceGroupCounter = 1;
            getSlice();

          } else {

            sliceCounter++;
            sliceGroupCounter++;
            getSlice();

          }

        }

      }, 125);

    })();

  });

  /*

    VIEW 2)

  */

  $('.start').on('click', function() {

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
    $('.view').prepend('<canvas id="canvasElement"></canvas>' +
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

    saveImage();

  });

  /*

    VIEW 4)

  */

  // listen for 'saved' event
  io.on('saved', function() {

    stopWebcam();

    $('.view').html('<h1>Image saved</h1>');

    setTimeout(function() {
      $('h1').remove();
    }, 500);

  });

  /*

    VIEW 5)

  */

  // listen for 'slice' creation
  io.on('slice', function(data) {

    $('.view').append('<img style="float: left;" src="' + data + '"/>');

  });

  /*

    VIEW 6)

  */

  // listen for 'sliced' event
  io.on('sliced', function(sliceGroupCount) {

    $('.view').html('<h1>Image sliced</h1>');

    setTimeout(function() {

      $('h1').remove();
      $('.view').append('<canvas id="canvasElement" width="1280" height="720"></canvas>');

      var canvas = document.getElementById('canvasElement');
      var context = canvas.getContext('2d');

      var sliceCounter = 1;

      var sliceGroupCounter = 1;

      var maxSliceCount = 719;

      (function getSlice() {

        setTimeout(function () {

          var slice = new Image();

          slice.src = 'slices/' + sliceGroupCounter + '/' + sliceCounter + '.png';

          slice.onload = function () {
            context.drawImage(slice, 0, sliceCounter);
          }

          if (maxSliceCount > sliceCounter) {

            if (sliceGroupCounter == sliceGroupCount) {

              sliceCounter++;
              sliceGroupCounter = 1;
              getSlice();

            } else {

              sliceCounter++;
              sliceGroupCounter++;
              getSlice();

            }

          }

        }, 125);

      })();

    }, 500);

  });


});
