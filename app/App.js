/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
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
