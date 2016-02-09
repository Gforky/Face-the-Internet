/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    JQuery = require('jquery');
var Face = React.createClass({
	_getData: function() {
		this.data = [
			'rows3/1_image.png',
			'rows4/2_image.png',
			'rows3/3_image.png',
			'rows4/4_image.png',
			'rows3/5_image.png',
			'rows4/6_image.png',
			'rows3/7_image.png',
			'rows4/8_image.png',
			'rows3/9_image.png',
			'rows4/10_image.png',
			'rows3/11_image.png',
			'rows4/12_image.png',
			'rows3/13_image.png',
			'rows4/14_image.png',
			'rows3/15_image.png',
			'rows4/16_image.png',
			'rows3/17_image.png',
			'rows3/18_image.png',
			'rows4/19_image.png'
		];
	},
	_createFabric: function() {
		this.canvas = canvas = new fabric.Canvas(ReactDOM.findDOMNode(this.canvas));
		canvas.setHeight(window.innerHeight);
	    canvas.setWidth(window.innerWidth);
	    canvas.renderAll();
	},
	_renderText: function() {
		var t = new fabric.IText("Hello world !", {
		  top: 100,
		  left: 100,
		  backgroundColor: '#FFFFFF',
		  fill: '#000000',
		  fontSize: 80,
		  lockScalingX: true,
		  lockScalingY: true,
		  hasRotatingPoint: false,
		  transparentCorners: false,
		});
		this.canvas.add(t).renderAll();
	},
	_renderSlice: function(i) {
		fabric.Image.fromURL(this.data[i], function(img) {
			img.set({
				top: (window.innerHeight / this.data.length) * i,
                width: window.innerWidth,
                height: window.innerHeight / this.data.length,
                selectable: false,
			});
			this.canvas.add(img);
		}.bind(this));
	},
	componentDidMount: function() {
		this._createFabric();
		this._getData();
		for (var i = 0; i < this.data.length; i++) {
			this._renderSlice(i);
		};
		this._renderText();
	},
    render: function() {
        return (
            <canvas className="Face" ref={(ref) => this.canvas = ref}></canvas>
        );
    }
});
module.exports = Face;
