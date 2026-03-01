import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Use the optimized (Draco-compressed) model – ~1 MB vs ~15 MB original
const modelUrl = '/monster_model_optimized.glb';

export function Model(props: ThreeElements['group']) {
  const { scene } = useGLTF(modelUrl);
  const group = useRef<THREE.Group>(null);

  // Add a slow, subtle rotation to make it feel alive
  // The offset (Math.PI) ensures the model starts facing the camera
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.PI + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Traverse the scene to ensure materials look good in our lighting
  React.useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload(modelUrl);
