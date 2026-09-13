import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroMotionCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), new THREE.MeshBasicMaterial({ color: '#8c52ff', wireframe: true, transparent: true, opacity: 0.38 }));
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 1), new THREE.MeshBasicMaterial({ color: '#ff5757', transparent: true, opacity: 0.38 }));
    scene.add(mesh, core);
    const particles = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 120 }, () => (Math.random() - .5) * 8), 3)), new THREE.PointsMaterial({ color: '#8c52ff', size: .035, transparent: true, opacity: .65 }));
    scene.add(particles);

    const resize = () => { const { width, height } = container.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    resize(); window.addEventListener('resize', resize);
    let frame = 0;
    const animate = () => { frame = requestAnimationFrame(animate); mesh.rotation.x += .002; mesh.rotation.y += .004; core.rotation.x -= .003; core.rotation.y -= .005; particles.rotation.z += .0007; renderer.render(scene, camera); };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose(); core.geometry.dispose(); (core.material as THREE.Material).dispose(); particles.geometry.dispose(); (particles.material as THREE.Material).dispose(); container.removeChild(renderer.domElement); };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute right-[-7%] top-6 hidden h-[390px] w-[390px] opacity-80 lg:block" />;
}
