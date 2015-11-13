/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var three = require('three');
var Face = require('../components/Face.js');

var StartPage = React.createClass({

    componentWillMount: function() {

        console.log('----------------------------------');
        console.log('[EVENT] ', 'New user.');
        console.log('----------------------------------');

    },

    render: function() {

        return (
            <div className="StartPage">
            	<h1>Headline Title</h1>
            	<button>Click to start</button>
                <Face></Face>
            </div>
        );
    }
    
});
    
module.exports = StartPage;
