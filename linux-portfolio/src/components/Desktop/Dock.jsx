import React from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import FileManager from '../Applications/FileManager/FileManager';
import './Dock.css';

// Try to import icons, with fallback
let Terminal, Code, Github, Linkedin, Settings, Briefcase, Grid3X3, Folder;
try {
  const icons = require('lucide-react');
  Terminal = icons.Terminal;
  Code = icons.Code;
  Github = icons.Github;
  Linkedin = icons.Linkedin;
  Settings = icons.Settings;
  Briefcase = icons.Briefcase;
  Grid3X3 = icons.Grid3X3;
  Folder = icons.Folder;
} catch (e) {
  console.log('Lucide React not available, using text fallbacks');
}

const Dock = ({ toggleAppGrid }) => {
  const { openWindow, windows } = useWindowStore();

  const isActive = (name) => windows.some((w) => w.title === name && !w.isMinimized);

  const dockItems = [
    {
      name: 'Terminal',
      icon: Terminal,
      fallback: 'T',
      action: 'terminal',
      className: 'terminal-app-icon',
      component: TerminalApp,
    },
    {
      name: 'File Manager',
      icon: Folder,
      fallback: 'F',
      action: 'filemanager',
      className: 'file-manager-app-icon',
      component: FileManager,
    },
    {
      name: 'VS Code',
      icon: Code,
      fallback: 'C',
      action: 'code',
      className: 'code-app-icon',
      component: () => (
        <div style={{padding: '20px', color: '#e0e0e0', fontFamily: 'monospace'}}>
          <h2>VS Code</h2>
          <p>Code editor coming soon...</p>
          <pre style={{marginTop: '20px', color: '#61dafb'}}>
{`function helloWorld() {
  console.log("Hello from VS Code!");
}`}
          </pre>
        </div>
      ),
    },
    {
      name: 'GitHub',
      icon: Github,
      fallback: 'G',
      action: 'external',
      className: 'github-app-icon',
      link: 'https://github.com/your-username',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      fallback: 'L',
      action: 'external',
      className: 'linkedin-app-icon',
      link: 'https://linkedin.com/in/your-profile',
    },
    {
      name: 'Settings',
      icon: Settings,
      fallback: 'S',
      action: 'settings',
      className: 'settings-app-icon',
      component: () => (
        <div style={{padding: '20px', color: '#e0e0e0'}}>
          <h2>Settings</h2>
          <p>System preferences and configurations</p>
        </div>
      ),
    },
    {
      name: 'Portfolio',
      icon: Briefcase,
      fallback: 'P',
      action: 'portfolio',
      className: 'portfolio-app-icon',
      component: () => (
        <div style={{padding: '20px', color: '#e0e0e0'}}>
          <h2>Portfolio</h2>
          <p>View my projects and experience</p>
        </div>
      ),
    },
    {
      name: 'App Grid',
      icon: Grid3X3,
      fallback: '⋮',
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
            {item.icon ? (
              <item.icon size={24} />
            ) : (
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                {item.fallback}
              </span>
            )}
          </motion.button>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default Dock;