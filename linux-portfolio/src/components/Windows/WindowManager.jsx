import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Window } from './Window';
import './WindowManager.css';

export const WindowManager = () => {
  const { windows } = useWindowStore();

  return (
    <div className="window-manager">
      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            component={window.component}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};