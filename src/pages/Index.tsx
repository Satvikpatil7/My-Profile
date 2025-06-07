import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SkillTag from "@/components/SkillTag";
import ChatBot from "@/components/ChatBot";
import SolarSystemBackground from "@/components/SolarSystemBackground";
import Footer from "@/components/Footer";

// Define project category type
type ProjectCategory = "all" | "web" | "cloud" | "ui-ux" | "design";

interface Project {
  title: string;
  description: string;
  image: string;
  github: string | null;
  live: string | null;
  tags: string[];
  category: ProjectCategory | ProjectCategory[];
}

const Index = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const chatBotRef = useRef<HTMLDivElement>(null);

  // Project category state
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  useEffect(() => {
    const sections = [aboutRef, skillsRef, projectsRef, experienceRef];

    // Header animation
    gsap.fromTo(
      headerRef.current?.querySelectorAll(".animate-on-load"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );

    // Sections animations
    sections.forEach((sectionRef) => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".gsap-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });

    // Chatbot animation
    gsap.fromTo(
      chatBotRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 2, ease: "back.out" }
    );
  }, []);

  const handleResumeClick = () => {
    window.open(
      "https://drive.google.com/file/d/1-wfrXElfDtxOP_rUFxaqz7liy0IC51MD/view?usp=sharing",
      "_blank"
    );
    toast({
      title: "Resume Opened",
      description: "Resume is opening in a new tab",
    });
  };

  const languageSkills = ["Java", "C", "Python", "C#", "JavaScript"];
  const frameworkSkills = [
    "React",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "Node.js",
  ];
  const toolsSkills = ["SQL", "Figma", "AWS", "Azure"];

  const projects: Project[] = [
    {
      title: "README Generator",
      description:
        "A tool to automatically generate professional README files for your projects.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      github: "https://github.com/Satvikpatil7/README-File-Generator",
      live: null,
      tags: ["Python"],
      category: "design",
    },
    {
      title: "AWS WAF Security (CloudDefender)",
      description:
        "Cloud security solution using AWS WAF for protecting web applications.",
      image: "https://cdn.wallpapersafari.com/30/59/JigpBb.jpg",
      github: "https://github.com/Satvikpatil7/CloudDefender",
      live: null,
      tags: ["AWS", "Security", "Cloud"],
      category: "cloud",
    },
    {
      title: "Vealthx Fintech",
      description:
        "Financial technology platform providing innovative solutions.",
      image:
        "https://i.pinimg.com/736x/9e/3b/a6/9e3ba64814687c57df6476362bfc88d0.jpg",
      github: null,
      live: "https://www.vealthx.com/",
      tags: ["Fintech", "Startup"],
      category: "web",
    },
    {
      title: "Crypto Site",
      description: "Cryptocurrency information and tracking platform.",
      image:
        "https://i.pinimg.com/736x/c3/c8/b5/c3c8b5db0add09dc0e5d41402f6cb0af.jpg",
      github: "https://github.com/Satvikpatil7/Crypto",
      live: "https://crypto-olive-xi.vercel.app/",
      tags: ["React", "Crypto API", "Frontend"],
      category: "web",
    },
    {
      title: "AI Agent (MERN)",
      description: "AI-powered agent built using the MERN stack.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      github: "https://github.com/Satvikpatil7/AI-Agent-in-MERN",
      live: null,
      tags: ["MERN", "AI", "Full Stack"],
      category: "web",
    },
    {
      title: "Nike UI",
      description: "Modern UI design for Nike e-commerce platform.",
      image:
        "https://i.pinimg.com/736x/9c/03/5c/9c035c7a57060378260f5c97375f4d88.jpg",
      github: null,
      live: "https://www.figma.com/proto/ItTHXjmF6Cqjq5nCoBY86Z/nike",
      tags: ["UI/UX", "Figma", "Design"],
      category: "ui-ux",
    },
    {
      title: "Logitech UI",
      description: "UI design for Logitech products showcase.",
      image:
        "https://i.pinimg.com/736x/04/cc/eb/04ccebef12d8f577d6fe5383631d504c.jpg",
      github: null,
      live: "https://www.figma.com/proto/GCLwLDKOQLfqgQm40eCKQs/LOGITECH",
      tags: ["UI/UX", "Figma", "Design"],
      category: "ui-ux",
    },
    {
      title: "DSA Checkbox App",
      description:
        "Application showcasing category tree implementation with checkboxes.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      github: "https://github.com/Satvikpatil7/Category-Tree-Checkbox-App",
      live: "https://category-tree-checkbox-app.vercel.app/",
      tags: ["React", "Data Structures", "Recursion", "Tree"],
      category: "web",
    },
    {
      title: "Recipe Search",
      description: "Autocomplete component for searching recipes.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      github: "https://github.com/Satvikpatil7/Autocomplete-Component",
      live: "https://autocomplete-component-eosin.vercel.app/",
      tags: ["React", "API", "Frontend", "Debouncing", "Caching"],
      category: "web",
    },
  ];

  // Filter projects based on active category
  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "all" ||
      (Array.isArray(project.category)
        ? project.category.includes(activeCategory)
        : project.category === activeCategory)
  );

  // Category buttons data
  const categoryButtons = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "cloud", label: "Cloud" },
    { id: "ui-ux", label: "UI/UX" },
    { id: "design", label: "Python" },
  ];

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-white"
      } watermark animate-watermark-flow`}
    >
      <SolarSystemBackground />
      <Navbar />

      {/* Hero Section */}
      <section
        ref={headerRef}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-br from-purple-900/10 to-blue-900/10"
                : "bg-gradient-to-br from-purple-200/30 to-blue-200/30"
            } pointer-events-none`}
          ></div>
          <div
            className={`absolute inset-0 opacity-5 animate-watermark-flow watermark`}
          ></div>
        </div>

        <div className="container max-w-5xl z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text animate-on-load">
            Hello, I'm Satvik Patil
          </h1>
          <div className="h-1 w-20 bg-accent mx-auto mb-6 animate-on-load"></div>
          <p
            className={`text-xl md:text-2xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } animate-on-load`}
          >
            Code • Cloud • Create
          </p>

          <div className="flex justify-center gap-6 mb-12 animate-on-load">
            <a
              href="https://www.linkedin.com/in/satvikpatil/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/Satvikpatil7"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              <Github size={24} />
            </a>
            <a
              href="https://leetcode.com/u/satvikmpatil/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              <span className="text-xl font-bold">LC</span>
            </a>
            <a
              href="https://x.com/SatvikMPatil?s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              <X size={24} />
            </a>
            <a
              href="mailto:7satvikpatil@gmail.com"
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              <Mail size={24} />
            </a>
          </div>

          <Button
            onClick={handleResumeClick}
            variant="outline"
            className={`border-accent ${
              isDarkMode
                ? "text-white hover:bg-accent/20"
                : "text-gray-800 hover:bg-accent/10"
            } animate-on-load`}
          >
            Download Resume
          </Button>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L12 19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text gsap-reveal">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="gsap-reveal">
              <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                <img
                  src="/lovable-uploads/7466ef0f-fc53-4f03-a0d6-1296bf6762fd.png"
                  alt="Satvik Patil"
                  className="w-full h-full object-cover  transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-accent rounded-full p-2">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png"
                    alt="Finlon logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="glass p-8 gsap-reveal">
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Aspiring Developer
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                I'm a passionate software engineer with strong fundamentals in
                DSA, DBMS, OS, CN, and OOPs. I've solved 150+ problems on
                LeetCode and have solid skills in web development using
                JavaScript, React, Redux, Tailwind CSS, SQL, AWS, and Azure. I
                love building efficient and user-friendly web applications.
              </p>
              <div className="border-l-4 border-accent pl-4 py-2">
                <p className="text-gray-300 italic">
                  B.E. Computer Science, Basaveshwar Engineering College
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className={`py-20 px-4 ${isDarkMode ? "bg-black/20" : "bg-black/5"}`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text gsap-reveal">
            Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="glass p-6 gsap-reveal">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {languageSkills.map((skill, index) => (
                  <SkillTag key={index} name={skill} />
                ))}
              </div>
            </div>

            <div className="glass p-6 gsap-reveal">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {frameworkSkills.map((skill, index) => (
                  <SkillTag key={index} name={skill} />
                ))}
              </div>
            </div>

            <div className="glass p-6 gsap-reveal">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {toolsSkills.map((skill, index) => (
                  <SkillTag key={index} name={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text gsap-reveal">
            Projects
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 gsap-reveal">
            {categoryButtons.map((category) => (
              <Button
                key={category.id}
                onClick={() =>
                  setActiveCategory(category.id as ProjectCategory)
                }
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`
                  ${
                    activeCategory === category.id
                      ? "bg-accent hover:bg-accent/90"
                      : isDarkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } 
                  transition-all px-4 py-2 rounded-full
                `}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="gsap-reveal">
                <ProjectCard {...project} />
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={experienceRef}
        className={`py-20 px-4 ${isDarkMode ? "bg-black/20" : "bg-black/5"}`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text gsap-reveal">
            Experience
          </h2>

          <div className="max-w-3xl mx-auto glass p-8 gsap-reveal">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-white">
                Software Developer Intern
              </h3>
              <div className="md:ml-auto text-accent">Barracuda Networks</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="text-gray-400">Cybersecurity</div>
              <div className="md:ml-auto text-gray-400">Bengaluru</div>
            </div>

            <p className="text-gray-300 leading-relaxed text-justify">
              Contributed to full-stack development securing cloud data on OneDrive and SharePoint. Enhanced frontend using
React, Redux, and TypeScript to improve user experience and app performance. Developed a reusable C# API to
enable advanced report generation, boosting product functionality and modularity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Chat Bot */}
      <div ref={chatBotRef} className="fixed bottom-6 right-6 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
