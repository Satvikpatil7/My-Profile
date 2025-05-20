
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    // Three.js setup
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    const scene = new THREE.Scene();
    
    // Responsive sizing
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 3;
    scene.add(camera);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add renderer to DOM
    currentMount.appendChild(renderer.domElement);
    
    // Create particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    // Create particles system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Handle window resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effects
    const mouse = {
      x: 0,
      y: 0,
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    });
    
    // Animation
    const animate = () => {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      // Follow mouse
      particles.rotation.y += mouse.x * 0.0003;
      particles.rotation.x += mouse.y * 0.0003;
      
      // Update material color based on theme
      particlesMaterial.color.set(isDarkMode ? 0x8566FF : 0x6F42C1);
      
      renderer.render(scene, camera);
    };
    
    // Start animation loop
    const animationId = window.requestAnimationFrame(function animateLoop() {
      animate();
      window.requestAnimationFrame(animateLoop);
    });
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationId);
      currentMount.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);
  
  return <div ref={mountRef} className="three-canvas" />;
};

export default ThreeBackground;
