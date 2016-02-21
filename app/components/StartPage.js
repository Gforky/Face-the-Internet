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
                            <p>This is an online experiment, where each webcam image contributed will become part of an 
                            ever-evolving construction of a single face: Pixels from each contributed image will exist in the 
                            generated image forver. There is a full write up of the technical parts of the project on 
                            <a href="https://github.com/JohnPett/Face-the-Internet" target="_blank">Github</a>.</p>
                            <p>The project aims to let there never be a final image, as the output develops it is the images 
                            submitted that control the direction of what will come - the procedural and generative aspects of 
                            this idea are as important and the image evolving over time.</p>
                            <p>Originally conceived between <a href="http://cargocollective.com/florianhacker" target="_blank">Florian Hacker</a>,
                            and <a href="https://github.com/JohnPett" target="_blank">John Pett</a>, as an entry to the <a href="#" target="_blank">Google and Barbican DevArt</a> contest. 
                            This project has also been contributed to by <a href="https://github.com/gomako" target="_blank">Ben Harvey</a>, with <a href="https://github.com/eduwass" target="_blank">Edu Wass</a> building many of the backend concepts of the project.</p>
                            <a className="button" onClick={this._closeHandler}>Close</a>
                        </div>
                    </div>
                </div>
                <div className={this.state.infoActive ? 'overlay disabled' : 'overlay'}>
                    <div className="welcome message">
                        <div>
                            <h1>Face the Internet</h1>
                            <p>Click 'Start' to contribute a webcam image. We will not keep your image once it has been added to the final piece. 
                            Please leave you email address, so we can confirm your addition.</p>
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
