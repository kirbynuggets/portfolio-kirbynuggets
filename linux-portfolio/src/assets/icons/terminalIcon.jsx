// src/assets/icons/TerminalIcon.jsx
import React from 'react';

const TerminalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <defs>
      <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d3748" />
        <stop offset="100%" stopColor="#1a202c" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
      </filter>
    </defs>
    <rect x="4" y="8" width="56" height="48" rx="4" fill="url(#terminalGradient)" filter="url(#shadow)"/>
    <rect x="8" y="12" width="48" height="40" rx="2" fill="#000000" opacity="0.8"/>
    <text x="12" y="28" fill="#00ff00" fontSize="8" fontFamily="monospace">$</text>
    <rect x="18" y="25" width="2" height="8" fill="#00ff00" opacity="0.8">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
    <text x="12" y="40" fill="#ffffff" fontSize="6" fontFamily="monospace">user@linux:~</text>
  </svg>
);

export default TerminalIcon;