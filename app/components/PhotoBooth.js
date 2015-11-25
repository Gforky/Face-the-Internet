/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var JSFeat = require('jsfeat');
var $ = require('jquery');

var PhotoBooth = React.createClass({

    _drawFaces: function(sc, max) {

        var on = this.rects.length;

        if (on && max) {
            JSFeat.math.qsort(this.rects, 0, on-1, function(a,b){return (b.confidence<a.confidence)});
        }

        var n = max || on;
        n = Math.min(n, on);
        var r;
        for(var i = 0; i < n; i++) {
            r = this.rects[i];
            this.outputContext.strokeRect((r.x*sc) | 0, (r.y*sc) | 0, (r.width*sc) | 0, (r.height*sc) | 0);
        }

    },

    _faceDetection: function() {

        window.requestAnimFrame(this._faceDetection);
        
        if (this.webcam.readyState === this.webcam.HAVE_ENOUGH_DATA) {

            this.outputContext.drawImage(this.webcam, 0, 0, this.state.width, this.state.height);

            this.inputContext.drawImage(this.webcam, 0, 0, this.state.width, this.state.height);

            var imageData = this.inputContext.getImageData(0, 0, this.state.width, this.state.height);

            JSFeat.imgproc.grayscale(imageData.data, this.state.width, this.state.height, this.imageU8);

            var pyr = JSFeat.bbf.build_pyramid(this.imageU8, 24*2, 24*2, 4);

            this.rects = JSFeat.bbf.detect(pyr, window.cascadeData);

            this._drawFaces(this.state.width/this.imageU8.cols, 1);

        }
    },

    _captureHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to capture image: ', e);
        console.log('----------------------------------');

        this.setState({
            captureActive: false,
            saveActive: true,
            retakeActive: true
        });

        this.webcam.pause();

        this.outputContext.drawImage(this.webcam, 0, 0, this.state.width, this.state.height);

    },

    _saveHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to save image: ', e);
        console.log('----------------------------------');

        var imageData = this.inputContext.getImageData(0, 0, this.state.width, this.state.height);

        this.webcam.pause();

        this.setState({
            webcam: ''
        });

        console.log(imageData);

    },

    _retakeHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to retake image: ', e);
        console.log('----------------------------------');

        this.setState({
            captureActive: true,
            saveActive: false,
            retakeActive: false
        });

        this.webcam.play();

    },

    _successHandler: function(stream) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has allowed webcam: ', stream);
        console.log('----------------------------------');

        var src = window.URL.createObjectURL(stream);
        var width = window.outerWidth;
        var height = window.outerHeight;

        this.setState({
            webcam: src,
            width: width,
            height: height
        });

        this._faceDetection();

    },

    _errorHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - ERROR] ', 'User has webcam error: ', e);
        console.log('----------------------------------');

    },

    componentWillMount: function() {

        this.setState({
            webcam: '',
            width: '',
            height: '',
            captureActive: true,
            saveActive: false,
            retakeActive: false
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

        // attach cascade data to the global object
        $.getJSON('cascade/bbf_face.js', function(data) {
            JSFeat.bbf.prepare_cascade(data);
            window.cascadeData = data;
        });

    },

    componentDidUpdate: function() {

        // added on update to the window, as the video streams it is updating...
        this.outputContext = this.output.getContext('2d');
        this.inputContext = this.input.getContext('2d');

        // face detection box styles
        this.outputContext.fillStyle = 'rgb(0, 255, 0)';
        this.outputContext.strokeStyle = 'rgb(0, 255, 0)';

        // set up parameters for detection box
        var maxSize = 160;
        var scale = Math.min(maxSize/this.state.width, maxSize/this.state.height);
        var w = (this.state.width * scale) | 0;
        var h = (this.state.height * scale) | 0;

        this.imageU8 = new JSFeat.matrix_t(w, h, JSFeat.U8_t | JSFeat.C1_t);

    },

    render: function() {

        return (
            <div className="PhotoBooth">
                <video className="webcam" ref={(ref) => this.webcam = ref} width={this.state.width} height={this.state.height} src={this.state.webcam} autoPlay></video>
                <canvas className="output" ref={(ref) => this.output = ref} width={this.state.width} height={this.state.height}></canvas>
                <canvas className="input" ref={(ref) => this.input = ref} width={this.state.width} height={this.state.height}></canvas>
                <ul className="buttons">
                    <li><button className={this.state.captureActive ? 'active' : ''} onClick={this._captureHandler}>Capture</button></li>
                    <li><button className={this.state.saveActive ? 'active' : ''} onClick={this._saveHandler}>Save</button></li>
                    <li><button className={this.state.retakeActive ? 'active' : ''} onClick={this._retakeHandler}>Retake</button></li>
                </ul>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
