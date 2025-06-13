// TopPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Volume2, User, Search, Grid3X3, Settings, Power } from 'lucide-react';
import './TopPanel.css';

const TopPanel = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [wifiStrength, setWifiStrength] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate dynamic battery and wifi
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev + (Math.random() - 0.5) * 5));
      setWifiStrength(Math.floor(Math.random() * 4) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: Search, label: 'Search', shortcut: 'Super' },
    { icon: Grid3X3, label: 'Applications', shortcut: 'Super+A' },
    { icon: Settings, label: 'Settings', shortcut: 'Super+I' },
    { icon: Power, label: 'Power Off', shortcut: 'Ctrl+Alt+Del' },
  ];

  return (
    <motion.div 
      className="top-panel"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="top-panel-background">
        <div className="panel-blur"></div>
        <div className="panel-gradient"></div>
      </div>

      {/* Left Section */}
      <div className="panel-left">
        <motion.button 
          className="activities-button"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.span
            animate={{ 
              color: isMenuOpen ? '#4facfe' : 'rgba(255, 255, 255, 0.9)',
            }}
            transition={{ duration: 0.2 }}
          >
            Activities
          </motion.span>
          <motion.div
            className="activities-indicator"
            animate={{ 
              scale: isMenuOpen ? 1 : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="activities-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="menu-header">
                <h3>Quick Actions</h3>
              </div>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="menu-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <item.icon className="menu-icon" />
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-shortcut">{item.shortcut}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Section - Clock */}
      <motion.div 
        className="panel-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="clock-container">
          <motion.div 
            className="clock-time"
            key={time.getMinutes()} // Re-animate on minute change
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {time.toLocaleString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </motion.div>
          <div className="clock-date">
            {time.toLocaleString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric'
            })}
          </div>
        </div>
      </motion.div>
      
      {/* Right Section - System Indicators */}
      <div className="panel-right">
        <div className="system-indicators">
          {/* Wifi Indicator */}
          <motion.div 
            className="indicator wifi-indicator"
            whileHover={{ scale: 1.1 }}
            title={`WiFi Signal: ${wifiStrength}/4`}
          >
            <Wifi className={`indicator-icon wifi-${wifiStrength}`} />
            <div className="wifi-bars">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`wifi-bar ${i < wifiStrength ? 'active' : ''}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Battery Indicator */}
          <motion.div 
            className="indicator battery-indicator"
            whileHover={{ scale: 1.1 }}
            title={`Battery: ${Math.round(batteryLevel)}%`}
          >
            <div className="battery-container">
              <div className="battery-body">
                <motion.div 
                  className="battery-fill"
                  animate={{ 
                    width: `${batteryLevel}%`,
                    backgroundColor: batteryLevel > 20 ? '#4ade80' : '#ef4444'
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="battery-tip"></div>
            </div>
            <span className="battery-percentage">{Math.round(batteryLevel)}%</span>
          </motion.div>
          
          {/* Volume Indicator */}