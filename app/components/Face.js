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
		// TO DO: This only works for window width being bigger than window height... 
		fabric.Image.fromURL('img.jpg', function(img) {
			img.set({
                width: window.innerWidth,
                height: (canvas.height/canvas.width) * window.innerWidth,
                selectable: false
			})
			canvas.add(img);
		});
	},
    render: function() {
        return (
            <canvas className="Face" ref={(ref) => this.canvas = ref}></canvas>
        );
    }
});
module.exports = Face;
