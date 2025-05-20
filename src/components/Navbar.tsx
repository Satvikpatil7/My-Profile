
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from "@/components/ui/toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-lg py-3 shadow-lg' : 'bg-transparent py-5'} ${isDarkMode ? 'bg-background/80' : 'bg-white/80'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold gradient-text">Satvik Patil</a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className={`text-sm hover:text-accent transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {link.name}
            </a>
          ))}
          
          <Toggle 
            className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            pressed={!isDarkMode}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Toggle>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-accent hover:bg-accent/20 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            <a href="mailto:7satvikpatil@gmail.com" className={isDarkMode ? 'text-white' : 'text-gray-800'}>Contact Me</a>
          </Button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Toggle 
            className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            pressed={!isDarkMode}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Toggle>
          
          <button 
            className="focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 shadow-lg animate-fade-in ${isDarkMode ? 'bg-background/95' : 'bg-white/95'} backdrop-blur-lg`}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className={`py-2 hover:text-accent transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <Button 
              variant="outline" 
              className={`border-accent hover:bg-accent/20 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              <a href="mailto:7satvikpatil@gmail.com" className={isDarkMode ? 'text-white' : 'text-gray-800'}>Contact Me</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
