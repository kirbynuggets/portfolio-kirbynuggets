// src/components/Windows/Window.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface WindowProps {
  id: string;
  title: string;
  component: React.ComponentType;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isActive: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
}

export const Window = ({
  id,
  title,
  component: Component,
  isMinimized,
  isMaximized,
  position,
  size,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) => {
  const [pos, setPos] = useState(position);

  const handleDrag = (e: any, data: any) => {
    setPos({ x: data.x, y: data.y });
  };

  if (isMinimized) return null;

  return (
    <motion.div
      className={`absolute bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden ${
        isMaximized ? 'inset-0' : ''
      } ${isActive ? 'z-50' : ''}`}
      style={{
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
        zIndex,
        x: isMaximized ? 0 : pos.x,
        y: isMaximized ? 0 : pos.y,
      }}
      drag={!isMaximized}
      dragMomentum={false}
      onDragEnd={handleDrag}
      onClick={() => onFocus(id)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Window Header */}
      <div className="flex justify-between items-center p-2 bg-gray-900 border-b border-gray-700">
        <span className="text-white">{title}</span>
        <div className="flex gap-2">
          <button
            className="w-4 h-4 bg-yellow-500 rounded-full"
            onClick={() => onMinimize(id)}
          />
          <button
            className="w-4 h-4 bg-green-500 rounded-full"
            onClick={() => onMaximize(id)}
          />
          <button
            className="w-4 h-4 bg-red-500 rounded-full"
            onClick={() => onClose(id)}
          />
        </div>
      </div>
      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)]">
        <Component />
      </div>
    </motion.div>
  );
};