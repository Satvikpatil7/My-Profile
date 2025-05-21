import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, X } from "lucide-react";
import { gsap } from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm Satvik's assistant. How can I help you?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isBot: false }]);

    // Simulate bot response
    setTimeout(() => {
      let lowerInput = input.toLowerCase();
      let response =
        "Thanks for reaching out! I'll let Satvik know about your message.";

      // Simple bot responses based on keywords
      if (lowerInput.includes("contact")) {
        response = "You can contact Satvik at 7satvikpatil@gmail.com.";
      } else if (
        lowerInput.includes("project") ||
        lowerInput.includes("work")
      ) {
        response =
          "Check out Satvik's GitHub for his latest projects: https://github.com/Satvikpatil7";
      } else if (
        lowerInput.includes("skills") ||
        lowerInput.includes("experience")
      ) {
        response =
          "Satvik is skilled in JavaScript, React, Redux, Tailwind CSS, and has experience with AWS and Azure.";
      } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
        response = "Hello! 👋 How can I assist you today?";
      } else if (lowerInput === "ok") {
        response = "Alright!";
      } else if (lowerInput.includes("who is satvik")) {
        response =
          "Satvik is a passionate software developer focused on building modern web apps using React and cloud technologies.";
      } else if (
        lowerInput.includes("intern") ||
        lowerInput.includes("barracuda")
      ) {
        response =
          "Satvik worked as a Software Developer Intern at Barracuda Networks, gaining valuable industry experience.";
      } else if (
        lowerInput.includes("education") ||
        lowerInput.includes("be")
      ) {
        response =
          "Satvik is pursuing a Bachelor's degree (B.E.) in Computer Engineering.";
      }

      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {!isOpen ? (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-accent hover:bg-accent/80 text-white shadow-lg flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </Button>
      ) : (
        <Card
          ref={chatRef}
          className={`w-80 md:w-96 h-96 flex flex-col shadow-xl ${
            isDarkMode
              ? "bg-background border-gray-800"
              : "bg-white border-gray-300"
          }`}
        >
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isDarkMode
                ? "border-gray-800 bg-accent/20"
                : "border-gray-200 bg-accent/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h3
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Chat with Satvik's Bot
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="h-8 w-8"
            >
              <X
                size={18}
                className={isDarkMode ? "text-white" : "text-gray-800"}
              />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.isBot
                    ? isDarkMode
                      ? "bg-accent/20 text-white rounded-tr-xl rounded-bl-xl rounded-br-xl ml-0 mr-8"
                      : "bg-gray-200 text-gray-800 rounded-tr-xl rounded-bl-xl rounded-br-xl ml-0 mr-8"
                    : isDarkMode
                    ? "bg-gray-800 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl ml-8 mr-0"
                    : "bg-accent/20 text-gray-800 rounded-tl-xl rounded-bl-xl rounded-br-xl ml-8 mr-0"
                } px-4 py-2 max-w-[80%] ${
                  msg.isBot ? "self-start" : "self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className={`p-4 border-t flex gap-2 ${
              isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-1 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-700 text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-800"
              }`}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-accent hover:bg-accent/80"
            >
              <Send size={18} className="text-white" />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
