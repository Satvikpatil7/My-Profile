
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

    // Enhanced theme transition animation
    const timeline = gsap.timeline();
    
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 pointer-events-none z-[9999]';
    overlay.style.backgroundColor = newDarkMode ? '#000' : '#fff';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);
    
    // Fade in overlay
    timeline.to(overlay, {
      opacity: 0.3,
      duration: 0.2,
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
    
    // Fade out overlay
    timeline.to(overlay, {
      opacity: 0,
      duration: 0.4, 
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(overlay);
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
