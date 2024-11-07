"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { cn } from "@/utils/utils";

const ThreeModel = ({
  modelPath,
  cameraPosition = [0, 0, 5],
  autoRotate = true,
  enableZoom = true,
  className = "",
  modelPosition = [0, 0, 0],
  modelRotation = [0, 0, 0],
  modelScale = [1, 1, 1],
}) => {
  return (
    <div className={cn(className)}>
      <Canvas orthographic camera={{ position: cameraPosition, zoom: 150 }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Model
          modelPath={modelPath}
          autoRotate={autoRotate}
          position={modelPosition}
          rotation={modelRotation}
          scale={modelScale}
        />
        <OrbitControls enableZoom={enableZoom} />
      </Canvas>
    </div>
  );
};

const Model = ({ modelPath, autoRotate, position, rotation, scale }) => {
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, modelPath);

  useFrame(() => {
    if (autoRotate) {
      mesh.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default ThreeModel;
