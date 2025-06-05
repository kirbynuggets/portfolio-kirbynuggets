// Initialize particles
        function createParticles() {
            const particles = document.querySelector('.particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = `particle type${Math.floor(Math.random() * 3) + 1}`;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
                particles.appendChild(particle);
            }
        }
     

        // Boot sequence
        function startBootSequence() {
            const bootLines = document.querySelectorAll('.boot-line');
            const totalDelay = bootLines.length * 0.3 + 2.5; // Calculate total animation time
            
            setTimeout(() => {
                const bootScreen = document.getElementById('bootScreen');
                const loginScreen = document.getElementById('loginScreen');
                
                // Add debug logging
                console.log('Boot sequence complete, switching screens');
                
                bootScreen.classList.add('hidden');
                loginScreen.classList.remove('hidden');
                
                // Force reflow to ensure changes take effect
                loginScreen.offsetHeight;
            }, totalDelay * 1000);
        }

        document.addEventListener('click', function() {
            const bootScreen = document.getElementById('bootScreen');
            if (!bootScreen.classList.contains('hidden')) {
                console.log('Manual screen transition triggered');
                bootScreen.classList.add('hidden');
                document.getElementById('loginScreen').classList.remove('hidden');
            }
        });

        // Login function
        function login() {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('desktopScreen').classList.remove('hidden');
        }

        // Logout function
        function logout() {
            document.getElementById('desktopScreen').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
            closeAllWindows();
        }

        // Window management
        let activeWindows = [];

        function openWindow(windowType) {
            const windowElement = document.getElementById(windowType + 'Window');
            if (windowElement) {
                windowElement.classList.add('active');
                if (!activeWindows.includes(windowType)) {
                    activeWindows.push(windowType);
                    addToTaskbar(windowType);
                }
                bringToFront(windowElement);
            }
        }

        function closeWindow(windowType) {
            const windowElement = document.getElementById(windowType + 'Window');
            if (windowElement) {
                windowElement.classList.remove('active');
                activeWindows = activeWindows.filter(w => w !== windowType);
                removeFromTaskbar(windowType);
            }
        }

        function closeAllWindows() {
            activeWindows.forEach(windowType => {
                closeWindow(windowType);
            });
        }

        function bringToFront(windowElement) {
            const allWindows = document.querySelectorAll('.window');
            let maxZ = 100;
            allWindows.forEach(win => {
                const z = parseInt(window.getComputedStyle(win).zIndex) || 100;
                if (z > maxZ) maxZ = z;
            });
            windowElement.style.zIndex = maxZ + 1;
        }

        // Taskbar management
        function addToTaskbar(windowType) {
            const taskbar = document.querySelector('.taskbar-apps');
            const taskbarApp = document.createElement('div');
            taskbarApp.className = 'taskbar-app active';
            taskbarApp.id = 'taskbar-' + windowType;
            taskbarApp.textContent = getWindowTitle(windowType);
            taskbarApp.onclick = () => toggleWindow(windowType);
            taskbar.appendChild(taskbarApp);
        }

        function removeFromTaskbar(windowType) {
            const taskbarApp = document.getElementById('taskbar-' + windowType);
            if (taskbarApp) {
                taskbarApp.remove();
            }
        }

        function toggleWindow(windowType) {
            const windowElement = document.getElementById(windowType + 'Window');
            if (windowElement.classList.contains('active')) {
                closeWindow(windowType);
            } else {
                openWindow(windowType);
            }
        }

        function getWindowTitle(windowType) {
            const titles = {
                'about': 'About Me',
                'projects': 'Projects',
                'contact': 'Contact',
                'terminal': 'Terminal'
            };
            return titles[windowType] || windowType;
        }

        // Terminal functionality
        const terminalCommands = {
            'help': 'Available commands: help, whoami, ls, pwd, clear, about, contact, projects, neofetch',
            'whoami': 'guest',
            'ls': 'about.txt  projects/  contact.info  portfolio.sh',
            'pwd': '/home/guest',
            'clear': 'CLEAR',
            'about': 'Opening About Me...',
            'contact': 'Opening Contact...',
            'projects': 'Opening Projects...',
            'neofetch': `
                ╭─────────────────────────╮
                │     Arya Sahu's PC      │
                ├─────────────────────────┤
                │ OS: portfolioOS v2.1.0  │
                │ Host: Interactive Web   │
                │ Kernel: CSS3 + JS       │
                │ Shell: terminal.js      │
                │ Resolution: Responsive  │
                │ Theme: Matrix Green     │
                │ Terminal: Custom        │
                ╰─────────────────────────╯`
        };

        function handleTerminalInput(event) {
            if (event.key === 'Enter') {
                const input = event.target;
                const command = input.value.trim().toLowerCase();
                const terminalContent = document.querySelector('.terminal-content');
                
                // Add command to terminal
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="prompt">user@portfolioOS:~$</span> <span class="command">${input.value}</span>`;
                terminalContent.insertBefore(commandLine, terminalContent.lastElementChild);
                
                // Process command
                if (terminalCommands[command]) {
                    if (command === 'clear') {
                        terminalContent.innerHTML = `
                            <div class="terminal-line">
                                <span class="prompt">user@portfolioOS:~$</span>
                                <input type="text" class="command" id="terminalInput" onkeypress="handleTerminalInput(event)" placeholder="Type 'help' for available commands">
                                <span class="cursor">_</span>
                            </div>
                        `;
                        document.getElementById('terminalInput').focus();
                        return;
                    } else if (['about', 'contact', 'projects'].includes(command)) {
                        openWindow(command);
                    }
                    
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    outputLine.innerHTML = `<span class="output">${terminalCommands[command]}</span>`;
                    terminalContent.insertBefore(outputLine, terminalContent.lastElementChild);
                } else if (command) {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-line';
                    errorLine.innerHTML = `<span class="output" style="color: #ff6b35;">Command not found: ${command}</span>`;
                    terminalContent.insertBefore(errorLine, terminalContent.lastElementChild);
                }
                
                // Clear input and refocus
                input.value = '';
                input.focus();
                
                // Scroll to bottom
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        }

        // Context menu
        function showContextMenu(e) {
            e.preventDefault();
            const contextMenu = document.getElementById('contextMenu');
            contextMenu.style.display = 'block';
            contextMenu.style.left = e.clientX + 'px';
            contextMenu.style.top = e.clientY + 'px';
        }

        function hideContextMenu() {
            document.getElementById('contextMenu').style.display = 'none';
        }

        // Drag functionality for windows
        function makeDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const header = element.querySelector('.window-header');
            
            header.onmousedown = dragMouseDown;
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }
            
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            startBootSequence();
            
            // Make windows draggable
            document.querySelectorAll('.window').forEach(makeDraggable);
            
            // Context menu events
            document.getElementById('desktopScreen').addEventListener('contextmenu', showContextMenu);
            document.addEventListener('click', hideContextMenu);
            
            // Focus terminal when opened
            document.addEventListener('click', function(e) {
                if (e.target.closest('#terminalWindow')) {
                    const terminalInput = document.getElementById('terminalInput');
                    if (terminalInput) terminalInput.focus();
                }
            });
        });