/** @jsx React.DOM */
var React = require('react');
var Header = require('./components/Header.js');
var PhotoBooth = require('./components/PhotoBooth.js');

var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">

				<PhotoBooth></PhotoBooth>

			</div>
		);
	}
	
});
	
module.exports = App;
