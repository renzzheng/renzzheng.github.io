import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Container
const container = document.getElementById("model-container");

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.physicallyCorrectLights = true; // IMPORTANT
container.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Pivot (rotation anchor)
const pivot = new THREE.Group();
scene.add(pivot);

// Camera
const camera = new THREE.PerspectiveCamera(100, 1, 0.01, 1000);

// Lighting (glass NEEDS contrast)
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// Resize
function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

// Load GLTF
const loader = new GLTFLoader();
let model;

loader.load(
  "./models/persimmon/persimmon.glb",
  (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // // Apply glass-like material
        // child.material = new THREE.MeshPhysicalMaterial({
        //   color: new THREE.Color(1.0, 0.75, 0.45),
        //   roughness: 0.1,
        //   metalness: 0.0,
        //   clearcoat: 1.0,
        //   clearcoatRoughness: 0.15,
        //   transparent: true,
        //   opacity: 0.25,
        //   side: THREE.DoubleSide
        // });
      }
    });

    // Center model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();

    model.position.sub(center);
    pivot.add(model);

    // Camera framing
    camera.near = size / 100;
    camera.far = size * 100;
    camera.position.set(0, size * 0.3, size * 1.0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  },
  undefined,
  (err) => console.error(err)
);

const mouse = { x: 0, y: 0 };
const targetOffset = { x: 0, y: 0 };
const currentOffset = { x: 0, y: 0 };

let baseRotationY = 0;
let spinBoost = 0;     // temporary speed boost
let lift = 0;          // vertical lift

let lastMouseX = 0;
let lastMouseY = 0;

window.addEventListener("mousemove", (e) => {
  const nx = (e.clientX / window.innerWidth) * 2 - 1;
  const ny = (e.clientY / window.innerHeight) * 2 - 1;

  // Opposite nudge
  targetOffset.x = -ny * 0.12;
  targetOffset.y = -nx * 0.25;

  // --- Mouse velocity (THIS is the magic) ---
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;

  const speed = Math.sqrt(dx * dx + dy * dy);

  // Inject energy (clamped)
  spinBoost += Math.min(speed * 0.0006, 0.04);
  lift += Math.min(speed * 0.0004, 0.025);

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

// let baseRotationY = 0;

// Animation
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // --- Base spin + temporary boost ---
  // baseRotationY += delta * (0.45 + spinBoost);

  // Decay boost and lift (smooth return)
  spinBoost *= 1.0 - delta * 2.0;
  lift *= 0.2;

  // Mouse inertia
  const ease = 0.5;

  currentOffset.x += (targetOffset.x - currentOffset.x) * ease;
  currentOffset.y += (targetOffset.y - currentOffset.y) * ease;

  // Apply rotation
  pivot.rotation.x = currentOffset.x;
  pivot.rotation.y = baseRotationY + currentOffset.y;

  // Apply vertical lift
  pivot.position.y = lift;

  renderer.render(scene, camera);
}

animate();
