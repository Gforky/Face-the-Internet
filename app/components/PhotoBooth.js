/** @jsx React.DOM */
var React = require('react');
var Video = require('../components/Video.js');

var PhotoBooth = React.createClass({

    _setVideoSrc: function(src) {

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
            console.log('----------------------------------');
            console.log('[EVENT] ', 'User has accepted webcam: ', stream);
            console.log('----------------------------------');
            // this.setState({src: stream});
            // this._setVideoSrc(stream);
        }

        function errorCallback(e) {
            console.log('----------------------------------');
            console.log('[ERROR] ', 'User has error webcam: ', e);
            console.log('----------------------------------');
        }

    },

    render: function() {

        this.width = window.outerWidth;

        this.height = window.outerHeight;

        return (
            <div className="PhotoBooth">
                <Video width={this.state.width} height={this.state.height} src={this.state.src}></Video>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
