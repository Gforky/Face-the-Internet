/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    JQuery = require('jquery');
var Face = React.createClass({
	_createFabric: function() {
		this.canvas = canvas = new fabric.Canvas(ReactDOM.findDOMNode(this.canvas));
		canvas.setHeight(window.innerHeight);
	    canvas.setWidth(window.innerWidth);
	    canvas.renderAll();
	},
	componentDidMount: function() {
		this._createFabric();
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
