/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

var App = require('./App.js');
var StartPage = require('./components/StartPage.js');
var PhotoBooth = require('./components/PhotoBooth.js');
var Face = require('./components/Face.js');

ReactDOM.render(<App/>, document.getElementById('App'));

ReactDOM.render((
	<Router>
		<Route path="/" component={Face} />
		<Route path="/photo-booth" component={PhotoBooth} />
	</Router>
), document.getElementById('App'));