
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  github: string | null;
  live: string | null;
  tags: string[];
}

const ProjectCard = ({ title, description, image, github, live, tags }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden h-full bg-black/40 backdrop-blur-sm border-gray-800 project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 animate-fade-in">
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
              >
                <Github size={20} />
              </a>
            )}
            
            {live && (
              <a 
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
