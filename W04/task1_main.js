function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [  1,  1,  1 ], //0
        [ -1,  1,  1 ], //1
        [ -1, -1,  1 ], //2
        [  1, -1,  1 ], //3
        [  1,  1, -1 ], //4
        [ -1,  1, -1 ], //5
        [ -1, -1, -1 ], //6
        [  1, -1, -1 ]  //7
    ];

    var faces = [
        [ 0, 1, 2 ],
        [ 2, 3, 0 ],
        [ 4, 5, 6 ],
        [ 6, 7, 4 ],
        [ 1, 0, 4 ],
        [ 4, 5, 1 ],
        [ 2, 3, 7 ],
        [ 7, 6, 2 ],
        [ 1, 5, 6 ],
        [ 6, 2, 1 ],
        [ 0, 4, 7 ],
        [ 7, 3, 0 ]
    ];

    var geometry = new THREE.Geometry();

    for(let i in vertices){
        let v = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( v );
    }

    for(let i in faces){
        let id = faces[i];
        let f = new THREE.Face3( id[0], id[1], id[2] );            
        geometry.faces.push( f );
    }

    //    var material = new THREE.MeshBasicMaterial();
    var material = new THREE.MeshLambertMaterial();
    material.vertexColors = THREE.FaceColors;
    for(let i in geometry.faces){
        geometry.faces[i].color = new THREE.Color( 1, 1, 1 );
    }

    geometry.computeFaceNormals();
    material.side = THREE.DoubleSide;

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        triangle.rotation.x += 0.001;
        triangle.rotation.y += 0.001;
        renderer.render( scene, camera );
    }
}
