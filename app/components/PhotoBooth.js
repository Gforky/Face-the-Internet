/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var PhotoBooth = React.createClass({

    _clickHandler: function(e) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has clicked to capture: ', e);
        console.log('----------------------------------');

        var context = this.canvas.getContext('2d');
        console.log(context);

        context.drawImage(this.video, 0, 0, this.state.width, this.state.height);

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
            image: '',
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

    render: function() {

        return (
            <div className="PhotoBooth">
                <video ref={(ref) => this.video = ref} width={this.state.width} height={this.state.height} src={this.state.video} autoPlay></video>
                <canvas ref={(ref) => this.canvas = ref} width={this.state.width} height={this.state.height}></canvas>
                <button src={this.state.src} onClick={this._clickHandler}>Capture Me</button>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
