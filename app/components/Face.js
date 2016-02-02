/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom');

var Face = React.createClass({

    render: function() {

        return (
            
            <div className="Face" ref={(ref) => this.container = ref}>
            </div>

        );
    }
    
});
    
module.exports = Face;
