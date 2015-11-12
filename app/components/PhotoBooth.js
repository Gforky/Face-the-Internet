/** @jsx React.DOM */
var React = require('react');

var PhotoBooth = React.createClass({

    componentDidMount: function() {

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
            console.log('[EVENT] ', 'User has accepted webcam...');
            console.log('----------------------------------');
            console.log(this);
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
                <video width={this.width} height={this.height}></video>
            </div>
        );
    }
    
});
    
module.exports = PhotoBooth;
