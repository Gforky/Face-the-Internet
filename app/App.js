/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var StartPage = require('./components/StartPage.js');
var PhotoBooth = require('./components/PhotoBooth.js');

var App = React.createClass({
    render: function() {

        return (
            <div className="wrapper">
                <StartPage></StartPage>
            </div>
        );
    }
    
});
    
module.exports = App;
