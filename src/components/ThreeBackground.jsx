import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
    const mesh = useRef();
    const { mouse } = useThree();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 100 + Math.random() * 200;
            const speed = 0.005 + Math.random() / 500;
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;
            const size = 0.5 + Math.random() * 1.5;

            temp.push({ time, factor, speed, x, y, z, size });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            const t = (particle.time += particle.speed);
            const { factor, x, y, z, size } = particle;

            dummy.position.set(
                x + Math.cos(t) * factor,
                y + Math.sin(t) * factor,
                z + Math.cos(t) * factor
            );

            const s = size * (1 + Math.sin(t) * 0.5);
            dummy.scale.set(s, s, s);

            dummy.rotation.x = Math.sin(t / 10) * Math.PI;
            dummy.rotation.y = Math.cos(t / 10) * Math.PI;

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.2, 0.05);
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.2, 0.05);

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshPhongMaterial color="#8b5cf6" transparent opacity={0.6} shininess={100} />
        </instancedMesh>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-20 pointer-events-none opacity-40 dark:opacity-30">
            <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} intensity={1} />
                <Particles />
            </Canvas>
        </div>
    );
}
