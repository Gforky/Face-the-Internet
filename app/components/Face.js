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
			img.set({
    			// left: (window.innerWidth/2) - (canvas.width/2),
       			// top: (window.innerHeight/2) - (canvas.height/2),
                width: window.innerWidth,
                height: (canvas.height/canvas.width) * window.innerWidth
			});
		});
	},
    render: function() {
        return (
            <canvas className="Face" ref={(ref) => this.canvas = ref}></canvas>
        );
    }
});
module.exports = Face;
