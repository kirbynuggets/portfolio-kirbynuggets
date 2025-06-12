// src/components/Desktop/Dock.tsx
import { motion } from 'framer-motion';
import { Terminal, Folder, Code, Github, Linkedin, Settings } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import { FileManager } from '../Applications/FileManager/FileManager';

const dockItems = [
  { name: 'Terminal', icon: Terminal, action: 'terminal', color: 'bg-gray-800', component: TerminalApp },
  { name: 'Files', icon: Folder, action: 'files', color: 'bg-blue-600', component: FileManager },
  { name: 'VS Code', icon: Code, action: 'vscode', color: 'bg-blue-500', component: TerminalApp },
  { name: 'GitHub', icon: Github, action: 'github', color: 'bg-gray-900', component: TerminalApp },
  { name: 'LinkedIn', icon: Linkedin, action: 'linkedin', color: 'bg-blue-700', component: TerminalApp },
  { name: 'Settings', icon: Settings, action: 'settings', color: 'bg-gray-600', component: TerminalApp },
];

export const Dock = () => {
  const { openWindow } = useWindowStore();

  const handleIconClick = (item: typeof dockItems[0]) => {
    openWindow({
      title: item.name,
      component: item.component,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 },
    });
  };

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-md rounded-2xl p-2 border border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        {dockItems.map((item, index) => (
          <motion.div
            key={item.name}
            className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center cursor-pointer relative group`}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => handleIconClick(item)}
          >
            <item.icon className="w-6 h-6 text-white" />
            <span className="absolute bottom-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};