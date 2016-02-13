/** @jsx React.DOM */
var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,
	Route = require('react-router').Route;

var App = require('./App.js'),
	StartPage = require('./components/StartPage.js'),
	PhotoBooth = require('./components/PhotoBooth.js'),
	Face = require('./components/Face.js');

ReactDOM.render(<App/>, document.getElementById('App'));

ReactDOM.render((
	<Router>
		<Route path="/" component={StartPage} />
		<Route path="/photo-booth" component={PhotoBooth} />
		<Route path="/output" component={Face} />
	</Router>
), document.getElementById('App'));