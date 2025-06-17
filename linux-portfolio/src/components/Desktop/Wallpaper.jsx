// src/components/Desktop/Wallpaper.jsx
import React from 'react';
import './Wallpaper.css';

export const Wallpaper = () => {
  return (
    <div className="wallpaper-container">
      <div
        className="wallpaper-image"
        style={{
          backgroundImage: `url(https://wallpapercave.com/wp/wp5156508.jpg)`
        }}
      />
      {/* Dark overlay for better readability */}
      <div className="wallpaper-overlay" />
    </div>
  );
};