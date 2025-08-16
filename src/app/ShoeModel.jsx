"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PresentationControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Shoe() {
  const meshRef = useRef();
  const { scene } = useGLTF("/shoe.glb");

  // 自动旋转动画
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={2}
      position={[0, 0, 0]}
    />
  );
}

// 预加载模型
useGLTF.preload("/shoe.glb");

export default function ShoeModel() {
  return (
    <div className="shoe-model-container">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "#000000" }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={10} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.1, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 12, tension: 400 }}
          snap={{ mass: 4, tension: 200 }}
        >
          <Shoe />
        </PresentationControls>
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
