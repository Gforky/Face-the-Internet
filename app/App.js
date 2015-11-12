/** @jsx React.DOM */
var React = require('react');
var Header = require('./components/Header.js');
var PhotoBooth = require('./components/PhotoBooth.js');

var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				
				<h1>What up?</h1>

				<PhotoBooth></PhotoBooth>

			</div>
		);
	}
	
});
	
module.exports = App;
