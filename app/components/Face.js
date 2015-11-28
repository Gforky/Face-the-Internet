/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var DecalGeometry = require('three-decal-geometry')(THREE);

var renderer, scene, helperScene, camera, fov = 45;
var mesh, decal;
var projector, raycaster;
var line;
var spotLight, pointLight, ambientLight;

var intersection = {
    intersects: false,
    point: new THREE.Vector3(),
    normal: new THREE.Vector3()
};

var controls, renderHelpers = false;
var mouseVector = new THREE.Vector3();
var mouse = new THREE.Vector2();

var decalMaterial = new THREE.MeshPhongMaterial( { 
    specular: 0xffffff,
    shininess: 10,
    map: THREE.ImageUtils.loadTexture( 'model/splatter.png' ), 
    normalMap: THREE.ImageUtils.loadTexture( 'model/wrinkle-normal.jpg' ),
    normalScale: new THREE.Vector2( .15, .15 ),
    transparent: true, 
    depthTest: true, 
    depthWrite: false, 
    polygonOffset: true,
    polygonOffsetFactor: -4, 
    wireframe: false 
});

var decals = [];
var decalHelper, mouseHelper;
var p = new THREE.Vector3( 0, 0, 0 );
var r = new THREE.Vector3( 0, 0, 0 );
var s = new THREE.Vector3( 10, 10, 10 );
var up = new THREE.Vector3( 0, 1, 0 );
var check = new THREE.Vector3( 1, 1, 1 );

var params = {
    projection: 'normal',
    minScale: 10,
    maxScale: 30,
    rotate: true,
    clear: function() {
        removeDecals();
    }
};

var Face = React.createClass({

    _onWindowResize: function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    },

    _loadJSONModel: function() {

        loader = new THREE.JSONLoader();

        loader.load( "model/LeePerrySmith.js", function(geometry) {

            geometry.verticesNeedUpdate = true;
            geometry.elementsNeedUpdate = true;
            geometry.morphTargetsNeedUpdate = true;
            geometry.uvsNeedUpdate = true;
            geometry.normalsNeedUpdate = true;
            geometry.colorsNeedUpdate = true;
            geometry.tangentsNeedUpdate = true;

            var material = new THREE.MeshPhongMaterial( {
                map: THREE.ImageUtils.loadTexture( 'model/Map-COL.jpg' ),
                specularMap: THREE.ImageUtils.loadTexture( 'model/Map-SPEC.jpg' ),
                normalMap: THREE.ImageUtils.loadTexture( 'model/Map-NOR.jpg' ),
                shininess: 10
            });

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            mesh.scale.set( 10, 10, 10 );

        });

    },

    componentWillMount: function() {



    },

    componentDidMount: function() {

        renderer = new THREE.WebGLRenderer ({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );

        this.container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        helperScene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 80;
        camera.target = new THREE.Vector3();
        controls = new OrbitControls(camera, renderer.domElement);

        scene.add(camera);

        ambientLight = new THREE.AmbientLight(0x111111);
        scene.add(ambientLight);

        pointLight = new THREE.PointLight(0xff0000);
        pointLight.position.z = 10000;
        pointLight.distance = 4000;
        scene.add(pointLight);

        pointLight2 = new THREE.PointLight(0xff5500);
        pointLight2.position.z = 1000;
        pointLight2.distance = 2000;
        scene.add(pointLight2);

        pointLight3 = new THREE.PointLight(0x0000ff);
        pointLight3.position.x = -1000;
        pointLight3.position.z = 1000;
        pointLight3.distance = 2000;
        scene.add(pointLight3);

        spotLight = new THREE.SpotLight(0xaaaaaa);
        spotLight.position.set(100, 50, 100);
        scene.add(spotLight);

        line = new THREE.Line( new THREE.Geometry( ), new THREE.LineBasicMaterial( { linewidth: 4 }) );
        line.geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
        line.geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
        scene.add(line);

        this._loadJSONModel();

        projector = new THREE.Projector();
        raycaster = new THREE.Raycaster();

        mouseHelper = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );
        scene.add(mouseHelper);
        mouseHelper.visible = false;

        window.addEventListener( 'resize', this._onWindowResize, false );

        var moved = false;

        controls.addEventListener( 'change', function() {
            moved = true;
        });

        controls.addEventListener( 'start', function() {
            moved = false;
        });

        controls.addEventListener( 'end', function() {
            checkIntersection();
            if( !moved ) shoot();
        });

        window.addEventListener( 'mousemove', onTouchMove );
        window.addEventListener( 'touchmove', onTouchMove );

        function onTouchMove( event ) {

            if( event.changedTouches ) {
                x = event.changedTouches[ 0 ].pageX;
                y = event.changedTouches[ 0 ].pageY;
            } else {
                x = event.clientX;
                y = event.clientY;
            }
            
            mouse.x = ( x / window.innerWidth ) * 2 - 1;
            mouse.y = - ( y / window.innerHeight ) * 2 + 1;

            checkIntersection();

        }

        function shoot() {

            if( params.projection == 'camera' ) {

                var dir = camera.target.clone();
                dir.sub( camera.position );

                p = intersection.point;

                var m = new THREE.Matrix4();
                var c = dir.clone();
                c.negate();
                c.multiplyScalar( 10 );
                c.add( p );
                m.lookAt( p, c, up );
                m = m.extractRotation( m );

                dummy = new THREE.Object3D();
                dummy.rotation.setFromRotationMatrix( m );
                r.set( dummy.rotation.x, dummy.rotation.y, dummy.rotation.z );

            } else {

                p = intersection.point;
                r.copy( mouseHelper.rotation );

            }

            var scale = params.minScale + Math.random() * ( params.maxScale - params.minScale );
            s.set( scale, scale, scale );

            if (params.rotate) r.z = Math.random() * 2 * Math.PI;

            var m = new THREE.Mesh( new THREE.DecalGeometry( mesh, p, r, s, check ), decalMaterial );
            decals.push( m );
            scene.add( m );

        }

        function checkIntersection() {

            mouseVector.set( mouse.x, mouse.y, 1 );
            projector.unprojectVector( mouseVector, camera );

            raycaster.set( camera.position, mouseVector.sub( camera.position ).normalize() );

            var intersects = raycaster.intersectObjects( [ mesh ] );

            if ( intersects.length > 0 ) {

                var p = intersects[ 0 ].point;
                mouseHelper.position.copy( p );
                intersection.point.copy( p );
                var n = intersects[ 0 ].face.normal.clone();
                n.multiplyScalar( 10 );
                n.add( intersects[ 0 ].point );
                intersection.normal.copy( intersects[ 0 ].face.normal );
                mouseHelper.lookAt( n );

                line.geometry.vertices[ 0 ].copy( intersection.point );
                line.geometry.vertices[ 1 ].copy( n );
                line.geometry.verticesNeedUpdate = true;

                intersection.intersects = true;

            } else {

                intersection.intersects = false;

            }

        }

        (function render() {
            requestAnimationFrame( render );
            renderer.autoClear = false;
            renderer.render( scene, camera );
            if ( renderHelpers ) renderer.render( helperScene, camera );
        })();

    },

    componentWillUnmount: function() {

    },

    render: function() {

        return (
            
            <div ref={(ref) => this.container = ref}>
            </div>

        );
    }
    
});
    
module.exports = Face;
