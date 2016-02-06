/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom');
var Face = React.createClass({
	componentDidMount: function() {
		this.canvas = new fabric.Canvas(ReactDOM.findDOMNode(this.canvas));
		fabric.Image.fromURL('img.jpg', function(img) {
		  this.canvas.add(img);
		}.bind(this));
	},
    render: function() {
        return (
            <canvas className="Face" ref={(ref) => this.canvas = ref}></canvas>
        );
    }
});
module.exports = Face;
