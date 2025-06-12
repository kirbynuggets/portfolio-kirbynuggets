import { motion } from 'framer-motion';
import { TopPanel } from './TopPanel';
import { Dock } from './Dock';
import { WindowManager } from '../Windows/WindowManager';
import { Wallpaper } from './Wallpaper';
import { useState } from 'react';

export const Desktop = () => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onContextMenu={handleContextMenu}
      onClick={handleCloseMenu}
    >
      <Wallpaper />
      <TopPanel />
      <WindowManager />
      <Dock />
      {contextMenu && (
        <motion.div
          className="absolute bg-black/30 backdrop-blur-md rounded-lg p-2 text-white w-48"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <ul>
            <li className="py-1 px-2 hover:bg-white/10 rounded cursor-pointer">New Folder</li>
            <li className="py-1 px-2 hover:bg-white/10 rounded cursor-pointer">Change Wallpaper</li>
            <li className="py-1 px-2 hover:bg-white/10 rounded cursor-pointer">Settings</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};