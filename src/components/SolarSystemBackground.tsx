
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SolarSystemBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    // Three.js setup
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Responsive sizing
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 30;
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

    // Create stars (background particles)
    const createStarfield = () => {
      // Create multiple star layers for parallax effect
      const createStarLayer = (count: number, size: number, depth: number, color: THREE.Color) => {
        const starsGeometry = new THREE.BufferGeometry();
        const starsPositions = new Float32Array(count * 3);
        const starsSizes = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          starsPositions[i3] = (Math.random() - 0.5) * 300;
          starsPositions[i3 + 1] = (Math.random() - 0.5) * 300;
          starsPositions[i3 + 2] = (Math.random() - 0.5) * depth;
          
          // Vary star sizes
          starsSizes[i] = Math.random() * size + 0.5;
        }
        
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
        
        // Star shader material
        const starsMaterial = new THREE.PointsMaterial({
          size: 0.1,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.8,
          color: color,
          blending: THREE.AdditiveBlending,
        });
        
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);
        
        return { stars, starsGeometry, starsMaterial };
      };
    
      // Create different star layers with different properties
      const nearStars = createStarLayer(3000, 1.5, 150, new THREE.Color(isDarkMode ? 0xFFFFFF : 0x555555));
      const midStars = createStarLayer(5000, 1.0, 300, new THREE.Color(isDarkMode ? 0xCCCCFF : 0x444444));
      const farStars = createStarLayer(8000, 0.8, 500, new THREE.Color(isDarkMode ? 0xAABBFF : 0x333333));
      
      // Create a few colorful nebulae
      const createNebula = (position: THREE.Vector3, size: number, color: THREE.Color) => {
        const nebulaGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const nebulaPositions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          // Create cloud-like distribution
          const radius = size * (0.3 + 0.7 * Math.random());
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          nebulaPositions[i3] = position.x + radius * Math.sin(phi) * Math.cos(theta);
          nebulaPositions[i3 + 1] = position.y + radius * Math.sin(phi) * Math.sin(theta);
          nebulaPositions[i3 + 2] = position.z + radius * Math.cos(phi);
        }
        
        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
        
        const nebulaMaterial = new THREE.PointsMaterial({
          size: 0.5,
          transparent: true,
          opacity: isDarkMode ? 0.2 : 0.1,
          color: color,
          blending: THREE.AdditiveBlending
        });
        
        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);
        
        return { nebula, nebulaGeometry, nebulaMaterial };
      };
      
      // Create several nebulae at different positions with colors that work in both modes
      const nebula1 = createNebula(new THREE.Vector3(50, 20, -100), 30, new THREE.Color(isDarkMode ? 0x8844FF : 0x6633AA));
      const nebula2 = createNebula(new THREE.Vector3(-70, -40, -150), 40, new THREE.Color(isDarkMode ? 0xFF4488 : 0xAA3366));
      const nebula3 = createNebula(new THREE.Vector3(0, -100, -200), 50, new THREE.Color(isDarkMode ? 0x44BBFF : 0x3388AA));
      
      return { 
        nearStars, midStars, farStars,
        nebula1, nebula2, nebula3
      };
    };
    
    const starfield = createStarfield();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x404040 : 0x808080, isDarkMode ? 0.5 : 1.5);
    scene.add(ambientLight);
    
    // Add directional light (distant space light)
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(-20, 10, -20);
    scene.add(directionalLight);
    
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
    
    // System rotation state
    const rotationState = {
      systemRotation: 0,
    };

    // GSAP ScrollTrigger for space rotation
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const scrollDirection = self.direction;
        const scrollProgress = self.progress;
        
        // Rotate the entire scene based on scroll direction
        scene.rotation.y += scrollDirection * 0.01 * (isDarkMode ? 1 : -1);
        
        // Subtle camera movement based on scroll progress
        gsap.to(camera.position, {
          x: Math.sin(scrollProgress * Math.PI * 2) * 3,
          y: Math.cos(scrollProgress * Math.PI * 2) * 3,
          duration: 0.5,
          ease: "power1.out"
        });
        
        // Adjust ambient light based on scroll position for better visibility
        const lightIntensity = isDarkMode 
          ? 0.5 + scrollProgress * 0.3
          : 1.5 - scrollProgress * 0.3;
          
        ambientLight.intensity = lightIntensity;
      }
    });

    // Animation loop
    const animate = () => {
      // Subtle rotation for stars
      starfield.nearStars.stars.rotation.y += 0.0003;
      starfield.midStars.stars.rotation.y += 0.0002;
      starfield.farStars.stars.rotation.y += 0.0001;
      
      // Nebula animations
      starfield.nebula1.nebula.rotation.y += 0.0002;
      starfield.nebula2.nebula.rotation.y += 0.0001;
      starfield.nebula3.nebula.rotation.y += 0.0003;
      
      // Subtle pulsing for nebulae
      const time = Date.now() * 0.0005;
      starfield.nebula1.nebulaMaterial.opacity = (isDarkMode ? 0.2 : 0.1) + Math.sin(time * 0.7) * 0.1;
      starfield.nebula2.nebulaMaterial.opacity = (isDarkMode ? 0.2 : 0.1) + Math.sin(time * 1.3) * 0.1;
      starfield.nebula3.nebulaMaterial.opacity = (isDarkMode ? 0.2 : 0.1) + Math.sin(time) * 0.1;
      
      // Update colors if theme changes
      starfield.nearStars.starsMaterial.color.set(isDarkMode ? 0xffffff : 0x555555);
      starfield.midStars.starsMaterial.color.set(isDarkMode ? 0xCCCCFF : 0x444444);
      starfield.farStars.starsMaterial.color.set(isDarkMode ? 0xAABBFF : 0x333333);
      
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
      
      // Dispose all geometries and materials
      starfield.nearStars.starsGeometry.dispose();
      starfield.nearStars.starsMaterial.dispose();
      starfield.midStars.starsGeometry.dispose();
      starfield.midStars.starsMaterial.dispose();
      starfield.farStars.starsGeometry.dispose();
      starfield.farStars.starsMaterial.dispose();
      
      starfield.nebula1.nebulaGeometry.dispose();
      starfield.nebula1.nebulaMaterial.dispose();
      starfield.nebula2.nebulaGeometry.dispose();
      starfield.nebula2.nebulaMaterial.dispose();
      starfield.nebula3.nebulaGeometry.dispose();
      starfield.nebula3.nebulaMaterial.dispose();
      
      renderer.dispose();
      
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDarkMode]);
  
  return <div ref={mountRef} className="solar-system-canvas" />;
};

export default SolarSystemBackground;
