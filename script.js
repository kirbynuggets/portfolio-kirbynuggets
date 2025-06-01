// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particles.appendChild(particle);
    }
}

// Boot messages
const bootMessages = [
    "Loading Linux kernel...",
    "Initializing hardware components...",
    "Starting system services...",
    "Loading network modules...",
    "Mounting filesystems...",
    "Starting display manager...",
    "Initializing portfolio environment...",
    "Loading user profile...",
    "Starting desktop environment...",
    "System ready."
];

// Boot sequence
function startBoot() {
    const bootText = document.getElementById('bootText');
    let delay = 0;

    bootMessages.forEach((message, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = `[  ${(Date.now() / 1000).toFixed(3)}  ] ${message}`;
            
            if (index < bootMessages.length - 1) {
                line.classList.add('ok');
            }
            
            line.style.animationDelay = '0s';
            bootText.appendChild(line);

            if (index === bootMessages.length - 1) {
                setTimeout(() => {
                    document.getElementById('bootScreen').classList.add('hidden');
                    document.getElementById('loginScreen').classList.remove('hidden');
                }, 1500);
            }
        }, delay);
        delay += 400;
    });
}

// Update time displays
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });

    document.getElementById('panelTime').textContent = timeString;
}

function loginDesktop() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('desktopScreen').classList.remove('hidden');
}

function openWindow(windowType) {
    const window = document.getElementById(windowType + 'Window');
    window.classList.add('active');
    
    // Add to taskbar
    const taskbarApps = document.getElementById('taskbarApps');
    const existingApp = document.querySelector(`[data-window="${windowType}"]`);
    
    if (!existingApp) {
        const appButton = document.createElement('div');
        appButton.className = 'taskbar-app active';
        appButton.setAttribute('data-window', windowType);
        appButton.textContent = windowType.charAt(0).toUpperCase() + windowType.slice(1);
        appButton.onclick = () => toggleWindow(windowType);
        taskbarApps.appendChild(appButton);
    } else {
        existingApp.classList.add('active');
    }
}

function closeWindow(windowType) {
    const window = document.getElementById(windowType + 'Window');
    window.classList.remove('active');
    
    // Remove from taskbar
    const appButton = document.querySelector(`[data-window="${windowType}"]`);
    if (appButton) {
        appButton.remove();
    }
}

function toggleWindow(windowType) {
    const window = document.getElementById(windowType + 'Window');
    const appButton = document.querySelector(`[data-window="${windowType}"]`);
    
    if (window.classList.contains('active')) {
        window.classList.remove('active');
        appButton.classList.remove('active');
    } else {
        window.classList.add('active');
        appButton.classList.add('active');
    }
}

// Window management
document.querySelectorAll('.window').forEach((window, index) => {
    window.addEventListener('click', () => {
        // Bring to front
        window.style.zIndex = 1000 + Date.now();
    });

    // Make windows draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const header = window.querySelector('.window-header');
    
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        if (e.target.classList.contains('window-control')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            window.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    function dragEnd() {
        isDragging = false;
    }
});

// Initialize
createParticles();
updateTime();
setInterval(updateTime, 1000);
startBoot();

// Add some terminal interactivity
setTimeout(() => {
    const terminalContent = document.getElementById('terminalContent');
    if (terminalContent) {
        terminalContent.addEventListener('click', () => {
            const cursor = terminalContent.querySelector('.cursor');
            if (cursor) {
                cursor.focus();
            }
        });
    }
}, 5000);