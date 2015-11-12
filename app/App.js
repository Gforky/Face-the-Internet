/** @jsx React.DOM */
var React = require('react');
var Header = require('./components/Header.js');
var Canvas = require('./components/Canvas.js');
var Video = require('./components/Video.js');

var App = React.createClass({
	render: function() {
		return (
			<Header text="Face the Internet"></Header>
		);
	}
	
});
	
module.exports = App;
