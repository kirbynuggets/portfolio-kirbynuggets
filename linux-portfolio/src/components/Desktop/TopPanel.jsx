import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, User, ChevronDown } from 'lucide-react';
import './TopPanel.css';

const TopPanel = ({ toggleAppGrid }) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true };
      setDateTime(now.toLocaleString('en-US', options));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-panel">
      <div className="panel-left">
        <div className="activities-btn" onClick={toggleAppGrid}>
          Activities
        </div>
      </div>
      <div className="datetime">{dateTime}</div>
      <div className="panel-right">
        <div className="panel-indicator">
          <Wifi size={14} />
        </div>
        <div className="panel-indicator">
          <Battery size={14} />
        </div>
        <div className="panel-indicator">
          <Volume2 size={14} />
        </div>
        <div className="panel-indicator user-menu">
          <User size={14} />
          <ChevronDown size={12} />
        </div>
      </div>
    </div>
  );
};

export default TopPanel;

