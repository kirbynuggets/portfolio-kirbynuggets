// Dock.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, Code, Github, Linkedin, Settings, Mail, User } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import Terminal as TerminalApp from '../Applications/Terminal/Terminal';
import FileManager from '../Applications/FileManager/FileManager';
import './Dock.css';

const dockItems = [
  { 
    name: 'Terminal', 
    icon: Terminal, 
    action: 'terminal', 
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: TerminalApp 
  },
  { 
    name: 'Files', 
    icon: Folder, 
    action: 'files', 
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: FileManager 
  },
  { 
    name: 'VS Code', 
    icon: Code, 
    action: 'vscode', 
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: TerminalApp 
  },
  { 
    name: 'About', 
    icon: User, 
    action: 'about', 
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    component: TerminalApp 
  },
  { 
    name: 'GitHub', 
    icon: Github, 
    action: 'github', 
    gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    url: 'https://github.com/yourusername'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    action: 'linkedin', 
    gradient: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)',
    url: 'https://linkedin.com/in/yourprofile'
  },
  { 
    name: 'Contact', 
    icon: Mail, 
    action: 'contact', 
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: TerminalApp 
  },
  { 
    name: 'Settings', 
    icon: Settings, 
    action: 'settings', 
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: TerminalApp 
  },
];

const Dock = () => {
  const { openWindow } = useWindowStore();

  const handleIconClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.component) {
      openWindow({
        title: item.name,
        component: item.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
        size: { width: 800, height: 600 },
      });
    }
  };

  return (
    <motion.div 
      className="dock-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
    >
      <div className="dock-background">
        <div className="dock-blur"></div>
      </div>
      
      <div className="dock-items">
        {dockItems.map((item, index) => (
          <motion.div
            key={item.name}
            className="dock-item"
            style={{ '--gradient': item.gradient }}
            whileHover={{ 
              scale: 1.4, 
              y: -20,
              rotateY: 10,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17,
              duration: 0.3
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            onClick={() => handleIconClick(item)}
          >
            <div className="dock-item-icon">
              <item.icon className="icon" />
            </div>
            
            <div className="dock-item-glow"></div>
            
            <motion.div 
              className="dock-tooltip"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.div>
            
            {/* Active indicator */}
            <motion.div 
              className="dock-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: Math.random() > 0.7 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Dock reflection */}
      <div className="dock-reflection">
        {dockItems.map((item, index) => (
          <div key={`reflection-${item.name}`} className="dock-reflection-item">
            <item.icon className="reflection-icon" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;