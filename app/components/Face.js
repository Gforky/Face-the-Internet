/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    JQuery = require('jquery');
var Face = React.createClass({
	_getData: function() {
		this.data = [
			'rows1/1_image.png',
			'rows2/2_image.png',
			'rows1/3_image.png',
			'rows2/4_image.png',
			'rows1/5_image.png',
			'rows2/6_image.png',
			'rows1/7_image.png',
			'rows2/8_image.png',
			'rows1/9_image.png',
			'rows2/10_image.png',
			'rows1/11_image.png',
			'rows2/12_image.png',
			'rows1/13_image.png',
			'rows2/14_image.png',
			'rows1/15_image.png',
			'rows2/16_image.png',
			'rows1/17_image.png',
			'rows2/18_image.png',
			'rows1/19_image.png'
		];
	},
	_createFabric: function() {
		this.canvas = canvas = new fabric.Canvas(ReactDOM.findDOMNode(this.canvas));
		canvas.setHeight(window.innerHeight);
	    canvas.setWidth(window.innerWidth);
	    canvas.renderAll();
	},
	_renderSlice: function(i) {
		fabric.Image.fromURL(this.data[i], function(img) {
			img.set({
				top: (window.innerHeight / 20) * i,
                width: window.innerWidth,
                height: window.innerHeight / 20,
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
	},
    render: function() {
        return (
            <canvas className="Face" ref={(ref) => this.canvas = ref}></canvas>
        );
    }
});
module.exports = Face;
