/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var three = require('three');

var StartPage = React.createClass({

    componentWillMount: function() {

        console.log('----------------------------------');
        console.log('[EVENT] ', 'New user.');
        console.log('----------------------------------');

        var bust = ReactDOM.findDOMNode(this.refs.bust);
        console.log(bust);

    },

    render: function() {

        return (
            <div className="StartPage">
            	<h1>Headline Title</h1>
            	<button>Click to start</button>
                <div ref="bust"></div>
            </div>
        );
    }
    
});
    
module.exports = StartPage;
