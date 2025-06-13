// Desktop.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopPanel from './TopPanel';
import Dock from './Dock';
import WindowManager from '../Windows/WindowManager';
import './Desktop.css';

const Desktop = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  return (
    <div
      className="desktop-container"
      onContextMenu={handleContextMenu}
      onClick={handleCloseMenu}
    >
      {/* Dynamic Background */}
      <div className="desktop-background">
        <div className="gradient-overlay"></div>
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-shape shape-${i + 1}`}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Animated Grid */}
        <div className="grid-pattern">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="grid-dot"
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <TopPanel />
      <WindowManager />
      <Dock />

      {/* Context Menu */}
      {contextMenu && (
        <motion.div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
        >
          <div className="context-menu-item">
            <span>New Folder</span>
          </div>
          <div className="context-menu-item">
            <span>Change Wallpaper</span>
          </div>
          <div className="context-menu-item">
            <span>Display Settings</span>
          </div>
          <div className="context-menu-divider"></div>
          <div className="context-menu-item">
            <span>Terminal</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Desktop;