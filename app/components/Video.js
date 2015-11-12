/** @jsx React.DOM */
var React = require('react');

var Video = React.createClass({
    render: function() {
        return (
            <video width={this.props.width} height={this.props.height} src={this.props.src}></video>
        );
    }
    
});
    
module.exports = Video;
