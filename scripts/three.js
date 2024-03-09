import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0); // the default

const container = document.getElementById('three-container');

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

renderer.setSize(container.clientWidth, container.clientHeight);

container.appendChild(renderer.domElement).id = 'three-canvas';

var model;

const loader = new OBJLoader();
loader.load('../models/ghost.obj', (obj) => {
  model = obj;
  model.scale.set(0.5, 0.5, 0.5);
  model.rotation.x = -0.4;
  scene.add(model);
});

const light = new THREE.DirectionalLight('magenta', 5);
light.position.set(0, 0, 0);
scene.add(light);

const sidelight = new THREE.DirectionalLight('blue', 5);
light.position.set(0, -50, 0);
scene.add(sidelight);

camera.position.set(0, 10, 10);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2; // Maximum allowed angle (90 degrees)
controls.minPolarAngle = Math.PI / 2; // Minimum allowed angle (90 degrees)

controls.enablePan = false;
controls.enableZoom = false;

const animate = function () {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.03;
  }

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  renderer.render(scene, camera);
};

animate();
