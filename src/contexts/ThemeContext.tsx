
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage or system preference on initial load
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      // If no stored preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
    
    // Apply theme to document
    applyTheme(storedTheme === "dark" || storedTheme === null);
  }, []);
  
  const applyTheme = (darkMode: boolean) => {
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.remove("light-mode");
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
      root.classList.add("light-mode");
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    
    // Apply theme class immediately to prevent flicker
    applyTheme(newDarkMode);

    // Enhanced theme transition animation with cosmic feel
    const timeline = gsap.timeline();
    
    // Create celestial transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 pointer-events-none z-[9999]';
    overlay.style.backgroundColor = newDarkMode ? '#000' : '#fff';
    overlay.style.opacity = '0';
    
    // Add star-like particles for transition
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none z-[10000]';
    
    // Create multiple star particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = newDarkMode ? '#fff' : '#333';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(overlay);
    document.body.appendChild(particlesContainer);
    
    // Animate particles
    gsap.to(particlesContainer.children, {
      opacity: 0.8,
      stagger: 0.01,
      duration: 0.3,
    });
    
    // Fade in overlay with celestial glow
    timeline.to(overlay, {
      opacity: 0.4,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        // Update colors
        gsap.to("body", { 
          backgroundColor: newDarkMode ? "#080808" : "#f8f9fa",
          color: newDarkMode ? "#fff" : "#333",
          duration: 0.3, 
          ease: "power2.inOut" 
        });
      }
    });
    
    // Fade out overlay with cosmic feel
    timeline.to(overlay, {
      opacity: 0,
      duration: 0.4, 
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });
    
    // Animate particles out with a cosmic trail effect
    gsap.to(particlesContainer.children, {
      opacity: 0,
      y: newDarkMode ? -20 : 20,
      stagger: 0.02,
      delay: 0.5,
      duration: 0.5,
      onComplete: () => {
        document.body.removeChild(particlesContainer);
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
