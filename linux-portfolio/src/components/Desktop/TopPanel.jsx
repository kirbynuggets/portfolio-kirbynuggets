import React, { useState, useEffect } from 'react';
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
          <i className="fas fa-wifi"></i>
        </div>
        <div className="panel-indicator">
          <i className="fas fa-battery"></i>
        </div>
        <div className="panel-indicator">
          <i className="fas fa-volume-high"></i>
        </div>
        <div className="panel-indicator user-menu">
          <i className="fas fa-user"></i>
          "}
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
    </div>
  );
};

export default TopPanel;