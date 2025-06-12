import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, User } from 'lucide-react';

export const TopPanel = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-10 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50"
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <motion.button 
          className="text-white/90 hover:text-white px-3 py-1 rounded-lg hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Activities
        </motion.button>
        {isMenuOpen && (
          <motion.div
            className="absolute top-12 left-4 bg-black/30 backdrop-blur-md rounded-lg p-4 text-white w-48"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ul>
              <li className="py-1 hover:bg-white/10 rounded px-2 cursor-pointer">Search</li>
              <li className="py-1 hover:bg-white/10 rounded px-2 cursor-pointer">Apps</li>
              <li className="py-1 hover:bg-white/10 rounded px-2 cursor-pointer">Settings</li>
            </ul>
          </motion.div>
        )}
      </div>
      
      <div className="text-white/90 font-medium">
        {time.toLocaleString('en-US', { 
          weekday: 'short', 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })}
      </div>
      
      <div className="flex items-center gap-3">
        <Wifi className="w-4 h-4 text-white/80" />
        <Battery className="w-4 h-4 text-white/80" />
        <Volume2 className="w-4 h-4 text-white/80" />
        <User className="w-4 h-4 text-white/80" />
      </div>
    </motion.div>
  );
};