import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Wallpaper = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [theme, setTheme] = useState<'particles' | 'gradient'>('particles');

  useEffect(() => {
    if (theme === 'particles') {
      const generateParticles = () => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }));
        setParticles(newParticles);
      };

      generateParticles();
      window.addEventListener('resize', generateParticles);
      return () => window.removeEventListener('resize', generateParticles);
    } else {
      setParticles([]);
    }
  }, [theme]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {theme === 'gradient' ? (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900" />
      ) : (
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ x: particle.x, y: particle.y }}
            animate={{
              x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 100,
              y: particle.y + Math.cos(Date.now() * 0.001 + particle.id) * 100,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))
      )}
      {/* Temporary theme toggle button */}
      <button
        className="absolute top-4 right-4 bg-black/20 text-white px-2 py-1 rounded"
        onClick={() => setTheme(theme === 'particles' ? 'gradient' : 'particles')}
      >
        Toggle Theme
      </button>
    </div>
  );
};