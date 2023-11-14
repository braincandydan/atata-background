document.addEventListener('DOMContentLoaded', function() {
    // This function initializes the shader effect on a given container
    function initShaderEffect(containerElement) {
        let camera, scene, renderer;
        let uniforms;

        camera = new THREE.Camera();
        camera.position.z = 1;

        scene = new THREE.Scene();

        var geometry = new THREE.PlaneBufferGeometry(2, 2);

        uniforms = {
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            u_mouse: { type: "v2", value: new THREE.Vector2() }
        };

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);

        containerElement.appendChild(renderer.domElement);

        function onWindowResize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
        }

        window.addEventListener('resize', onWindowResize, false);

        document.onmousemove = function(e) {
            uniforms.u_mouse.value.x = e.pageX
            uniforms.u_mouse.value.y = e.pageY
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            uniforms.u_time.value += 0.05 * (1 + uniforms.u_mouse.value.x / 200);
            renderer.render(scene, camera);
        }

        onWindowResize();
        animate();
    }

    // Automatically initialize shader for all containers with the 'shader-container' class
    var containers = document.querySelectorAll('.shader-container');
    containers.forEach(function(container) {
        initShaderEffect(container);
    });
});
