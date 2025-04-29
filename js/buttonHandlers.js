// Button handlers for the Cosmic Conquest game

// Remove alerts and use console logs instead
console.log('Button handlers script is loading!');

// Direct event handling approach
document.addEventListener('click', function(event) {
    // Check if clicked element is a button or inside a button
    let targetElement = event.target;
    
    // Navigate up to find button if clicked on a child element (like text or image inside button)
    while (targetElement && targetElement.nodeName !== 'BUTTON' && !targetElement.classList.contains('game-button')) {
        if (targetElement.parentElement) {
            targetElement = targetElement.parentElement;
        } else {
            break;
        }
    }
    
    // Now check if we found a button and which one it is
    if (targetElement) {
        // Check if this is the Cosmic Codex button
        if (targetElement.textContent.includes('Cosmic Codex') || 
            (targetElement.getAttribute('data-button') === 'cosmic-codex')) {
            console.log('Cosmic Codex button clicked through event delegation');
            showCodexModal();
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Check if this is the Settings button
        if (targetElement.textContent.includes('Settings') || 
            (targetElement.getAttribute('data-button') === 'settings')) {
            console.log('Settings button clicked through event delegation');
            showSettingsModal();
            event.preventDefault();
            event.stopPropagation();
        }
    }
});

// Very simple function to show Cosmic Codex modal
function showCodexModal() {
    // Create modal with game-appropriate styling
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    var content = document.createElement('div');
    content.style.width = '80%';
    content.style.maxWidth = '600px';
    content.style.backgroundColor = '#041428';
    content.style.border = '2px solid #00ff9d';
    content.style.borderRadius = '10px';
    content.style.padding = '20px';
    content.style.color = '#e0e0e0';
    content.style.fontFamily = 'Orbitron, sans-serif';
    content.style.boxShadow = '0 0 20px #00ff9d';
    
    var title = document.createElement('h2');
    title.textContent = '📜 Cosmic Codex';
    title.style.color = '#00ff9d';
    title.style.borderBottom = '1px solid #00ff9d';
    title.style.paddingBottom = '10px';
    title.style.textAlign = 'center';
    
    var info = document.createElement('div');
    info.innerHTML = `
        <h3 style="color: #00ff9d;">Game Information</h3>
        <ul>
            <li><strong>Species:</strong> Choose between Zorgons, Neburites, Pyraxians, and Quosarians.</li>
            <li><strong>Gameplay:</strong> Strategic conquest across the cosmos.</li>
            <li><strong>Objective:</strong> Establish your dominance through military, technology, or diplomatic supremacy.</li>
        </ul>
        <h3 style="color: #00ff9d;">Controls</h3>
        <ul>
            <li><strong>Navigation:</strong> Click or tap on sectors to select.</li>
            <li><strong>Actions:</strong> Use command buttons to issue orders.</li>
            <li><strong>Resources:</strong> Monitor your resources in the top panel.</li>
        </ul>
    `;
    
    var closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.backgroundColor = '#00ff9d';
    closeBtn.style.color = '#041428';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.margin = '20px auto 0';
    closeBtn.style.display = 'block';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontFamily = 'Orbitron, sans-serif';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.onclick = function(e) {
        document.body.removeChild(modal);
        e.stopPropagation();
    };
    
    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    
    // Prevent clicks inside modal from bubbling to document
    modal.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.body.appendChild(modal);
    
    // Also close when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Very simple function to show Settings modal
function showSettingsModal() {
    // Create modal with game-appropriate styling
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    var content = document.createElement('div');
    content.style.width = '80%';
    content.style.maxWidth = '600px';
    content.style.backgroundColor = '#041428';
    content.style.border = '2px solid #00ff9d';
    content.style.borderRadius = '10px';
    content.style.padding = '20px';
    content.style.color = '#e0e0e0';
    content.style.fontFamily = 'Orbitron, sans-serif';
    content.style.boxShadow = '0 0 20px #00ff9d';
    
    var title = document.createElement('h2');
    title.textContent = '⚙️ Game Settings';
    title.style.color = '#00ff9d';
    title.style.borderBottom = '1px solid #00ff9d';
    title.style.paddingBottom = '10px';
    title.style.textAlign = 'center';
    
    var settingsContent = document.createElement('div');
    settingsContent.style.marginTop = '20px';
    
    // Audio Settings
    var audioSection = document.createElement('div');
    audioSection.style.marginBottom = '20px';
    
    var audioHeader = document.createElement('h3');
    audioHeader.textContent = 'Audio Settings';
    audioHeader.style.color = '#00ff9d';
    audioSection.appendChild(audioHeader);
    
    // Music volume
    var musicLabel = document.createElement('label');
    musicLabel.textContent = 'Music Volume';
    musicLabel.style.display = 'block';
    musicLabel.style.marginBottom = '5px';
    audioSection.appendChild(musicLabel);
    
    var musicSlider = document.createElement('input');
    musicSlider.type = 'range';
    musicSlider.min = '0';
    musicSlider.max = '100';
    musicSlider.value = '70';
    musicSlider.style.width = '100%';
    musicSlider.style.marginBottom = '15px';
    audioSection.appendChild(musicSlider);
    
    // Sound effects volume
    var sfxLabel = document.createElement('label');
    sfxLabel.textContent = 'Sound Effects';
    sfxLabel.style.display = 'block';
    sfxLabel.style.marginBottom = '5px';
    audioSection.appendChild(sfxLabel);
    
    var sfxSlider = document.createElement('input');
    sfxSlider.type = 'range';
    sfxSlider.min = '0';
    sfxSlider.max = '100';
    sfxSlider.value = '80';
    sfxSlider.style.width = '100%';
    sfxSlider.style.marginBottom = '15px';
    audioSection.appendChild(sfxSlider);
    
    // Display Settings
    var displaySection = document.createElement('div');
    displaySection.style.marginBottom = '20px';
    
    var displayHeader = document.createElement('h3');
    displayHeader.textContent = 'Display Settings';
    displayHeader.style.color = '#00ff9d';
    displaySection.appendChild(displayHeader);
    
    // Create toggles/options for Enhanced UI and Interactive Background
    var enhancedUI = document.createElement('div');
    enhancedUI.style.display = 'flex';
    enhancedUI.style.alignItems = 'center';
    enhancedUI.style.justifyContent = 'space-between';
    enhancedUI.style.marginBottom = '10px';
    
    var enhancedLabel = document.createElement('span');
    enhancedLabel.textContent = 'Enhanced UI';
    
    var enhancedToggle = document.createElement('label');
    enhancedToggle.style.position = 'relative';
    enhancedToggle.style.display = 'inline-block';
    enhancedToggle.style.width = '60px';
    enhancedToggle.style.height = '30px';
    
    var enhancedCheckbox = document.createElement('input');
    enhancedCheckbox.type = 'checkbox';
    enhancedCheckbox.checked = true;
    enhancedCheckbox.style.opacity = '0';
    enhancedCheckbox.style.width = '0';
    enhancedCheckbox.style.height = '0';
    
    var enhancedSlider = document.createElement('span');
    enhancedSlider.style.position = 'absolute';
    enhancedSlider.style.cursor = 'pointer';
    enhancedSlider.style.top = '0';
    enhancedSlider.style.left = '0';
    enhancedSlider.style.right = '0';
    enhancedSlider.style.bottom = '0';
    enhancedSlider.style.backgroundColor = '#041428';
    enhancedSlider.style.border = '2px solid #ff5500';
    enhancedSlider.style.transition = '.4s';
    enhancedSlider.style.borderRadius = '30px';
    
    var enhancedKnob = document.createElement('span');
    enhancedKnob.style.position = 'absolute';
    enhancedKnob.style.content = '""';
    enhancedKnob.style.height = '22px';
    enhancedKnob.style.width = '22px';
    enhancedKnob.style.left = '4px';
    enhancedKnob.style.bottom = '2px';
    enhancedKnob.style.backgroundColor = '#ff5500';
    enhancedKnob.style.transition = '.4s';
    enhancedKnob.style.borderRadius = '50%';
    enhancedKnob.style.transform = 'translateX(30px)';
    
    enhancedToggle.appendChild(enhancedCheckbox);
    enhancedToggle.appendChild(enhancedSlider);
    enhancedSlider.appendChild(enhancedKnob);
    
    enhancedUI.appendChild(enhancedLabel);
    enhancedUI.appendChild(enhancedToggle);
    
    displaySection.appendChild(enhancedUI);
    
    // Buttons
    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Settings';
    saveBtn.style.backgroundColor = '#00ff9d';
    saveBtn.style.color = '#041428';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '5px';
    saveBtn.style.padding = '10px 20px';
    saveBtn.style.marginTop = '20px';
    saveBtn.style.marginRight = '10px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.style.fontFamily = 'Orbitron, sans-serif';
    saveBtn.style.fontWeight = 'bold';
    saveBtn.onclick = function(e) {
        alert('Settings saved!');
        e.stopPropagation();
    };
    
    var closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.backgroundColor = '#666';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.marginTop = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontFamily = 'Orbitron, sans-serif';
    closeBtn.onclick = function(e) {
        document.body.removeChild(modal);
        e.stopPropagation();
    };
    
    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(closeBtn);
    
    // Add everything to the content
    settingsContent.appendChild(audioSection);
    settingsContent.appendChild(displaySection);
    
    content.appendChild(title);
    content.appendChild(settingsContent);
    content.appendChild(buttonContainer);
    modal.appendChild(content);
    
    // Prevent clicks inside modal from bubbling to document
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.body.appendChild(modal);
    
    // Also close when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Setup button handlers immediately
if (document.readyState === 'complete') {
    console.log('Document already complete, setting up direct click handler.');
} else {
    console.log('Setting up load handlers for button functionality.');
    window.addEventListener('load', function() {
        console.log('Window loaded, buttons should be responsive now.');
    });
}
