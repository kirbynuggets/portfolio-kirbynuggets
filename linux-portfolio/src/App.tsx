import Desktop  from './components/Desktop/Desktop';
import TopPanels from "./components/Desktop/TopPanel";
import Dock from "./components/Desktop/Dock";
import { WindowManager } from "./components/Windows/WindowManager";
import { Wallpaper } from "./components/Desktop/Wallpaper";
import { useState } from "react";

function App() {
  return (
    <div className="app">
      <Desktop />
    </div>
  );
}

export default App;