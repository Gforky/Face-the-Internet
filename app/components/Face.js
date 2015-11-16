/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');
var ReactTHREE = ('react-three');

var Face = React.createClass({

    componentWillMount: function() {

    },

    componentDidMount: function() {

    },

    componentWillUnmount: function() {

    },

    render: function() {
        return (
            
            <div ref={(ref) => this.container = ref}>
                <p>I am the container.</p>
            </div>

        );
    }
    
});
    
module.exports = Face;
