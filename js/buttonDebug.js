// Enhanced Button Debug Script for Cosmic Conquest
// This script provides detailed logging and testing for button functionality

console.log('🔬 Enhanced Button Debug Script Loading...');

// Add visual debugging indicators
function addDebugIndicators() {
    const debugStyle = document.createElement('style');
    debugStyle.textContent = `
        .debug-highlight {
            outline: 2px solid red !important;
            outline-offset: 2px;
        }
        .debug-found {
            outline: 2px solid green !important;
            outline-offset: 2px;
        }
        #debug-panel {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            background: rgba(0,0,0,0.9);
            color: #00ff9d;
            border: 1px solid #00ff9d;
            border-radius: 10px;
            padding: 15px;
            font-size: 12px;
            z-index: 10000;
            font-family: monospace;
            max-height: 400px;
            overflow-y: auto;
        }
        .debug-log {
            margin: 5px 0;
            padding: 3px 5px;
            background: rgba(0,255,157,0.1);
            border-radius: 3px;
        }
    `;
    document.head.appendChild(debugStyle);
    
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.innerHTML = '<h4>🔬 Button Debug Panel</h4><div id="debug-logs"></div>';
    document.body.appendChild(debugPanel);
}

// Enhanced logging function
function debugLog(message, type = 'info') {
    console.log(`[DEBUG] ${message}`);
    
    const debugLogs = document.getElementById('debug-logs');
    if (debugLogs) {
        const logEntry = document.createElement('div');
        logEntry.className = 'debug-log';
        logEntry.innerHTML = `<span style="color: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#00ff9d'}">[${new Date().toLocaleTimeString()}]</span> ${message}`;
        debugLogs.appendChild(logEntry);
        debugLogs.scrollTop = debugLogs.scrollHeight;
        
        // Keep only last 20 logs
        while (debugLogs.children.length > 20) {
            debugLogs.removeChild(debugLogs.firstChild);
        }
    }
}

// Initialize debugging when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addDebugIndicators();
    debugLog('Debug panel initialized');
    
    // Find and highlight the target buttons
    const buttons = document.querySelectorAll('button[data-button="cosmic-codex"], button[data-button="settings"]');
    debugLog(`Found ${buttons.length} target buttons`);
    
    buttons.forEach((button, index) => {
        button.classList.add('debug-found');
        debugLog(`Button ${index + 1}: ${button.textContent.trim()} [data-button="${button.getAttribute('data-button')}"]`);
        
        // Add direct click listener for testing
        button.addEventListener('click', function(e) {
            debugLog(`Direct click on: ${this.textContent.trim()}`, 'success');
        });
    });
    
    // Test the button detection logic
    document.addEventListener('click', function(event) {
        let targetElement = event.target;
        debugLog(`Click detected on: ${targetElement.tagName} "${targetElement.textContent?.slice(0, 30)}..."`);
        
        // Show the traversal path
        let path = [];
        let current = targetElement;
        while (current && current !== document.body) {
            path.push(`${current.tagName}${current.className ? '.' + current.className.split(' ').join('.') : ''}${current.getAttribute('data-button') ? '[data-button="' + current.getAttribute('data-button') + '"]' : ''}`);
            if (current.nodeName === 'BUTTON' || current.classList.contains('game-button')) {
                debugLog(`Found button in path: ${current.tagName} "${current.textContent.trim()}"`, 'success');
                break;
            }
            current = current.parentElement;
        }
        debugLog(`Traversal path: ${path.join(' → ')}`);
    });
});

// Add keyboard shortcut to test buttons
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        debugLog('Testing Cosmic Codex button...');
        const codexBtn = document.querySelector('button[data-button="cosmic-codex"]');
        if (codexBtn) {
            codexBtn.click();
            debugLog('Cosmic Codex button clicked programmatically', 'success');
        } else {
            debugLog('Cosmic Codex button not found!', 'error');
        }
    }
    
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        debugLog('Testing Settings button...');
        const settingsBtn = document.querySelector('button[data-button="settings"]');
        if (settingsBtn) {
            settingsBtn.click();
            debugLog('Settings button clicked programmatically', 'success');
        } else {
            debugLog('Settings button not found!', 'error');
        }
    }
});

debugLog('Enhanced debug script loaded. Use Ctrl+T for Codex, Ctrl+S for Settings');
