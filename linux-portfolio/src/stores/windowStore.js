
import { create } from 'zustand';

export const useWindowStore = create((set, get) => ({
  windows: [],
  activeWindow: null,
  
  openWindow: (windowConfig) => {
    const newWindow = {
      id: Date.now().toString(),
      ...windowConfig,
      zIndex: Math.max(...get().windows.map(w => w.zIndex || 0), 0) + 1,
    };
    
    set((state) => ({
      windows: [...state.windows, newWindow],
      activeWindow: newWindow.id,
    }));
  },
  
  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    }));
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }));
  },
  
  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },
  
  focusWindow: (id) => {
    set((state) => ({
      activeWindow: id,
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex: Math.max(...state.windows.map(win => win.zIndex || 0)) + 1 } : w
      ),
    }));
  },
}));