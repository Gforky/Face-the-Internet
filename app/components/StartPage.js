/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
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
                <Face></Face>
            </div>
        );
    }
    
});
    
module.exports = StartPage;
