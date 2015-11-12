(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/John/Documents/Face-the-Internet/app/App.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Header = require('./components/Header.js');
var Canvas = require('./components/Canvas.js');
var Video = require('./components/Video.js');

var App = React.createClass({displayName: "App",
	render: function() {
		return (
			React.createElement(Header, {text: "Face the Internet"})
		);
	}
	
});
	
module.exports = App;

},{"./components/Canvas.js":"/Users/John/Documents/Face-the-Internet/app/components/Canvas.js","./components/Header.js":"/Users/John/Documents/Face-the-Internet/app/components/Header.js","./components/Video.js":"/Users/John/Documents/Face-the-Internet/app/components/Video.js","react":"react"}],"/Users/John/Documents/Face-the-Internet/app/components/Canvas.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');

var Canvas = React.createClass({displayName: "Canvas",
	render: function() {
		return (
			React.createElement("canvas", {width: "200", height: "100"})
		);
	}
	
});
	
module.exports = Canvas;

},{"react":"react"}],"/Users/John/Documents/Face-the-Internet/app/components/Header.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');

var Header = React.createClass({displayName: "Header",
	render: function() {
		return (
			React.createElement("h1", null, this.props.text)
		);
	}
	
});
	
module.exports = Header;

},{"react":"react"}],"/Users/John/Documents/Face-the-Internet/app/components/Video.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');

var Video = React.createClass({displayName: "Video",
	render: function() {
		return (
			React.createElement("div", {className: "video"})
		);
	}
	
});
	
module.exports = Video;

},{"react":"react"}],"/Users/John/Documents/Face-the-Internet/specs/App-spec.js":[function(require,module,exports){
var App = require('./../app/App.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("App", function() {

  it("should render text: Hello world!", function() {
    var app = TestUtils.renderIntoDocument(React.createElement(App));
    expect(React.findDOMNode(app).textContent).toEqual('Hello world!');
  });

});


},{"./../app/App.js":"/Users/John/Documents/Face-the-Internet/app/App.js","react/addons":"react/addons"}]},{},["/Users/John/Documents/Face-the-Internet/specs/App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQXBwLmpzIiwiYXBwL2NvbXBvbmVudHMvQ2FudmFzLmpzIiwiYXBwL2NvbXBvbmVudHMvSGVhZGVyLmpzIiwiYXBwL2NvbXBvbmVudHMvVmlkZW8uanMiLCJzcGVjcy9BcHAtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9IZWFkZXIuanMnKTtcbnZhciBDYW52YXMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ2FudmFzLmpzJyk7XG52YXIgVmlkZW8gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvVmlkZW8uanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChIZWFkZXIsIHt0ZXh0OiBcIkZhY2UgdGhlIEludGVybmV0XCJ9KVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIENhbnZhcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJDYW52YXNcIixcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiLCB7d2lkdGg6IFwiMjAwXCIsIGhlaWdodDogXCIxMDBcIn0pXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXHRcbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkhlYWRlclwiLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgbnVsbCwgdGhpcy5wcm9wcy50ZXh0KVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFZpZGVvID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlZpZGVvXCIsXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJ2aWRlb1wifSlcblx0XHQpO1xuXHR9XG5cdFxufSk7XG5cdFxubW9kdWxlLmV4cG9ydHMgPSBWaWRlbztcbiIsInZhciBBcHAgPSByZXF1aXJlKCcuLy4uL2FwcC9BcHAuanMnKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xudmFyIFRlc3RVdGlscyA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHM7XG5cbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xuXG4gIGl0KFwic2hvdWxkIHJlbmRlciB0ZXh0OiBIZWxsbyB3b3JsZCFcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoUmVhY3QuY3JlYXRlRWxlbWVudChBcHApKTtcbiAgICBleHBlY3QoUmVhY3QuZmluZERPTU5vZGUoYXBwKS50ZXh0Q29udGVudCkudG9FcXVhbCgnSGVsbG8gd29ybGQhJyk7XG4gIH0pO1xuXG59KTtcblxuIl19
