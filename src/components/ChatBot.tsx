
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send, X } from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm Satvik's assistant. How can I help you?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "Hi, I am Satvik. The chatbot is not fully completed yet. If you want to talk to me, please send me an email.";
      
      // Simple bot responses based on keywords
      if (input.toLowerCase().includes('contact')) {
        response = "You can contact Satvik at 7satvikpatil@gmail.com";
      } else if (input.toLowerCase().includes('project') || input.toLowerCase().includes('work')) {
        response = "Check out Satvik's GitHub for his latest projects: https://github.com/Satvikpatil7";
      } else if (input.toLowerCase().includes('skills') || input.toLowerCase().includes('experience')) {
        response = "Satvik is skilled in JavaScript, React, Redux, Tailwind CSS, and has experience with AWS and Azure.";
      }
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);
    
    setInput('');
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
        <Card ref={chatRef} className="w-80 md:w-96 h-96 flex flex-col bg-background border border-gray-800 shadow-xl">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-accent/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h3 className="font-medium">Chat with Satvik's Bot</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X size={18} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`${
                  msg.isBot 
                  ? "bg-accent/20 text-white rounded-tr-xl rounded-bl-xl rounded-br-xl ml-0 mr-8" 
                  : "bg-gray-800 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl ml-8 mr-0"
                } px-4 py-2 max-w-[80%] ${msg.isBot ? "self-start" : "self-end ml-auto"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Button type="submit" size="icon" className="bg-accent hover:bg-accent/80">
              <Send size={18} />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
