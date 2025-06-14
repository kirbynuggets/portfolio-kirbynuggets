import { create } from 'zustand';

export const useWindowStore = create((set) => ({
  windows: [],
  activeWindow: null,
  openWindow: (window) => set((state) => ({
    windows: [...state.windows, { ...window, id: Date.now() }],
    activeWindow: window.id
  })),
  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter((w) => w.id !== id),
    activeWindow: state.activeWindow === id ? null : state.activeWindow
  })),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, isMinimized: true } : w
    )
  })),
  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  })),
  focusWindow: (id) => set({ activeWindow: id })
}));