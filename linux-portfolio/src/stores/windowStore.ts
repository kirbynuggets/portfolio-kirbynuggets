// src/stores/windowStore.ts
import { create } from 'zustand';

interface Window {
  id: string;
  title: string;
  component: React.ComponentType;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowStore {
  windows: Window[];
  activeWindow: string | null;
  openWindow: (window: Omit<Window, 'id' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindow: null,
  
  openWindow: (windowData) => {
    const id = `window-${Date.now()}`;
    const maxZ = Math.max(...get().windows.map(w => w.zIndex), 0);
    
    set(state => ({
      windows: [...state.windows, { ...windowData, id, zIndex: maxZ + 1 }],
      activeWindow: id
    }));
  },
  
  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindow: state.activeWindow === id ? null : state.activeWindow
    }));
  },
  
  minimizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }));
  },
  
  maximizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },
  
  focusWindow: (id) => {
    const maxZ = Math.max(...get().windows.map(w => w.zIndex), 0);
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      ),
      activeWindow: id,
    }));
  },
}));