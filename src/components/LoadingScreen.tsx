
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainerRef.current.appendChild(renderer.domElement);
    
    // Create animating particles 
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x8566FF,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create loading ring
    const ringGeometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8566FF,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);
    
    // GSAP animations for Three.js objects
    gsap.to(ring.rotation, { 
      duration: 2, 
      x: Math.PI * 2, 
      y: Math.PI, 
      repeat: -1, 
      ease: "power1.inOut" 
    });
    
    gsap.to(particlesMesh.rotation, { 
      duration: 10, 
      y: Math.PI * 2, 
      repeat: -1, 
      ease: "none" 
    });
    
    // Animation loop
    const animate = function () {
      renderer.render(scene, camera);
    };
    
    const animationId = requestAnimationFrame(function animateLoop() {
      animate();
      requestAnimationFrame(animateLoop);
    });
    
    // Main GSAP animation timeline
    const tl = gsap.timeline();
    
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    // Prepare exit animation
    const exitTl = gsap.timeline({ paused: true });
    exitTl.to(
      [textRef.current, ring.scale],
      { opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" }
    );
    exitTl.to(
      containerRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.in" },
      "-=0.3"
    );
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      if (threeContainerRef.current && renderer.domElement) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      
      exitTl.play();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="loading-container">
      <div className="relative z-10">
        <div ref={textRef} className="loading-content">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Satvik Patil
          </h1>
          <div className="loading-description text-xl md:text-2xl mb-2">
            <span className="text-accent animate-pulse inline-block">Developer</span>
            <span className="mx-2">|</span>
            <span className="text-gray-300">Designer</span>
            <span className="mx-2">|</span>
            <span className="text-gray-300">Creator</span>
          </div>
        </div>
      </div>
      <div ref={threeContainerRef} className="absolute inset-0"></div>
    </div>
  );
};

export default LoadingScreen;
