# renzzheng.github.io
My portfolio!

https://renzzheng.github.io/

## Built With
- HTML, CSS, JavaScript (ES modules)
- Three.js (WebGL)
- GLTFLoader for 3D model loading

---

## Model Optimization For Faster Loading
- Started with the original persimmon model as a `.gltf` asset.
- Tested the model in Three.js using `GLTFLoader`.
- Bundled the asset into a single `.glb` file for simpler deployment, resulting in an initial file size of 44.8 MB.
- Generated a compressed `.glb` version, reducing the model to 21.6 MB.
- Further optimized the `.glb` to 4 MB, significantly reducing load time.
