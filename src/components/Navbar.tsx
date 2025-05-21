
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "py-3" : "py-5"
    )}>
      <div className={cn(
        "container mx-auto glass px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-300",
        isScrolled ? "shadow-lg" : ""
      )}>
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold gradient-text">SP</Link>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
        </div>
        
        {/* Theme Toggle + Mobile Menu Buttons */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 px-4 py-6 rounded-xl shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#about" 
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
