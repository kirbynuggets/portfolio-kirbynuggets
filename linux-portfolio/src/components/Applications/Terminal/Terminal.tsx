// components/Applications/Terminal/Terminal.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
  help: () => 'Available commands: about, skills, projects, contact, resume, clear',
  about: () => 'Hi, I’m [Your Name], a full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about building user-friendly apps!',
  skills: () => 'React, TypeScript, JavaScript, Node.js, Python, Docker, AWS, MongoDB, PostgreSQL',
  projects: () => `1. [Project Name]: Built a [description]. Tech: [tech stack].\n2. [Project Name]: [description]. Tech: [tech stack].`,
  contact: () => 'Email: your.email@domain.com | LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername',
  resume: () => 'Opening resume... (download: yourwebsite.com/resume.pdf)',
  clear: () => { setHistory([]); return ''; }
};

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const output = commands[command as keyof typeof commands]?.() || `Command not found: ${cmd}`;
    
    if (command !== 'clear') {
      setHistory(prev => [...prev, `$ ${cmd}`, output]);
    }
    setInput('');
  };

  return (
    <motion.div 
      className="bg-gray-900 text-green-400 p-4 font-mono text-sm h-full overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-4">
        <div className="text-purple-400">Welcome to AryanOS v2.0</div>
        <div className="text-gray-400">Type 'help' for available commands</div>
      </div>
      
      {history.map((line, i) => (
        <div key={i} className={line.startsWith('$') ? 'text-green-400' : 'text-gray-300'}>
          {line}
        </div>
      ))}
      
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          className="bg-transparent outline-none flex-1 text-white"
          autoFocus
        />
      </div>
    </motion.div>
  );
};