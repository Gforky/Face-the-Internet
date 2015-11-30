/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

var App = require('./App.js');
var StartPage = require('./components/StartPage.js');
var PhotoBooth = require('./components/PhotoBooth.js');

ReactDOM.render(<App/>, document.getElementById('app'));
ReactDOM.render((
  <Router>
    <Route path="/" component={StartPage} />
    <Route path="/photo-booth" component={PhotoBooth} />
  </Router>
), document.getElementById('app'));