// src/components/Icons/Icon.jsx
import React from 'react';

// Import your SVG icons
import GithubIcon from '../../assets/icons/github.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

// Since visual-studio-code.tsx is a React component, we'll handle it differently
// You might need to convert it to SVG or import it as a component

// Icon mapping object
const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  settings: SettingsIcon,
};

// Simple text-based fallbacks for icons you don't have as SVG
const textIcons = {
  terminal: '❯',
  grid: '⋮⋮⋮',
  code: '</>', // fallback for VS Code if needed
};

const Icon = ({ name, size = 24, className = '', style = {} }) => {
  const IconSvg = iconMap[name];
  const textIcon = textIcons[name];
  
  if (IconSvg) {
    return (
      <img
        src={IconSvg}
        alt={name}
        className={`svg-icon ${className}`}
        style={{
          width: size,
          height: size,
          filter: 'brightness(0) invert(1)', // Make SVGs white by default
          ...style
        }}
      />
    );
  }
  
  if (textIcon) {
    return (
      <span 
        className={`text-icon ${className}`}
        style={{
          fontSize: size * 0.8,
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          ...style
        }}
      >
        {textIcon}
      </span>
    );
  }
  
  // Ultimate fallback
  return (
    <div 
      className={`icon-fallback ${className}`}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.6,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        ...style
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Icon;