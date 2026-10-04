import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function webglSupported() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext(); // free the test context
    return true;
  } catch {
    return false;
  }
}

/**
 * Drop-in 3D viewer.
 *  - No modelUrl  -> shows a built-in torus knot (good placeholder).
 *  - modelUrl     -> loads a .glb/.gltf, e.g. "/models/project.glb" (put it in public/models/).
 *  - If WebGL is unavailable, shows `fallback` instead of crashing.
 */
export default function ModelViewer({
  modelUrl,
  height = 420,
  color = "#6d5efc",
  autoRotate = true,
  className = "",
  fallback = "3D view isn't available in this browser.",
}) {
  const mountRef = useRef(null);
  const [supported] = useState(webglSupported);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !supported) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      console.warn("WebGL unavailable:", err);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.6, 5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(4, 5, 5);
    scene.add(key);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    if (modelUrl) {
      new GLTFLoader().load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3()).length();
          model.position.sub(box.getCenter(new THREE.Vector3()));
          const holder = new THREE.Group();
          holder.add(model);
          holder.scale.setScalar(3 / size);
          scene.add(holder);
        },
        undefined,
        (err) => console.error("Model failed to load:", err)
      );
    } else {
      scene.add(
        new THREE.Mesh(
          new THREE.TorusKnotGeometry(1, 0.34, 220, 32),
          new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.25 })
        )
      );
    }

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) [].concat(obj.material).forEach((m) => m.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, color, autoRotate, supported]);

  if (!supported) {
    return (
      <div className={className} style={{ height, display: "grid", placeItems: "center" }}>
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height, touchAction: "pan-y" }}
    />
  );
}
