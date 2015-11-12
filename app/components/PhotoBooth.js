/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var PhotoBooth = React.createClass({

    _clickHandler: function(uno, dos) {

        console.log(uno);

        console.log(dos);

        // var src = this.state.src;

        // this.context = ReactDOM.findDOMNode(this.refs.canvas).getContext('2d');

        // var image = new Image();

        // image.src = src;

        // image.onload = function () {
        //     this.context.drawImage(image, 0, 0);
        // }

        console.log('button click');
    },

    _successHandler: function(stream) {

        console.log('----------------------------------');
        console.log('[PHOTOBOOTH - EVENT] ', 'User has allowed webcam: ', stream);
        console.log('----------------------------------');

        var src = window.URL.createObjectURL(stream);

        var width = window.outerWidth;

        var height = window.outerHeight;

        this.setState({
            src: src,
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
            src: '',
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
                <video ref="video" width={this.state.width} height={this.state.height} src={this.state.src} autoPlay></video>
                <canvas ref="canvas"></canvas>
                <button src={this.state.src} onClick={this._clickHandler.bind(this, this.state.src)}>Capture</button>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
