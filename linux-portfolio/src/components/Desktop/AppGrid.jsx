import { motion } from 'framer-motion';
import { Terminal, Code, Github, Linkedin, FileText, Settings } from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import { Terminal as TerminalApp } from '../Applications/Terminal/Terminal';
import './AppGrid.css';

const appItems = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    action: 'linkedin',
    href: 'https://linkedin.com/in/yourusername',
    bgColor: '#0A66C2',
  },
  {
    name: 'GitHub',
    icon: Github,
    action: 'github',
    href: 'https://github.com/yourusername',
    bgColor: '#18181B',
  },
  {
    name: 'Notes',
    icon: FileText,
    action: 'notes',
    component: TerminalApp,
    bgColor: '#FBBF24',
  },
  {
    name: 'Terminal',
    icon: Terminal,
    action: 'terminal',
    component: TerminalApp,
    bgColor: '#F28C38',
  },
  {
    name: 'VS Code',
    icon: Code,
    action: 'vscode',
    component: TerminalApp,
    bgColor: '#0284C7',
  },
  {
    name: 'Settings',
    icon: Settings,
    action: 'settings',
    component: TerminalApp,
    bgColor: '#6B7280',
  },
];

export const AppGrid = ({ onClose }) => {
  const { openWindow } = useWindowStore();

  const handleAppClick = (item) => {
    if (item.href) {
      window.open(item.href, '_blank');
    } else {
      openWindow({
        title: item.name,
        component: item.component,
        isMinimized: false,
        isMaximized: false,
        position: { x: 150, y: 100 },
        size: { width: 800, height: 500 },
      });
    }
    onClose();
  };

  return (
    <motion.div
      className="app-grid-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="app-grid-container">
        {appItems.map((item) => (
          <motion.div
            key={item.name}
            className="app-grid-item"
            style={{ backgroundColor: item.bgColor }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            onClick={() => handleAppClick(item)}
          >
            <item.icon className="app-grid-icon" />
            <span className="app-grid-label">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};