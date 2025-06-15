import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Github, Linkedin, Settings, Briefcase, User, Network, Mail, Folder } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import FileManager from '../Applications/FileManager/FileManager';
import './AppGrid.css';

const AppGrid = ({ isOpen, toggleAppGrid }) => {
  const { openWindow } = useWindowStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const apps = [
    {
      name: 'Terminal',
      icon: Terminal,
      category: 'development',
      className: 'terminal-app-icon',
      component: TerminalApp,
    },
    {
      name: 'File Manager',
      icon: Folder,
      category: 'development',
      className: 'file-manager-app-icon',
      component: FileManager,
    },
    {
      name: 'VS Code',
      icon: Code,
      category: 'development',
      className: 'code-app-icon',
      component: () => <div>VS Code Placeholder</div>,
    },
    {
      name: 'GitHub',
      icon: Github,
      category: 'development',
      className: 'github-app-icon',
      link: 'https://github.com/your-username',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      category: 'social',
      className: 'linkedin-app-icon',
      link: 'https://linkedin.com/in/your-profile',
    },
    {
      name: 'Settings',
      icon: Settings,
      category: 'system',
      className: 'settings-app-icon',
      component: () => <div>Settings Placeholder</div>,
    },
    {
      name: 'Portfolio',
      icon: Briefcase,
      category: 'development',
      className: 'portfolio-app-icon',
      component: () => <div>Portfolio Placeholder</div>,
    },
    {
      name: 'About Me',
      icon: User,
      category: 'development',
      className: 'about-app-icon',
      component: () => <div>About Me Placeholder</div>,
    },
    {
      name: 'Projects',
      icon: Network,
      category: 'development',
      className: 'projects-app-icon',
      component: () => <div>Projects Placeholder</div>,
    },
    {
      name: 'Contact',
      icon: Mail,
      category: 'social',
      className: 'contact-app-icon',
      component: () => <div>Contact Placeholder</div>,
    },
  ];

  const filteredApps = apps.filter(
    (app) =>
      (activeCategory === 'all' || app.category === activeCategory) &&
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppClick = (app) => {
    if (app.link) {
      window.open(app.link, '_blank');
    } else if (app.component) {
      openWindow({
        title: app.name,
        component: app.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
        size: { width: 600, height: 400 },
        zIndex: 100,
      });
      toggleAppGrid();
    }
  };

  return (
    <motion.div
      className={`app-grid-overlay ${isOpen ? 'active' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && toggleAppGrid()}
    >
      <div className="app-grid-header">
        <input
          type="text"
          className="app-search"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={isOpen}
        />
        <div className="app-categories">
          <div
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </div>
          <div
            className={`category-btn ${activeCategory === 'development' ? 'active' : ''}`}
            onClick={() => setActiveCategory('development')}
          >
            Development
          </div>
          <div
            className={`category-btn ${activeCategory === 'social' ? 'active' : ''}`}
            onClick={() => setActiveCategory('social')}
          >
            Social
          </div>
          <div
            className={`category-btn ${activeCategory === 'system' ? 'active' : ''}`}
            onClick={() => setActiveCategory('system')}
          >
            System
          </div>
        </div>
      </div>
      <div className="app-grid-container">
        <motion.div className="app-grid">
          {filteredApps.map((app) => (
            <motion.div
              key={app.name}
              className="grid-app"
              data-category={app.category}
              onClick={() => handleAppClick(app)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`grid-app-icon ${app.className}`}>
                <app.icon size={28} />
              </div>
              <div className="grid-app-name">{app.name}</div>
            </motion.div>
          ))}
        </motion.div>
        <div className="pagination-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppGrid;