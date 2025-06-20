// src/components/Desktop/Dock.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import Icon from '../../../src/assets/icons/icon';
import './Dock.css';
import TerminalIcon from '../../assets/icons/TerminalIcon';


const Dock = ({ toggleAppGrid }) => {
  const { openWindow, windows } = useWindowStore();

  const isActive = (name) => windows.some((w) => w.title === name && !w.isMinimized);

  const dockItems = [
    {
      name: 'Terminal',
      icon: <TerminalIcon />, 
      action: 'terminal',
      className: 'terminal-app-icon',
      component: TerminalApp,
    },
    
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      action: 'external',
      className: 'linkedin-app-icon',
      link: 'https://linkedin.com/in/your-profile',
    },
    {
      name: 'Settings',
      icon: 'settings',
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
      name: 'GitHub',
      icon: 'github',
      action: 'external',
      className: 'github-app-icon',
      link: 'https://github.com/your-username',
    },
    {
      name: 'App Grid',
      icon: 'grid',
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
            {typeof item.icon === 'string' ? (
              <Icon name={item.icon} size={24} />
            ) : (
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
            )}
          </motion.button>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default Dock;