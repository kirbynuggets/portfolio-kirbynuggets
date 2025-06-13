// src/components/Applications/Terminal/Terminal.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Terminal.css';

const COMMANDS = {
  help: {
    description: 'Show available commands',
    execute: () => `Available commands:
  help     - Show this help message
  about    - About me
  skills   - My technical skills
  projects - My projects
  contact  - Contact information
  clear    - Clear terminal
  whoami   - Current user info
  ls       - List directory contents
  pwd      - Print working directory
  date     - Show current date and time
  uname    - System information
  history  - Command history
  echo     - Display text
  
Type any command followed by Enter.`
  },
  
  about: {
    description: 'About me',
    execute: () => `Hello! I'm a passionate Full Stack Developer 👨‍💻

🎯 Passionate about creating beautiful, functional web applications
🚀 Always learning new technologies and best practices
💡 Love turning ideas into reality through code
🌟 Focused on user experience and clean, maintainable code

Education: Computer Science Engineering
Location: Available for remote work worldwide
Experience: 3+ years in web development

"Code is like poetry - it should be elegant, readable, and powerful."`
  },
  
  skills: {
    description: 'Technical skills',
    execute: () => `Technical Skills:

Frontend:
  ⚛️  React.js, Next.js, Vue.js
  🎨  HTML5, CSS3, SASS, Tailwind CSS
  📱  Responsive Design, Mobile-First
  🔧  JavaScript (ES6+), TypeScript
  
Backend:
  🚀  Node.js, Express.js
  🐍  Python, Django, Flask
  ☕  Java, Spring Boot
  
Database:
  🗄️  MongoDB, PostgreSQL, MySQL
  📊  Redis, Firebase
  
DevOps & Tools:
  🐳  Docker, Kubernetes
  ☁️  AWS, Google Cloud, Azure
  🔧  Git, GitHub, GitLab
  🚀  CI/CD, Jenkins
  
Other:
  📡  RESTful APIs, GraphQL
  🧪  Testing (Jest, Cypress)
  🔍  SEO Optimization
  🎯  Agile/Scrum Methodology`
  },
  
  projects: {
    description: 'My projects',
    execute: () => `Recent Projects:

🌟 E-Commerce Platform
   • Full-stack React + Node.js application
   • Features: Cart, Payment, Admin Panel
   • Tech: React, Express, MongoDB, Stripe API
   
🎵 Music Streaming App
   • Spotify-like interface with custom features
   • Real-time audio streaming and playlists
   • Tech: React, Node.js, Socket.io, AWS S3
   
📱 Task Management System
   • Collaborative project management tool
   • Real-time updates and team collaboration
   • Tech: Next.js, PostgreSQL, Socket.io
   
🤖 AI Chat Application
   • Integration with OpenAI API
   • Custom chat interface and conversation history
   • Tech: React, Python, FastAPI, OpenAI
   
Visit my GitHub for more projects and code samples!`
  },
  
  contact: {
    description: 'Contact information',
    execute: () => `Contact Information:

📧 Email: your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐱 GitHub: github.com/yourusername
🌐 Portfolio: your-portfolio.com
📱 Phone: +1 (555) 123-4567

📍 Location: Available for remote work worldwide
🕒 Timezone: UTC-5 (EST)

💬 Feel free to reach out for:
   • Job opportunities
   • Collaboration projects
   • Technical discussions
   • Freelance work

"Let's build something amazing together!"`
  },
  
  whoami: {
    description: 'Current user info',
    execute: () => 'guest@portfolio-linux:~$'
  },
  
  ls: {
    description: 'List directory contents',
    execute: () => `total 8
drwxr-xr-x 2 guest guest 4096 Jun 13 08:30 Desktop
drwxr-xr-x 2 guest guest 4096 Jun 13 08:30 Documents
drwxr-xr-x 2 guest guest 4096 Jun 13 08:30 Downloads
drwxr-xr-x 2 guest guest 4096 Jun 13 08:30 Pictures
drwxr-xr-x 2 guest guest 4096 Jun 13 08:30 Projects
-rw-r--r-- 1 guest guest  220 Jun 13 08:30 README.txt`
  },
  
  pwd: {
    description: 'Print working directory',
    execute: () => '/home/guest'
  },
  
  date: {
    description: 'Show current date and time',
    execute: () => new Date().toString()
  },
  
  uname: {
    description: 'System information',
    execute: () => 'Linux portfolio-linux 5.15.0-generic #72-Ubuntu SMP x86_64 GNU/Linux'
  },
  
  clear: {
    description: 'Clear terminal',
    execute: 'clear'
  }
};

export const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Portfolio Linux Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    const baseCommand = args[0];
    
    if (baseCommand === 'clear') {
      setHistory([]);
      return;
    }
    
    if (baseCommand === 'echo') {
      return args.slice(1).join(' ');
    }
    
    if (baseCommand === 'history') {
      return commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
    }
    
    if (COMMANDS[baseCommand]) {
      return COMMANDS[baseCommand].execute();
    }
    
    return `bash: ${baseCommand}: command not found`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentInput.trim() === '') return;
    
    const command = currentInput.trim();
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Add command to history
    const newHistory = [
      ...history,
      { type: 'input', content: `guest@portfolio-linux:~$ ${command}` }
    ];
    
    // Execute command
    const output = executeCommand(command);
    
    if (output && output !== 'clear') {
      newHistory.push({ type: 'output', content: output });
    }
    
    setHistory(newHistory);
    setCurrentInput('');
    
    // Simulate typing effect for long outputs
    if (output && output.length > 100) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-container" onClick={handleTerminalClick}>
      <div className="terminal-header">
        <div className="terminal-title">
          <span className="terminal-icon">$</span>
          Terminal - guest@portfolio-linux: ~
        </div>
      </div>
      
      <div ref={terminalRef} className="terminal-content">
        {history.map((entry, index) => (
          <motion.div
            key={index}
            className={`terminal-line ${entry.type}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <pre className="terminal-text">{entry.content}</pre>
          </motion.div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="terminal-prompt">
            <span className="prompt-user">guest@portfolio-linux</span>
            <span className="prompt-separator">:</span>
            <span className="prompt-path">~</span>
            <span className="prompt-symbol">$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="terminal-cursor"></span>
        </form>
        
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};