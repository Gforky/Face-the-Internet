/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Face = require('../components/Face.js');
var StartPage = React.createClass({
    _infoHandler: function() {
        console.log('info');
    },
    render: function() {
        return (
            <div className="StartPage">
                <div className="overlay">
                    <div className="welcome message">
                        <div>
                            <h1>Face the Internet</h1>
                            <p>This project sits somewhere between sculpture, technology, art, graphic design and interactivity. 
                            An experiment, as much as a learning exercise, to combine the latest technologies for application 
                            development with thoughts on contemporary art, computer vision and user interaction.</p>
                            <p>This project was originally conceived between Florian Hacker and <a href="https://github.com/JohnPett">John Pett</a> as an entry to the 
                            Google and Barbican DevArt contest. This project has also been contributed to by Ben Harvey and 
                            Edu Wass. </p>
                            <p>Click 'start' to contribute a webcam image. We will not keep your image once it has been added to the final piece. 
                            You are free to leave a Twitter handle or email address, so we can confirm your addition.</p>
                            <Link className="start button" to="/photo-booth">start</Link>
                        </div>
                    </div>
                </div>
                <Face />
            </div>
        );
    } 
});
module.exports = StartPage;
