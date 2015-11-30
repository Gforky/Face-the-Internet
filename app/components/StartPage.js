/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

var StartPage = React.createClass({

    componentWillMount: function() {

        console.log('----------------------------------');
        console.log('[EVENT] ', 'New user');
        console.log('----------------------------------');

    },

    render: function() {

        return (
            <div className="StartPage">
                <h1>Face the Internet</h1>
                <Link to="/photo-booth">Start</Link>
            </div>
        );
    }
    
});
    
module.exports = StartPage;
