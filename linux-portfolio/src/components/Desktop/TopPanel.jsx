// TopPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Volume2, User, Search, Grid3X3, Settings, Power, Sun, Moon, Bluetooth, Shield } from 'lucide-react';
import { AppGrid } from './AppGrid';
import './TopPanel.css';

const TopPanel = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [wifiStrength, setWifiStrength] = useState(3);
  const [volume, setVolume] = useState(65);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate dynamic system stats
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(15, Math.min(100, prev + (Math.random() - 0.5) * 3)));
      setWifiStrength(Math.floor(Math.random() * 4) + 1);
      setVolume(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: Search, label: 'Search Files', shortcut: 'Super+S', action: () => console.log('Search') },
    { icon: Grid3X3, label: 'Applications', shortcut: 'Super+A', action: () => setShowAppGrid(true) },
    { icon: Settings, label: 'System Settings', shortcut: 'Super+I', action: () => console.log('Settings') },
    { icon: isDarkMode ? Sun : Moon, label: isDarkMode ? 'Light Mode' : 'Dark Mode', shortcut: 'Super+T', action: () => setIsDarkMode(!isDarkMode) },
    { icon: Power, label: 'Power Options', shortcut: 'Ctrl+Alt+Del', action: () => console.log('Power') },
  ];

  const handleActivitiesClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item) => {
    item.action();
    setIsMenuOpen(false);
  };

  const getBatteryColor = () => {
    if (batteryLevel > 50) return '#10b981'; // green
    if (batteryLevel > 20) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getWifiBars = () => {
    return [...Array(4)].map((_, i) => (
      <div 
        key={i} 
        className={`wifi-bar ${i < wifiStrength ? 'active' : ''}`}
        style={{
          backgroundColor: i < wifiStrength ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
          height: `${(i + 1) * 3 + 2}px`,
          width: '2px',
          marginLeft: '1px',
          borderRadius: '1px',
          transition: 'all 0.3s ease'
        }}
      />
    ));
  };

  return (
    <>
      <motion.div 
        className="top-panel"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Panel Background with Blur Effect */}
        <div className="panel-background">
          <div className="panel-blur"></div>
          <div className="panel-gradient"></div>
        </div>

        {/* Left Section - Activities Button */}
        <div className="panel-left">
          <motion.button 
            className={`activities-button ${isMenuOpen ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleActivitiesClick}
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

          {/* Quick Menu Dropdown */}
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
                  <div className="menu-close" onClick={() => setIsMenuOpen(false)}>×</div>
                </div>
                <div className="menu-items">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="menu-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', x: 5 }}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      <item.icon className="menu-icon" />
                      <div className="menu-content">
                        <span className="menu-label">{item.label}</span>
                        <span className="menu-shortcut">{item.shortcut}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Section - Clock & Date */}
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
            {/* Security Indicator */}
            <motion.div 
              className="indicator security-indicator"
              whileHover={{ scale: 1.1 }}
              title="System Security Active"
            >
              <Shield className="indicator-icon" style={{ color: '#10b981' }} />
            </motion.div>

            {/* Bluetooth Indicator */}
            <motion.div 
              className="indicator bluetooth-indicator"
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsBluetoothOn(!isBluetoothOn)}
              title={`Bluetooth: ${isBluetoothOn ? 'On' : 'Off'}`}
            >
              <Bluetooth 
                className="indicator-icon" 
                style={{ color: isBluetoothOn ? '#3b82f6' : 'rgba(255, 255, 255, 0.4)' }} 
              />
            </motion.div>

            {/* Volume Indicator */}
            <motion.div 
              className="indicator volume-indicator"
              whileHover={{ scale: 1.1 }}
              title={`Volume: ${Math.round(volume)}%`}
            >
              <Volume2 className="indicator-icon" />
              <div className="volume-bar">
                <motion.div 
                  className="volume-fill"
                  animate={{ width: `${volume}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            
            {/* WiFi Indicator */}
            <motion.div 
              className="indicator wifi-indicator"
              whileHover={{ scale: 1.1 }}
              title={`WiFi Signal: ${wifiStrength}/4 - Connected`}
            >
              <Wifi className="indicator-icon" />
              <div className="wifi-bars">
                {getWifiBars()}
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
                      backgroundColor: getBatteryColor()
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="battery-tip"></div>
              </div>
              <span className="battery-percentage">{Math.round(batteryLevel)}%</span>
            </motion.div>

            {/* User Profile */}
            <motion.div 
              className="indicator user-indicator"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              title="User Profile"
            >
              <User className="indicator-icon" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* App Grid Overlay */}
      <AnimatePresence>
        {showAppGrid && (
          <AppGrid onClose={() => setShowAppGrid(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default TopPanel;