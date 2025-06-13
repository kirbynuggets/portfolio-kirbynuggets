// src/components/Desktop/Wallpaper.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Wallpaper.css';

const wallpapers = [
  {
    id: 1,
    name: 'Linux Abstract',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    description: 'Modern Linux-inspired abstract design'
  },
  {
    id: 2,
    name: 'Code Matrix',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop',
    description: 'Digital code background'
  },
  {
    id: 3,
    name: 'Terminal Dark',
    url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1920&h=1080&fit=crop',
    description: 'Dark terminal aesthetic'
  },
  {
    id: 4,
    name: 'Ubuntu Orange',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&h=1080&fit=crop',
    description: 'Ubuntu-inspired orange theme'
  },
  {
    id: 5,
    name: 'Circuit Board',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    description: 'Electronic circuit patterns'
  }
];

export const Wallpaper = () => {
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const nextWallpaper = () => {
    setCurrentWallpaper((prev) => (prev + 1) % wallpapers.length);
  };

  const prevWallpaper = () => {
    setCurrentWallpaper((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
  };

  return (
    <div 
      className="wallpaper-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWallpaper}
          className="wallpaper-image"
          style={{
            backgroundImage: `url(${wallpapers[currentWallpaper].url})`
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dark overlay for better readability */}
      <div className="wallpaper-overlay" />

      {/* Wallpaper Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="wallpaper-controls"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="controls-content">
              <button
                onClick={prevWallpaper}
                className="control-button"
              >
                <ChevronLeft className="control-icon" />
              </button>
              
              <div className="wallpaper-info">
                <div className="wallpaper-name">{wallpapers[currentWallpaper].name}</div>
                <div className="wallpaper-counter">{currentWallpaper + 1} of {wallpapers.length}</div>
              </div>
              
              <button
                onClick={nextWallpaper}
                className="control-button"
              >
                <ChevronRight className="control-icon" />
              </button>
            </div>
            
            {/* Wallpaper thumbnails */}
            <div className="wallpaper-thumbnails">
              {wallpapers.map((wallpaper, index) => (
                <button
                  key={wallpaper.id}
                  onClick={() => setCurrentWallpaper(index)}
                  className={`thumbnail-dot ${index === currentWallpaper ? 'active' : ''}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle animated overlay for Linux feel */}
      <div className="linux-overlay">
        <motion.div
          className="gradient-overlay"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />
      </div>
    </div>
  );
};