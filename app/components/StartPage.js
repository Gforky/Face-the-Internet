/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var StartPage = React.createClass({
    componentWillMount: function() {

    },
    render: function() {
        return (
            <div className="StartPage">
                <div className="overlay">
                    
                    <div className="welcome message">
                        <div>
                            <h1>face the internet</h1>
                            <Link className="start button" to="/photo-booth">start</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
});
module.exports = StartPage;
