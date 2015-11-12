/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/Header.js');
var PhotoBooth = require('./components/PhotoBooth.js');

var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<Header text="Hello world!"></Header>
				<PhotoBooth></PhotoBooth>
			</div>
		);
	}
	
});
	
module.exports = App;
