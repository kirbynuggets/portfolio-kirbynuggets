// src/components/Applications/FileManager/FileManager.tsx
import { motion } from 'framer-motion';
import { Folder, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { useWindowStore } from '../../../stores/windowStore'; // Add this import

const portfolioItems = [
  { name: 'About Me', icon: FileText, type: 'file', action: 'about', content: 'Hi, I’m [Your Name], a developer with a passion for...' },
  { name: 'Projects', icon: Folder, type: 'folder', action: 'projects', content: 'My projects folder' },
  { name: 'Skills', icon: FileText, type: 'file', action: 'skills', content: 'React, TypeScript, Node.js, etc.' },
  { name: 'Resume', icon: FileText, type: 'file', action: 'resume', url: 'https://yourwebsite.com/resume.pdf' },
  { name: 'GitHub', icon: Github, type: 'link', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: Linkedin, type: 'link', url: 'https://linkedin.com/in/yourprofile' },
  { name: 'Contact', icon: Mail, type: 'file', action: 'contact', content: 'Email: your.email@domain.com' },
];

const ContentViewer = ({ content }: { content: string }) => <div className="p-4">{content}</div>;

export const FileManager = () => {
  const { openWindow } = useWindowStore(); // Move this inside the component

  const handleItemClick = (item: typeof portfolioItems[0]) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.content) {
      openWindow({
        title: item.name,
        component: () => <ContentViewer content={item.content} />,
        isMinimized: false,
        isMaximized: false,
        position: { x: 150, y: 150 },
        size: { width: 500, height: 300 },
      });
    }
  };

  return (
    <div className="bg-gray-50 h-full">
      <div className="bg-white border-b p-3">
        <h3 className="font-semibold text-gray-800">Portfolio</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleItemClick(item)} // Add the onClick handler here
            >
              <item.icon className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm text-gray-700 text-center">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};