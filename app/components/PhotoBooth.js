/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var JSFeat = require('jsfeat');
var $ = require('jquery');

var PhotoBooth = React.createClass({

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

    },

    componentDidUpdate: function(animate) {

        // I don't work, but I am the solution!
        // window.requestAnimationFrame(animate);

        this.context = this.canvas.getContext('2d');
        // var workContext = this.work.getContext('2d');

        // context.fillStyle = 'rgb(0, 255, 0)';
        // context.strokeStyle = 'rgb(0, 255, 0)';

        // var maxSize = 160;
        // var scale = Math.min(maxSize/this.state.width, maxSize/this.state.height);
        // var w = (this.state.width * scale) | 0;
        // var h = (this.state.height * scale) | 0;

        // imageU8 = new JSFeat.matrix_t(w, h, JSFeat.U8_t | JSFeat.C1_t);

        // $.getJSON('cascade/bbf_face.js', function(data) {
        //     JSFeat.bbf.prepare_cascade(data);
        // });

        this.context.drawImage(this.video, 0, 0, this.state.width, this.state.height);

        // workContext.drawImage(this.video, 0, 0, this.state.width, this.state.height);

        // var imageData = workContext.getImageData(0, 0, this.state.width, this.state.height);

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
