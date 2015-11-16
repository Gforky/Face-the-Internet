/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');

var Face = React.createClass({

	componentDidMount: function() {

		// Add WebGL canvas to window
		var renderer = new THREE.WebGLRenderer( { antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( renderer.domElement );

		// Set-up WebGL scene
		var scene = new THREE.Scene();
		var helperScene = new THREE.Scene();

		// Set-up WebGL camera
		var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 100;
		camera.target = new THREE.Vector3();
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		
		scene.add( camera );
	},

    render: function() {
        return (
            
        	<div ref={(ref) => this.container = ref}></div>

        );
    }
    
});
    
module.exports = Face;
