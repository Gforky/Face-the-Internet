/** @jsx React.DOM */
var React = require('react');

var PhotoBooth = React.createClass({

	_startWebcam function() {
		
	}

	render: function() {

		this.width = window.outerWidth;

		this.height = window.outerHeight;

		return (
			<canvas width={this.width} height={this.height}></canvas>
		);
	}
	
});
	
module.exports = PhotoBooth;
