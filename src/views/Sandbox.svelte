<script>
    import * as THREE from 'three';
  
    let renderer;
    let camera;
    let scene;
    let fork;
  
    function init() {
      // create the renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
      // create the camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
  
      // create the scene
      scene = new THREE.Scene();
  
      // create the fork
      const forkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      const forkMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      fork = new THREE.Mesh(forkGeometry, forkMaterial);
      scene.add(fork);
  
      // render the scene
      renderer.render(scene, camera);
    }
  
    function animate() {
      requestAnimationFrame(animate);
  
      // rotate the fork slightly
      fork.rotation.x += 0.01;
      fork.rotation.y += 0.01;
  
      // render the scene
      renderer.render(scene, camera);
    }
  
    // initialize the scene when the component is mounted
    $: {
      init();
      animate();
    }
  </script>