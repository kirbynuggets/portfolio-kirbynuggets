// src/components/Windows/Window.jsx
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import { X, Minus, Square } from 'lucide-react';

export const Window = ({ 
  id, 
  title, 
  component: Component, 
  isMinimized, 
  isMaximized, 
  position, 
  size, 
  zIndex 
}) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindow } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentSize, setCurrentSize] = useState(size);
  const windowRef = useRef(null);
  const headerRef = useRef(null);

  const isActive = activeWindow === id;

  useEffect(() => {
    setCurrentPosition(position);
    setCurrentSize(size);
  }, [position, size]);

  const handleMouseDown = (e) => {
    if (e.target === headerRef.current || headerRef.current?.contains(e.target)) {
      setIsDragging(true);
      focusWindow(id);
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(40, e.clientY - dragOffset.y); // Prevent dragging above top panel
      
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleWindowClick = () => {
    if (!isActive) {
      focusWindow(id);
    }
  };

  if (isMinimized) {
    return null;
  }

  const windowStyles = isMaximized 
    ? {
        top: 40,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 110px)',
        zIndex
      }
    : {
        left: currentPosition.x,
        top: currentPosition.y,
        width: currentSize.width,
        height: currentSize.height,
        zIndex
      };

  return (
    <motion.div
      ref={windowRef}
      className={`window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={windowStyles}
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.3 
      }}
      onClick={handleWindowClick}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div ref={headerRef} className="window-header">
        <div className="window-title">
          <span>{title}</span>
        </div>
        
        <div className="window-controls">
          <button
            className="window-control-btn control-minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            title="Minimize"
          >
            <Minus size={8} style={{ opacity: 0 }} />
          </button>
          
          <button
            className="window-control-btn control-maximize"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(id);
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square size={8} style={{ opacity: 0 }} />
          </button>
          
          <button
            className="window-control-btn control-close"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            title="Close"
          >
            <X size={8} style={{ opacity: 0 }} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content">
        <Component />
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div className="window-resize-handle resize-handle-n" />
          <div className="window-resize-handle resize-handle-s" />
          <div className="window-resize-handle resize-handle-e" />
          <div className="window-resize-handle resize-handle-w" />
          <div className="window-resize-handle resize-handle-ne" />
          <div className="window-resize-handle resize-handle-nw" />
          <div className="window-resize-handle resize-handle-se" />
          <div className="window-resize-handle resize-handle-sw" />
        </>
      )}
    </motion.div>
  );
};