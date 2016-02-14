/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Face = require('../components/Face.js');
var StartPage = React.createClass({
    _closeHandler: function() {
        this.setState({
            infoActive: false
        });
    },
    _infoHandler: function() {
        this.setState({
            infoActive: true
        });
    },
    componentWillMount: function() {
        this.setState({
            infoActive: false
        });
    },
    render: function() {
        return (
            <div className="StartPage">
                <div className={this.state.infoActive ? 'info overlay active' : 'info overlay'}>
                    <div className="message">
                        <div>
                            <h1>Face the Internet</h1>
                            <p>This project sits somewhere between sculpture, technology, art, graphic design and interactivity. 
                            An experiment, as much as a learning exercise, to combine the latest technologies for application 
                            development with thoughts on contemporary art, computer vision and user interaction.</p>
                            <p>Originally conceived between <a href="http://cargocollective.com/florianhacker">Florian Hacker</a>,
                            and <a href="https://github.com/JohnPett">John Pett</a>, as an entry to the Google and Barbican DevArt contest. 
                            This project has also been contributed to by Ben Harvey and Edu Wass. </p>
                            <p>Click 'Start' to contribute a webcam image. We will not keep your image once it has been added to the final piece. 
                            You are free to leave a Twitter handle or email address, so we can confirm your addition.</p>
                            <a className="button" onClick={this._closeHandler}>Close</a>
                        </div>
                    </div>
                </div>
                <div className={this.state.infoActive ? 'overlay disabled' : 'overlay'}>
                    <div className="welcome message">
                        <div>
                            <h1>Face the Internet</h1>
                            <a className="button" onClick={this._infoHandler}>Information</a>
                            <Link className="start button" to="/photo-booth">Contribute an image</Link>
                        </div>
                    </div>
                </div>
                <Face />
            </div>
        );
    } 
});
module.exports = StartPage;
