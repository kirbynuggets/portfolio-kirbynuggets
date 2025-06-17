import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopPanel from './TopPanel';
import { WindowManager } from '../Windows/WindowManager';
import Dock from './Dock';
import AppGrid from './AppGrid';
import { Wallpaper } from './Wallpaper';
import './Desktop.css';

const Desktop = () => {
  const [isAppGridOpen, setIsAppGridOpen] = useState(false);

  const toggleAppGrid = () => {
    setIsAppGridOpen((prev) => !prev);
  };

  return (
    <motion.div className="desktop">
      <Wallpaper />
      <TopPanel toggleAppGrid={toggleAppGrid} />
      <WindowManager />
      <Dock toggleAppGrid={toggleAppGrid} />
      <AppGrid isOpen={isAppGridOpen} toggleAppGrid={toggleAppGrid} />
    </motion.div>
  );
};

export default Desktop;