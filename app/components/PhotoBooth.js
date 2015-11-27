/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var JSFeat = require('jsfeat');
var $ = require('jquery');

var PhotoBooth = React.createClass({

    _facePosition: function(x, y) {

        // centre 50% of screen
        var minX = this.state.width * 0.25;
        var minY = this.state.height * 0.25;
        var maxX = this.state.width * 0.75;
        var maxY = this.state.height * 0.75;

        if (x > minX && x < maxX && y > minY && y < maxY) {
            this.setState({
                captureActive: true
            });
        } else {
            this.setState({
                captureActive: false
            });
        }

    },

    _drawFaces: function(scale, max) {

        var on = this.rects.length;

        if (on && max) {
            JSFeat.math.qsort(this.rects, 0, on-1, function(a,b){return (b.confidence<a.confidence)});
        }

        var n = max || on;
        n = Math.min(n, on);
        var r;
        for(var i = 0; i < n; i++) {
            r = this.rects[i];
            this.outputContext.strokeRect( (r.x * scale) | 0, (r.y * scale) | 0, (r.width * scale) | 0, (r.height * scale) | 0);
            this._facePosition((r.x * scale), (r.y * scale));
        }

    },

    _faceDetection: function() {

        window.requestAnimationFrame(this._faceDetection);
        
        if (this.webcam.readyState === this.webcam.HAVE_ENOUGH_DATA) {

            this.outputContext.drawImage(this.webcam, 0, 0, this.state.width, this.state.height);

            this.inputContext.drawImage(this.webcam, 0, 0, this.state.webcamWidth, this.state.webcamHeight);

            var imageData = this.inputContext.getImageData(0, 0, this.state.webcamWidth, this.state.webcamHeight);

            JSFeat.imgproc.grayscale(imageData.data, this.state.webcamWidth, this.state.webcamHeight, this.imageU8);

            var pyr = JSFeat.bbf.build_pyramid(this.imageU8, 24*2, 24*2, 4);

            this.rects = JSFeat.bbf.detect(pyr, window.cascadeData);

            this._drawFaces(this.state.width/this.imageU8.cols, 1);

        }
    },

    _captureHandler: function(event) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to capture image: ', event);
        console.log('----------------------------------');

        window.cancelAnimationFrame(this._faceDetection);

        this.webcam.pause();

        this.setState({
            captureActive: false,
            saveActive: true,
            retakeActive: true,
            webcam: ''
        });

        this.outputContext.drawImage(this.webcam, 0, 0, this.state.width, this.state.height);

    },

    _saveHandler: function(e) {

        var imageData = this.input.toDataURL("image/jpeg", 0.85);

        this.webcam.pause();

        this.setState({
            webcam: '',
            captureActive: false,
            saveActive: false,
            retakeActive: false,
            overlayActive: true
        });

        $.ajax({
            url: '/capture',
            type: 'post',
            dataType: 'jsonp',
            data: JSON.stringify({image: imageData}),
            contentType: 'application/json',
            success: function(data) {
                console.log('----------------------------------');
                console.log('[PHOTOBOOTH - DATA] ', 'Successfully posted image to server: ', data);
                console.log('----------------------------------');
            },
            error: function(xhr, textStatus, error) {
                console.log('----------------------------------');
                console.log('[PHOTOBOOTH - DATA] ', 'Error posting image to server: ', error);
                console.log('----------------------------------');
            }
        });

    },

    _retakeHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to retake image: ', e);
        console.log('----------------------------------');

        this.setState({
            webcam: window.URL.createObjectURL(this.stream),
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

        this.stream = stream;

        var height = window.outerHeight;
        var width = (16/9) * height;

        this.setState({
            webcamSrc: window.URL.createObjectURL(this.stream),
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

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'Start webcam...');
        console.log('----------------------------------');

        this.setState({
            width: '',
            height: '',
            webcamSrc: '',
            webcamWidth: 400,
            webcamHeight: 225,
            inputWidth: '',
            inputHeight: '',
            captureActive: true,
            saveActive: false,
            retakeActive: false,
            overlayActive: false
        });

        // create cross-browser var to check for webcam support, attach to window
        navigator.getUserMedia  = navigator.getUserMedia || 
                                  navigator.webkitGetUserMedia || 
                                  navigator.mozGetUserMedia || 
                                  navigator.msGetUserMedia;

        if (navigator.getUserMedia) {

            var hdConstraints = {
                video: {
                        mandatory: {
                        minWidth: 800,
                        minHeight: 450
                    }
                }
            };

            navigator.getUserMedia(hdConstraints, this._successHandler, this._errorHandler);

        }

        // attach animation requests to the window
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
              window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };

        // attach cascade data to the global object
        $.getJSON('cascade/bbf_face.js', function(data) {
            JSFeat.bbf.prepare_cascade(data);
            window.cascadeData = data;
            console.log('----------------------------------');
            console.log('[PHOTOBOOTH - DATA] ', 'Face array data received: ', data);
            console.log('----------------------------------');
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
            <div className="PhotoBooth" width={this.state.width} height={this.state.height}>
                <div className={this.state.overlayActive ? 'overlay active' : 'overlay disabled'}>
                    <div className={this.state.loadingActive ? 'loading active' : 'loading disabled'}></div>
                    <div className={this.state.loadingActive ? 'message active' : 'message disabled'}></div>
                </div>
                <div className="silhouette-wrapper" ref={(ref) => this.silhouette = ref}>
                    <div className="silhouette"></div>
                </div>  
                <video className="webcam" ref={(ref) => this.webcam = ref} width={this.state.webcamWidth} height={this.state.webcamHeight} src={this.state.webcamSrc} autoPlay></video>
                <canvas className="output" ref={(ref) => this.output = ref} width={this.state.width} height={this.state.height}></canvas>
                <canvas className="input" ref={(ref) => this.input = ref} width={this.state.width} height={this.state.height}></canvas>
                <ul className="buttons">
                    <li><button className={this.state.captureActive ? 'active' : 'disabled'} onClick={this._captureHandler}>Capture</button></li>
                    <li><button className={this.state.saveActive ? 'active' : ''} onClick={this._saveHandler}>Save</button></li>
                    <li><button className={this.state.retakeActive ? 'active' : ''} onClick={this._retakeHandler}>Retake</button></li>
                </ul>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
