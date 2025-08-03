import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-10 px-4 ${
        isDarkMode ? "border-t border-white/10" : "border-t border-black/10"
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Satvik Patil
            </h3>
            <p
              className={`${
                isDarkMode
                  ? "text-gray-400 text-justify"
                  : "text-gray-600 text-justify"
              } mb-4`}
            >
              Let’s team up to turn ideas into innovative solutions
            </p>
          </div>

          {/* Links section */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#about"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                About
              </a>
              <a
                href="#skills"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Projects
              </a>
              <a
                href="#experience"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Experience
              </a>
            </div>
          </div>

          {/* Contact section */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/satvikpatil/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Satvikpatil7"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/SatvikMPatil?s=09"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:7satvikpatil@gmail.com"
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <Mail size={20} />
              </a>
            </div>
            <p
              className={`mt-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              7satvikpatil@gmail.com
            </p>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 text-center text-sm ${
            isDarkMode
              ? "text-gray-500 border-t border-white/5"
              : "text-gray-500 border-t border-black/5"
          }`}
        >
         @Satvik Patil
        </div>
      </div>
    </footer>
  );
};

export default Footer;
