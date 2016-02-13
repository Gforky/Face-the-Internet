/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var JSFeat = require('jsfeat');
var $ = require('jquery');
var PhotoBooth = React.createClass({
    _onWindowResize: function(event) {
        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has resized the browser: ', event);
        console.log('----------------------------------');
        var height = window.innerHeight;
        var width = (16/9) * height;
        if (window.innerWidth > width) {
            width = window.outerWidth;
            height = (9/16) * width;
            this.setState({
                width: width,
                height: window.innerHeight,
                outputWidth: width,
                outputHeight: height,
                outputLandscape: true
            });
        } else {
            this.setState({
                width: width,
                height: window.innerHeight,
                outputWidth: width,
                outputHeight: height,
                outputLandscape: false
            });
        }
    },
    _facePosition: function(x, y) {
        // centre 50% of screen
        var minX = this.state.width * 0.25;
        var minY = this.state.height * 0.25;
        var maxX = this.state.width * 0.75;
        var maxY = this.state.height * 0.75;
        var lineWidth = 6;
        if (x > minX && x < maxX && y > minY && y < maxY && !this.state.hasCaptured) {
            this.setState({
                captureActive: true,
                captureText: 'capture'
            });
            // face detection box styles
            this.outputContext.fillStyle = 'rgb(62, 232, 170)';
            this.outputContext.strokeStyle = 'rgb(62, 232, 170)';
            this.outputContext.lineWidth = lineWidth;
        } else {
            this.setState({
                captureActive: false,
                captureText: 'align face to centre'
            });
            // face detection box styles
            this.outputContext.fillStyle = 'rgb(255, 72, 94)';
            this.outputContext.strokeStyle = 'rgb(255, 72, 94)';
            this.outputContext.lineWidth = lineWidth;
        }
        if (this.state.hasCaptured) {
            this.outputContext.fillStyle = 'rgba(255, 255, 255, 0)';
            this.outputContext.strokeStyle = 'rgba(255, 255, 255, 0)';
            this.outputContext.lineWidth = lineWidth;
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
            this.outputContext.drawImage(this.webcam, 0, 0, this.state.outputWidth, this.state.outputHeight);
            this.inputContext.drawImage(this.webcam, 0, 0, this.state.webcamWidth, this.state.webcamHeight);
            var imageData = this.inputContext.getImageData(0, 0, this.state.webcamWidth, this.state.webcamHeight);
            JSFeat.imgproc.grayscale(imageData.data, this.state.webcamWidth, this.state.webcamHeight, this.imageU8);
            var pyr = JSFeat.bbf.build_pyramid(this.imageU8, 24*2, 24*2, 4);
            this.rects = JSFeat.bbf.detect(pyr, window.cascadeData);
            this._drawFaces(this.state.outputWidth/this.imageU8.cols, 1);
        }
    },
    _captureHandler: function(event) {
        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to capture image: ', event);
        console.log('----------------------------------');
        window.cancelAnimationFrame(this._faceDetection);
        this.webcam.pause();
        this.outputContext.drawImage(this.webcam, 0, 0, this.state.outputWidth, this.state.outputHeight);
        this.setState({
            captureActive: false,
            hasCaptured: true,
            saveActive: true,
            webcam: ''
        });
    },
    _saveHandler: function(e) {
        var imageData = this.input.toDataURL("image/jpeg", 0.85);
        this.webcam.pause();
        this.setState({
            webcam: '',
            captureActive: false,
            saveActive: false,
            overlayActive: true,
            loadingActive: true
        });
        var parent = this;
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
                var minWait = 1500;
                setTimeout(function() {
                    parent.setState({
                        loadingActive: false,
                        successActive: true
                    });
                }, minWait);
            },
            error: function(error) {
                console.log('----------------------------------');
                console.log('[PHOTOBOOTH - DATA] ', 'Error posting image to server: ', error);
                console.log('----------------------------------');
                setTimeout(function() {
                    parent.setState({
                        loadingActive: true,
                        successActive: false
                    });
                }, minWait);
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
            hasCaptured: false,
            saveActive: false
        });
        this.webcam.play();
        this._faceDetection();
    },
    _successHandler: function(stream) {
        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has allowed webcam: ', stream);
        console.log('----------------------------------');
        this.stream = stream;
        var height = window.innerHeight;
        var width = (16/9) * height;
        if (window.innerWidth > width) {
            width = window.outerWidth;
            height = (9/16) * width;
            this.setState({
                webcamSrc: window.URL.createObjectURL(this.stream),
                width: width,
                height: window.innerHeight,
                outputWidth: width,
                outputHeight: height,
                outputLandscape: true
            });
        } else {
            this.setState({
                webcamSrc: window.URL.createObjectURL(this.stream),
                width: width,
                height: window.innerHeight,
                outputWidth: width,
                outputHeight: height,
                outputLandscape: false
            });
        }
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
            captureActive: true,
            saveActive: false,
            captureText: 'capture'
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
        // attach cascade data to the global object
        $.getJSON('cascade/bbf_face.js', function(data) {
            JSFeat.bbf.prepare_cascade(data);
            window.cascadeData = data;
            console.log('----------------------------------');
            console.log('[PHOTOBOOTH - DATA] ', 'Face array data received: ', data);
            console.log('----------------------------------');
        });
        // attach animation requests to the window
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall); 
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        window.addEventListener('resize', this._onWindowResize);
    },
    componentDidUpdate: function() {
        // added on update to the window, as the video streams it is updating...
        this.outputContext = this.output.getContext('2d');
        this.inputContext = this.input.getContext('2d');
        // set up parameters for detection box
        var maxSize = 160;
        var scale = Math.min(maxSize/this.state.outputWidth, maxSize/this.state.outputHeight);
        var w = (this.state.width * scale) | 0;
        var h = (this.state.height * scale) | 0;
        this.imageU8 = new JSFeat.matrix_t(w, h, JSFeat.U8_t | JSFeat.C1_t);
    },
    componentWillUnmount: function() {
        window.cancelAnimationFrame(this._faceDetection);
        this.webcam.pause();
        this.setState({
            webcam: ''
        });
    },
    render: function() {
        var css = {
            width: this.state.width + 'px',
            height: this.state.height + 'px'
        }
        return (
            <div className="PhotoBooth" style={css}>
                <div className={this.state.overlayActive ? 'overlay active' : 'overlay disabled'}>
                    <div className={this.state.loadingActive ? 'loading message active' : 'loading message disabled'}>
                        <h2>Loading...</h2>
                    </div>
                    <div className={this.state.successActive ? 'success message active' : 'success message disabled'}>
                        <div>
                            <h2>Success</h2>
                        </div>
                    </div>
                    <div className={this.state.errorActive ? 'error message active' : 'error message disabled'}>
                        <div>
                            <h2>Error</h2>
                        </div>
                    </div>
                </div>
                <div className={this.state.captureActive || this.state.saveActive ? 'silhouette' : 'silhouette active'}></div> 
                <video className="webcam" ref={(ref) => this.webcam = ref} width={this.state.webcamWidth} height={this.state.webcamHeight} src={this.state.webcamSrc} autoPlay></video>
                <canvas className={this.state.outputLandscape ? 'output landscape' : 'output portrait'} ref={(ref) => this.output = ref} width={this.state.outputWidth} height={this.state.outputHeight}></canvas>
                <canvas className="input" ref={(ref) => this.input = ref} width={this.state.webcamWidth} height={this.state.webcamHeight}></canvas>
                <ul className={this.state.saveActive ? 'buttons saving' : 'buttons'}>
                    <li><button className={this.state.captureActive ? 'capture' : 'align'} onClick={this._captureHandler}>{this.state.captureText}</button></li>
                    <li><button className={this.state.saveActive ? 'save active' : 'save'} onClick={this._saveHandler}>save</button></li>
                    <li><button className={this.state.saveActive ? 'retake active' : 'retake'} onClick={this._retakeHandler}>retake</button></li>
                </ul>
            </div>
        );
    }
});
    
module.exports = PhotoBooth;
