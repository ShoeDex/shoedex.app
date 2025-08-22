'use client';
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  PresentationControls,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { WiggleBone } from 'wiggle';

function Shoe() {
  const meshRef = useRef();
  const { nodes, scene } = useGLTF('/shoe.glb');
  const wiggleBones = useRef([]);
  let root = useRef();

  useEffect(() => {
    wiggleBones.current.length = 0;

    scene.traverse((child) => {
      if (child.isSkinnedMesh) {
        child.skeleton.bones.forEach((bone) => {
          if (!bone.parent.isBone && !root.current) {
            root.current = bone;
          } else {
            const wiggleBone = new WiggleBone(bone, {
              velocity: 0.13,
            });
            wiggleBones.current.push(wiggleBone);
          }
        });
      }
    });

    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });
    };
  }, [scene, nodes]);

  // Auto-rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });
  });

  return (
    <primitive ref={meshRef} object={scene} scale={2.5} position={[0, 0, 0]} />
  );
}

// Preload model
useGLTF.preload('/shoe.glb');

export default function ShoeModel() {
  return (
    <div className="shoe-model-container">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={10} />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} />
        <PresentationControls
          global
          cursor
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
