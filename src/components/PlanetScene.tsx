
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Layout, Cloud, Square, SquareCode } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Category types for classification
type CategoryType = 'web' | 'cloud' | 'ui-ux' | 'code';

const PlanetScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [isScrollRotationEnabled, setIsScrollRotationEnabled] = useState(true);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
  useEffect(() => {
    // Three.js setup
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x000000 : 0x101020, 0.00025);
    
    // Responsive sizing
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 15;
    scene.add(camera);
    
    // Renderer with better rendering quality
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add renderer to DOM
    currentMount.appendChild(renderer.domElement);

    // Create enhanced starfield (background particles)
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
      const nearStars = createStarLayer(3000, 1.5, 150, new THREE.Color(isDarkMode ? 0xFFFFFF : 0xFFFFFF));
      const midStars = createStarLayer(5000, 1.0, 300, new THREE.Color(isDarkMode ? 0xCCCCFF : 0xFFFFFF));
      const farStars = createStarLayer(8000, 0.8, 500, new THREE.Color(isDarkMode ? 0xAABBFF : 0xDDDDFF));
      
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
          opacity: 0.2,
          color: color,
          blending: THREE.AdditiveBlending
        });
        
        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);
        
        return { nebula, nebulaGeometry, nebulaMaterial };
      };
      
      // Create several nebulae at different positions
      const nebula1 = createNebula(new THREE.Vector3(50, 20, -100), 30, new THREE.Color(0x8844FF));
      const nebula2 = createNebula(new THREE.Vector3(-70, -40, -150), 40, new THREE.Color(0xFF4488));
      const nebula3 = createNebula(new THREE.Vector3(0, -100, -200), 50, new THREE.Color(0x44BBFF));
      
      return { 
        nearStars, midStars, farStars,
        nebula1, nebula2, nebula3
      };
    };
    
    const starfield = createStarfield();

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x101010 : 0x303050, 1.5);
    scene.add(ambientLight);
    
    // Distant point lights to create colored highlights
    const createDistantLight = (position: THREE.Vector3, color: THREE.Color, intensity: number) => {
      const light = new THREE.PointLight(color, intensity, 400);
      light.position.copy(position);
      scene.add(light);
      return light;
    };
    
    const blueLight = createDistantLight(new THREE.Vector3(100, 30, -50), new THREE.Color(0x0044FF), 3);
    const purpleLight = createDistantLight(new THREE.Vector3(-120, -50, -100), new THREE.Color(0xFF00FF), 2);
    const yellowLight = createDistantLight(new THREE.Vector3(50, -100, 80), new THREE.Color(0xFFAA00), 1.5);
    
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
    
    // Set initial scroll-based rotation
    if (isScrollRotationEnabled) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress * Math.PI * 2; // Convert progress to radians (0 - 2π)
          
          // Rotate star layers at different speeds based on scroll position
          if (starfield.nearStars.stars) {
            starfield.nearStars.stars.rotation.y = progress * 0.1;
            starfield.midStars.stars.rotation.y = progress * 0.05;
            starfield.farStars.stars.rotation.y = progress * 0.02;
          }
          
          // Move camera slightly based on scroll
          gsap.to(camera.position, {
            x: Math.sin(progress) * 2,
            y: Math.cos(progress) * 2,
            duration: 0.5,
            ease: "power1.out"
          });
        }
      });
    }
    
    // Animation loop
    const animate = () => {
      // Subtle constant rotation for stars if scroll rotation is disabled
      if (!isScrollRotationEnabled) {
        starfield.nearStars.stars.rotation.y += 0.0005;
        starfield.midStars.stars.rotation.y += 0.0002;
        starfield.farStars.stars.rotation.y += 0.0001;
        
        starfield.nebula1.nebula.rotation.y += 0.0002;
        starfield.nebula2.nebula.rotation.y += 0.0001;
        starfield.nebula3.nebula.rotation.y += 0.0003;
      }
      
      // Subtle pulsing for nebulae
      const time = Date.now() * 0.0005;
      starfield.nebula1.nebulaMaterial.opacity = 0.2 + Math.sin(time * 0.7) * 0.1;
      starfield.nebula2.nebulaMaterial.opacity = 0.2 + Math.sin(time * 1.3) * 0.1;
      starfield.nebula3.nebulaMaterial.opacity = 0.2 + Math.sin(time) * 0.1;
      
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
      
      // Dispose all geometries and materials to prevent memory leaks
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
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isDarkMode, isScrollRotationEnabled]);
  
  // Define items for classification
  const items = [
    { id: 1, name: 'Responsive Design', category: 'web' },
    { id: 2, name: 'API Integration', category: 'web' },
    { id: 3, name: 'AWS Services', category: 'cloud' },
    { id: 4, name: 'User Research', category: 'ui-ux' },
    { id: 5, name: 'Azure Functions', category: 'cloud' },
    { id: 6, name: 'Color Theory', category: 'ui-ux' },
    { id: 7, name: 'Frontend Development', category: 'web' },
    { id: 8, name: 'Serverless Architecture', category: 'cloud' },
    { id: 9, name: 'React Components', category: 'code' },
    { id: 10, name: 'TypeScript', category: 'code' },
    { id: 11, name: 'User Testing', category: 'ui-ux' },
    { id: 12, name: 'Docker Containers', category: 'cloud' },
  ];
  
  // Organize items by category
  const categorizedItems = {
    web: items.filter(item => item.category === 'web'),
    cloud: items.filter(item => item.category === 'cloud'),
    'ui-ux': items.filter(item => item.category === 'ui-ux'),
    code: items.filter(item => item.category === 'code'),
  };
  
  // Toggle scroll-based rotation
  const handleToggleScrollRotation = () => {
    setIsScrollRotationEnabled(prev => !prev);
  };
  
  // Toggle category menu
  const handleToggleCategory = () => {
    setShowCategoryMenu(prev => !prev);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Three.js canvas container */}
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Astronaut message */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="glass py-3 px-6 max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-2">Space Station Log</h2>
          <p className="text-sm">Day 157: Observing the universe from our orbital position. The stars are particularly beautiful today.</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 glass p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <Switch 
            id="scroll-rotation"
            checked={isScrollRotationEnabled}
            onCheckedChange={handleToggleScrollRotation}
          />
          <Label htmlFor="scroll-rotation" className="text-foreground whitespace-nowrap">
            Scroll Rotation {isScrollRotationEnabled ? 'Enabled' : 'Disabled'}
          </Label>
        </div>
        
        <div className="relative">
          <Button 
            onClick={handleToggleCategory}
            className="flex items-center gap-2"
            variant="secondary"
          >
            <Layout size={16} />
            Categories
          </Button>
          
          {showCategoryMenu && (
            <div className="absolute bottom-full mb-2 left-0 w-64 glass p-4 space-y-4">
              <div className="flex flex-col space-y-3">
                <h3 className="font-medium text-lg border-b border-border pb-1">Categories</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <SquareCode size={16} className="text-blue-500" /> 
                      <span>Code</span>
                    </div>
                    <ul className="pl-6 space-y-1 text-sm">
                      {categorizedItems.code.map(item => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <Layout size={16} className="text-purple-500" /> 
                      <span>Web</span>
                    </div>
                    <ul className="pl-6 space-y-1 text-sm">
                      {categorizedItems.web.map(item => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <Cloud size={16} className="text-green-500" /> 
                      <span>Cloud</span>
                    </div>
                    <ul className="pl-6 space-y-1 text-sm">
                      {categorizedItems.cloud.map(item => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <Square size={16} className="text-yellow-500" /> 
                      <span>UI/UX</span>
                    </div>
                    <ul className="pl-6 space-y-1 text-sm">
                      {categorizedItems['ui-ux'].map(item => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetScene;
