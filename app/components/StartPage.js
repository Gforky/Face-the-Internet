/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var three = require('three');

var StartPage = React.createClass({

    componentWillMount: function() {

    },

    render: function() {

        return (
            <div className="StartPage">
            	<h1>Headline Title</h1>
            	<button>Click to start</button>
            </div>
        );
    }
    
});
    
module.exports = StartPage;
