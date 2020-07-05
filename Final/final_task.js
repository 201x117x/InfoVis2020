function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var smin = volume.min_value;
    var smax = volume.max_value;
    var isovalue = KVS.Mix( smin, smax, 0.5 );
    var isovalue = Math.round( isovalue );

    document.getElementById('label').innerHTML = "Isovalue: " + isovalue;

    surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light );
    screen.scene.add( surfaces );

    document.getElementById('isovalue')
        .addEventListener('mousemove', function() {
            var value = +document.getElementById('isovalue').value;
            var isovalue = KVS.Mix( smin, smax, value );
            var isovalue = Math.round( isovalue );
            document.getElementById('label').innerHTML = "Isovalue: " + isovalue;
        });

    document.getElementById('apply-button')
        .addEventListener('click', function() {
            screen.scene.remove( surfaces );
            var value = +document.getElementById('isovalue').value;
            var isovalue = KVS.Mix( smin, smax, value );
            var isovalue = Math.round( isovalue );
            surfaces = Isosurfaces( volume, isovalue, screen.camera, screen.light );
            screen.scene.add( surfaces );        
        });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
}
