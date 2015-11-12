/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var PhotoBooth = React.createClass({

    _successHandler: function(stream) {

        console.log('----------------------------------');
        console.log('[EVENT] ', 'User has accepted webcam: ', stream);
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
        console.log('[ERROR] ', 'User has webcam error: ', e);
        console.log('----------------------------------');

    },

    componentWillMount: function() {

        this.setState({
            src: '',
            width: '',
            height: ''
        });

        console.log('----------------------------------');
        console.log('[EVENT] ', 'Start webcam...');
        console.log('----------------------------------');

        // create cross-browser var to check for webcam support
        navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {

            navigator.getUserMedia({video: true}, this._successHandler, this._errorHandler);

        }

    },

    render: function() {

        return (
            <div className="PhotoBooth">
                <video ref="video" width={this.state.width} height={this.state.height} src={this.state.src} autoPlay></video>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
