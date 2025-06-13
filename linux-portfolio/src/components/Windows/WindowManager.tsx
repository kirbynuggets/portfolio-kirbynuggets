import { useWindowStore } from '../../stores/windowStore';
import { Window } from './Window'; // ← MISSING IMPORT

export const WindowManager = () => {
  const { windows, activeWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowStore();

  return (
    <div className="absolute inset-0">
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
          isActive={window.id === activeWindow}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
        />
      ))}
    </div>
  );
};