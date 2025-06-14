import React from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Code, Github, Linkedin, Settings, Briefcase, Th, Folder } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import FileManager from '../Applications/FileManager/FileManager';
import './Dock.css';

const Dock = ({ toggleAppGrid }) => {
  const { openWindow, windows } = useWindowStore();

  const isActive = (name) => windows.some((w) => w.title === name && !w.isMinimized);

  const dockItems = [
    {
      name: 'Terminal',
      icon: TerminalIcon,
      action: 'terminal',
      className: 'terminal-app-icon',
      component: TerminalApp,
    },
    {
      name: 'File Manager',
      icon: Folder,
      action: 'filemanager',
      className: 'file-manager-app-icon',
      component: FileManager,
    },
    {
      name: 'VS Code',
      icon: Code,
      action: 'code',
      className: 'code-app-icon',
      component: () => <div>VS Code Placeholder</div>,
    },
    {
      name: 'GitHub',
      icon: Github,
      action: 'external',
      className: 'github-app-icon',
      link: 'https://github.com/your-username',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: 'external',
      className: 'linkedin-app-icon',
      link: 'https://linkedin.com/in/your-profile',
    },
    {
      name: 'Settings',
      icon: Settings,
      action: 'settings',
      className: 'settings-app-icon',
      component: () => <div>Settings Placeholder</div>,
    },
    {
      name: 'Portfolio',
      icon: Briefcase,
      action: 'portfolio',
      className: 'portfolio-app-icon',
      component: () => <div>Portfolio Placeholder</div>,
    },
    {
      name: 'App Grid',
      icon: Th,
      action: 'appgrid',
      className: 'grid-icon',
      onClick: toggleAppGrid,
    },
  ];

  const handleClick = (item) => {
    if (item.action === 'external' && item.link) {
      window.open(item.link, '_blank');
    } else if (item.action === 'appgrid') {
      item.onClick();
    } else if (item.component) {
      openWindow({
        title: item.name,
        component: item.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
        size: { width: 600, height: 400 },
        zIndex: 100,
      });
    }
  };

  return (
    <motion.div className="dock">
      {dockItems.map((item, index) => (
        <React.Fragment key={item.name}>
          {item.name === 'App Grid' && <div className="dock-separator"></div>}
          <motion.button
            className={`dock-icon ${item.className} ${isActive(item.name) ? 'active' : ''}`}
            onClick={() => handleClick(item)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={item.name}
          >
            <item.icon size={24} />
          </motion.button>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default Dock;