import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, 500);
renderer.outputColorSpace = THREE.SRGBColorSpace;

document.getElementById("model-container").appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / 500,
  0.1,
  100
);
camera.position.set(0, 1, 3);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Load GLTF
const loader = new GLTFLoader();
let model;

loader.load(
  "./models/pencil.gltf",
  (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    model.scale.set(20, 20, 20);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("GLTF load error:", error);
  }
);

// Mouse interaction
document.addEventListener("mousemove", (e) => {
  if (!model) return;
  model.rotation.y = (e.clientX / window.innerWidth - 0.5) * 1.2;
  model.rotation.x = (e.clientY / window.innerHeight - 0.5) * 0.6;
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / 500;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 500);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
