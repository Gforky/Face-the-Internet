/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var JSFeat = require('jsfeat');
var $ = require('jquery');

var PhotoBooth = React.createClass({

    _drawFaces: function(rects, sc, max) {

        var on = rects.length;

        if (on && max) {
            JSFeat.math.qsort(rects, 0, on-1, function(a,b){return (b.confidence<a.confidence)});
        }

        var n = max || on;
        n = Math.min(n, on);
        var r;
        for(var i = 0; i < n; i++) {
            r = rects[i];
            this.context.strokeRect((r.x*sc) | 0, (r.y*sc) | 0, (r.width*sc) | 0, (r.height*sc) | 0);
        }

    },

    _faceDetection: function() {

        window.requestAnimFrame(this._faceDetection);
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {

            this.context.drawImage(this.video, 0, 0, this.state.width, this.state.height);

            this.workContext.drawImage(this.video, 0, 0, this.state.width, this.state.height);
            var imageData = this.workContext.getImageData(0, 0, this.state.width, this.state.height);

            JSFeat.imgproc.grayscale(imageData.data, this.state.width, this.state.height, this.imageU8);

            var pyr = JSFeat.bbf.build_pyramid(this.imageU8, 24*2, 24*2, 4);

            var rects = JSFeat.bbf.detect(pyr, window.cascadeData);

            this._drawFaces(rects, this.state.width/this.imageU8.cols, 1);

        }
    },

    _clickHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to capture: ', e);
        console.log('----------------------------------');

        this.context.drawImage(this.video, 0, 0, this.state.width, this.state.height);

    },

    _successHandler: function(stream) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has allowed webcam: ', stream);
        console.log('----------------------------------');

        var src = window.URL.createObjectURL(stream);
        var width = window.outerWidth;
        var height = window.outerHeight;

        this.setState({
            video: src,
            width: width,
            height: height
        });

    },

    _errorHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - ERROR] ', 'User has webcam error: ', e);
        console.log('----------------------------------');

    },

    componentWillMount: function() {

        this.setState({
            video: '',
            width: '',
            height: ''
        });

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'Start webcam...');
        console.log('----------------------------------');

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

            navigator.getUserMedia(hdConstraints, this._successHandler, this._errorHandler);

        }

        // add animation requests to the window
        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();

    },

    componentDidUpdate: function() {

        // added on update to the window, as the video streams it is updating...
        this.context = this.canvas.getContext('2d');
        this.workContext = this.work.getContext('2d');

        // face detection box styles
        this.context.fillStyle = 'rgb(0, 255, 0)';
        this.context.strokeStyle = 'rgb(0, 255, 0)';

        var maxSize = 160;
        var scale = Math.min(maxSize/this.state.width, maxSize/this.state.height);
        var w = (this.state.width * scale) | 0;
        var h = (this.state.height * scale) | 0;

        this.imageU8 = new JSFeat.matrix_t(w, h, JSFeat.U8_t | JSFeat.C1_t);

        var cascadeData;

        $.getJSON('cascade/bbf_face.js', function(data) {
            JSFeat.bbf.prepare_cascade(data);
            window.cascadeData = data;
        });

        this._faceDetection();

    },

    render: function() {

        return (
            <div className="PhotoBooth">
                <video className="webcam" ref={(ref) => this.video = ref} width={this.state.width} height={this.state.height} src={this.state.video} autoPlay></video>
                <canvas className="output" ref={(ref) => this.canvas = ref} width={this.state.width} height={this.state.height}></canvas>
                <canvas className="input" ref={(ref) => this.work = ref} width={this.state.width} height={this.state.height}></canvas>
                <button onClick={this._clickHandler}>Capture Me</button>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
