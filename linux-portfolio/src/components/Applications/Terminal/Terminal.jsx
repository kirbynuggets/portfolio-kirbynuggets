/*import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Terminal.css';

const portfolioData = {
  about: "I'm a passionate developer with expertise in web technologies. I love building creative and interactive projects, often inspired by Linux and open-source culture.",
  skills: "Languages: JavaScript, Python, HTML, CSS\nFrameworks: React, Node.js\nTools: Git, Docker, Bash",
  projects: "1. Terminal Portfolio - A Linux-inspired portfolio (you’re using it!)\n2. Task Manager CLI - A command-line task manager built with Python\n3. Portfolio Desktop - A GNOME-style portfolio desktop",
  contact: "Email: yourname@example.com\nGitHub: github.com/your-username\nLinkedIn: linkedin.com/in/your-profile"
};

const COMMANDS = {
  help: {
    description: 'Show this help message',
    execute: () => `
Available Commands:
- <span class="command">whoami</span>: Display my name
- <span class="command">ls</span>: List portfolio sections
- <span class="command">cat [section].txt</span>: View section (e.g., cat about.txt)
- <span class="command">clear</span>: Clear the terminal
- <span class="command">help</span>: Show this help message
- <span class="command">exit</span>: Close the terminal
`
  },
  whoami: {
    description: 'Display my name',
    execute: () => 'Arya'
  },
  ls: {
    description: 'List portfolio sections',
    execute: () => 'about.txt  skills.txt  projects.txt  contact.txt'
  },
  cat: {
    description: 'View section',
    execute: (args) => {
      const file = args[0];
      if (!file || !file.endsWith('.txt')) {
        return `cat: Please specify a file (e.g., cat about.txt)`;
      }
      const section = file.replace('.txt', '').toLowerCase();
      return portfolioData[section] || `cat: ${file}: No such file`;
    }
  },
  clear: {
    description: 'Clear the terminal',
    execute: () => 'clear'
  },
  exit: {
    description: 'Close the terminal',
    execute: () => 'exit'
  }
};

export const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: `
<span class="ascii-art">
    _    ____  __   __    _    
   / \\  |  _ \\ \\ \\ / /   / \\   
  / _ \\ | |_) | \\ V /   / _ \\  
 / ___ \\|  _ <   | |   / ___ \\ 
/_/   \\_\\_| \\_\\  |_|  /_/   \\_\\
                              
 Welcome to My Terminal Portfolio!
</span>
<span class="output">Type <span class="command">help</span> to see available commands.</span>
` }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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

  const executeCommand = (command, args) => {
    if (command === 'clear') {
      setHistory([]);
      return;
    }
    if (command === 'exit') {
      const closeButton = document.querySelector(`.window-control-btn.control-close`);
      if (closeButton) closeButton.click();
      return;
    }
    if (COMMANDS[command]) {
      return COMMANDS[command].execute(args);
    }
    return `Command not found: ${command}. Type <span class="command">help</span> for available commands.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim() === '') return;

    const input = currentInput.trim().toLowerCase();
    const [cmd, ...args] = input.split(' ');
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: `<span class="prompt">kirbynuggets@portfolio:~$</span> <span class="command">${input}</span>` }
    ]);

    const output = executeCommand(cmd, args);
    if (output && output !== 'clear' && output !== 'exit') {
      setHistory((prev) => [...prev, { type: 'output', content: `<span class="output">${output}</span>` }]);
    }

    setCurrentInput('');
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
      <div ref={terminalRef} className="terminal-body">
        {history.map((entry, index) => (
          <motion.div
            key={index}
            className={`output-line ${entry.type}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        ))}
      </div>
      <div className="terminal-input">
        <span className="input-prompt">kirbynuggets@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          className="command-input"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};*/
import React, { useState } from 'react';

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to Arya Portfolio Terminal',
    'Type "help" for available commands',
    ''
  ]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      const newHistory = [...history, `$ ${command}`];
      
      switch (command.toLowerCase()) {
        case 'help':
          newHistory.push('Available commands: help, clear, about, skills, projects');
          break;
        case 'clear':
          setHistory(['Welcome to Arya Portfolio Terminal', 'Type "help" for available commands', '']);
          setInput('');
          return;
        case 'about':
          newHistory.push('Full Stack Developer passionate about Linux and open source');
          break;
        case 'skills':
          newHistory.push('React, Node.js, Python, Docker, Linux, DevOps');
          break;
        case 'projects':
          newHistory.push('Check out my GitHub for latest projects');
          break;
        default:
          newHistory.push(`Command not found: ${command}`);
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div style={{ 
      background: '#1e1e1e', 
      color: '#00ff00', 
      padding: '20px', 
      fontFamily: 'monospace',
      height: '100%',
      overflow: 'auto'
    }}>
      <div>
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>$ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00ff00',
              fontFamily: 'monospace',
              outline: 'none',
              flex: 1
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};