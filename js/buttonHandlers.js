// Enhanced Button handlers for the Cosmic Conquest game
console.log('🚀 Enhanced Button handlers script loading...');

// Enhanced button click handler with better targeting
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌌 DOM loaded, initializing enhanced button system...');
    
    // Use more specific targeting for buttons
    const codexButton = document.querySelector('[data-button="cosmic-codex"]');
    const settingsButton = document.querySelector('[data-button="settings"]');
    
    if (codexButton) {
        codexButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📜 Cosmic Codex button clicked directly');
            if (window.cosmicAudio) {
                window.cosmicAudio.playModalSound();
            }
            showCodexModal();
        });
        console.log('✅ Cosmic Codex button handler attached');
    } else {
        console.error('❌ Cosmic Codex button not found');
    }
    
    if (settingsButton) {
        settingsButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⚙️ Settings button clicked directly');
            if (window.cosmicAudio) {
                window.cosmicAudio.playModalSound();
            }
            showSettingsModal();
        });
        console.log('✅ Settings button handler attached');
    } else {
        console.error('❌ Settings button not found');
    }
});

// Fallback event delegation system
document.addEventListener('click', function(event) {
    const target = event.target;
    const button = target.closest('[data-button]');
    
    if (button) {
        const buttonType = button.getAttribute('data-button');
        
        if (buttonType === 'cosmic-codex') {
            event.preventDefault();
            event.stopPropagation();
            console.log('📜 Cosmic Codex button clicked via delegation');
            if (window.cosmicAudio) {
                window.cosmicAudio.playModalSound();
            }
            showCodexModal();
        } else if (buttonType === 'settings') {
            event.preventDefault();
            event.stopPropagation();
            console.log('⚙️ Settings button clicked via delegation');
            if (window.cosmicAudio) {
                window.cosmicAudio.playModalSound();
            }
            showSettingsModal();
        }
    }
});

// Enhanced modal functions with improved styling and functionality
function showCodexModal() {
    console.log('🌟 Opening Cosmic Codex modal...');
    
    // Remove any existing modals
    const existingModals = document.querySelectorAll('.cosmic-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal with enhanced styling
    const modal = document.createElement('div');
    modal.className = 'cosmic-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        width: 90%;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        background: linear-gradient(135deg, #041428 0%, #0a1b3a 100%);
        border: 2px solid #00ff9d;
        border-radius: 15px;
        padding: 30px;
        color: #e0e0e0;
        font-family: 'Orbitron', sans-serif;
        box-shadow: 0 0 30px rgba(0, 255, 157, 0.3), inset 0 0 20px rgba(0, 255, 157, 0.1);
        position: relative;
        animation: slideIn 0.4s ease;
    `;
    
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #00ff9d; margin: 0; font-size: 2.2em; text-shadow: 0 0 10px #00ff9d;">
                📜 Cosmic Codex
            </h2>
            <div style="width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #00ff9d, transparent); margin-top: 10px;"></div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
            <div style="background: rgba(0, 255, 157, 0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #00ff9d;">
                <h3 style="color: #00ff9d; margin-top: 0;">🌌 Game Objective</h3>
                <p style="margin: 0; line-height: 1.6;">Establish dominance across the cosmos through strategic conquest, technological advancement, and diplomatic supremacy.</p>
            </div>
            <div style="background: rgba(0, 255, 157, 0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #00ff9d;">
                <h3 style="color: #00ff9d; margin-top: 0;">🎮 Controls</h3>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li>Click sectors to select</li>
                    <li>Use command buttons for actions</li>
                    <li>Monitor resources in top panel</li>
                </ul>
            </div>
        </div>
        
        <div style="background: rgba(0, 255, 157, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
            <h3 style="color: #00ff9d; margin-top: 0;">👽 Available Species</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div style="text-align: center; padding: 10px; background: rgba(255, 85, 0, 0.1); border-radius: 8px;">
                    <div style="font-size: 1.5em; margin-bottom: 5px;">🔥</div>
                    <strong style="color: #ff5500;">Zorgons</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">Aggressive Warriors</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(0, 150, 255, 0.1); border-radius: 8px;">
                    <div style="font-size: 1.5em; margin-bottom: 5px;">✨</div>
                    <strong style="color: #0096ff;">Neburites</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">Energy Masters</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(255, 0, 150, 0.1); border-radius: 8px;">
                    <div style="font-size: 1.5em; margin-bottom: 5px;">⚡</div>
                    <strong style="color: #ff0096;">Pyraxians</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">Tech Innovators</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(150, 255, 0, 0.1); border-radius: 8px;">
                    <div style="font-size: 1.5em; margin-bottom: 5px;">🌿</div>
                    <strong style="color: #96ff00;">Quosarians</strong>
                    <div style="font-size: 0.9em; opacity: 0.8;">Diplomatic Strategists</div>
                </div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="this.closest('.cosmic-modal').remove()" 
                    style="background: linear-gradient(45deg, #00ff9d, #0096ff); 
                           border: none; color: #041428; padding: 15px 30px; 
                           border-radius: 25px; cursor: pointer; font-family: 'Orbitron', sans-serif; 
                           font-weight: bold; font-size: 1.1em;
                           box-shadow: 0 5px 15px rgba(0, 255, 157, 0.4); 
                           transition: all 0.3s ease;
                           text-transform: uppercase;">
                <i class="fas fa-times" style="margin-right: 8px;"></i>Close Transmission
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Add CSS animations if not already added
    if (!document.querySelector('#cosmic-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'cosmic-modal-styles';
        styles.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-30px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            .cosmic-modal button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 255, 157, 0.6) !important;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showSettingsModal() {
    console.log('⚙️ Opening Settings modal...');
    
    // Remove any existing modals
    const existingModals = document.querySelectorAll('.cosmic-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal with enhanced styling
    const modal = document.createElement('div');
    modal.className = 'cosmic-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        background: linear-gradient(135deg, #041428 0%, #0a1b3a 100%);
        border: 2px solid #00ff9d;
        border-radius: 15px;
        padding: 30px;
        color: #e0e0e0;
        font-family: 'Orbitron', sans-serif;
        box-shadow: 0 0 30px rgba(0, 255, 157, 0.3), inset 0 0 20px rgba(0, 255, 157, 0.1);
        position: relative;
        animation: slideIn 0.4s ease;
    `;
    
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #00ff9d; margin: 0; font-size: 2.2em; text-shadow: 0 0 10px #00ff9d;">
                ⚙️ Mission Control
            </h2>
            <div style="width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #00ff9d, transparent); margin-top: 10px;"></div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h3 style="color: #00ff9d; display: flex; align-items: center; margin-bottom: 15px;">
                <i class="fas fa-volume-up" style="margin-right: 10px;"></i>Audio Settings
            </h3>
            
            <div style="background: rgba(0, 255, 157, 0.1); padding: 20px; border-radius: 10px;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: #00ff9d;">
                        🎵 Background Music Volume
                    </label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="range" id="music-volume" min="0" max="100" value="70" 
                               style="flex: 1; height: 8px; background: #041428; border-radius: 4px; 
                                      outline: none; -webkit-appearance: none;">
                        <span id="music-value" style="min-width: 40px; text-align: center;">70%</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: #00ff9d;">
                        🔊 Sound Effects Volume
                    </label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="range" id="sfx-volume" min="0" max="100" value="80" 
                               style="flex: 1; height: 8px; background: #041428; border-radius: 4px; 
                                      outline: none; -webkit-appearance: none;">
                        <span id="sfx-value" style="min-width: 40px; text-align: center;">80%</span>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <button id="play-music" style="background: #00ff9d; color: #041428; border: none; 
                                                   padding: 10px 20px; border-radius: 20px; cursor: pointer; 
                                                   font-family: 'Orbitron', sans-serif; font-weight: bold;">
                        <i class="fas fa-play"></i> Test Music
                    </button>
                    <button id="stop-music" style="background: #ff5500; color: white; border: none; 
                                                   padding: 10px 20px; border-radius: 20px; cursor: pointer; 
                                                   font-family: 'Orbitron', sans-serif; font-weight: bold;">
                        <i class="fas fa-stop"></i> Stop Music
                    </button>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h3 style="color: #00ff9d; display: flex; align-items: center; margin-bottom: 15px;">
                <i class="fas fa-display" style="margin-right: 10px;"></i>Display Settings
            </h3>
            
            <div style="background: rgba(0, 255, 157, 0.1); padding: 20px; border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span>Enhanced Visual Effects</span>
                    <label style="position: relative; display: inline-block; width: 60px; height: 30px;">
                        <input type="checkbox" id="enhanced-fx" checked style="opacity: 0; width: 0; height: 0;">
                        <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
                                     background-color: #041428; transition: 0.4s; border-radius: 30px; border: 2px solid #00ff9d;"></span>
                        <span style="position: absolute; content: ''; height: 22px; width: 22px; left: 4px; bottom: 2px;
                                     background-color: #00ff9d; transition: 0.4s; border-radius: 50%; transform: translateX(26px);"></span>
                    </label>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Particle Effects</span>
                    <label style="position: relative; display: inline-block; width: 60px; height: 30px;">
                        <input type="checkbox" id="particles" checked style="opacity: 0; width: 0; height: 0;">
                        <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
                                     background-color: #041428; transition: 0.4s; border-radius: 30px; border: 2px solid #00ff9d;"></span>
                        <span style="position: absolute; content: ''; height: 22px; width: 22px; left: 4px; bottom: 2px;
                                     background-color: #00ff9d; transition: 0.4s; border-radius: 50%; transform: translateX(26px);"></span>
                    </label>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; display: flex; gap: 15px; justify-content: center;">
            <button onclick="saveSettings()" 
                    style="background: linear-gradient(45deg, #00ff9d, #0096ff); 
                           border: none; color: #041428; padding: 15px 25px; 
                           border-radius: 25px; cursor: pointer; font-family: 'Orbitron', sans-serif; 
                           font-weight: bold; box-shadow: 0 5px 15px rgba(0, 255, 157, 0.4); 
                           transition: all 0.3s ease;">
                <i class="fas fa-save" style="margin-right: 8px;"></i>Save Settings
            </button>
            <button onclick="this.closest('.cosmic-modal').remove()" 
                    style="background: #666; border: none; color: white; padding: 15px 25px; 
                           border-radius: 25px; cursor: pointer; font-family: 'Orbitron', sans-serif; 
                           font-weight: bold; transition: all 0.3s ease;">
                <i class="fas fa-times" style="margin-right: 8px;"></i>Close
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
      // Add interactive functionality to sliders and buttons
    const musicSlider = content.querySelector('#music-volume');
    const musicValue = content.querySelector('#music-value');
    const sfxSlider = content.querySelector('#sfx-volume');
    const sfxValue = content.querySelector('#sfx-value');
    const playButton = content.querySelector('#play-music');
    const stopButton = content.querySelector('#stop-music');
    
    // Set initial values from audio manager
    if (window.cosmicAudio) {
        musicSlider.value = Math.round(window.cosmicAudio.musicVolume * 100);
        musicValue.textContent = musicSlider.value + '%';
        sfxSlider.value = Math.round(window.cosmicAudio.sfxVolume * 100);
        sfxValue.textContent = sfxSlider.value + '%';
    }
    
    // Update volume displays and audio manager
    musicSlider.addEventListener('input', function() {
        musicValue.textContent = this.value + '%';
        if (window.cosmicAudio) {
            window.cosmicAudio.setMusicVolume(this.value / 100);
        }
    });
    
    sfxSlider.addEventListener('input', function() {
        sfxValue.textContent = this.value + '%';
        if (window.cosmicAudio) {
            window.cosmicAudio.setSFXVolume(this.value / 100);
        }
    });
    
    // Music control buttons
    playButton.addEventListener('click', function() {
        console.log('🎵 Starting background music...');
        if (window.cosmicAudio) {
            window.cosmicAudio.startAmbientMusic();
        }
        this.style.opacity = '0.5';
        this.textContent = '🎵 Playing...';
        setTimeout(() => {
            this.style.opacity = '1';
            this.innerHTML = '<i class="fas fa-play"></i> Test Music';
        }, 2000);
    });
    
    stopButton.addEventListener('click', function() {
        console.log('🔇 Stopping background music...');
        if (window.cosmicAudio) {
            window.cosmicAudio.stopMusic();
        }
        this.style.opacity = '0.5';
        this.textContent = '🔇 Stopped';
        setTimeout(() => {
            this.style.opacity = '1';
            this.innerHTML = '<i class="fas fa-stop"></i> Stop Music';
        }, 2000);
    });
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Save settings function
function saveSettings() {
    console.log('💾 Saving settings...');
    
    // Get current values from audio manager
    const musicVolume = window.cosmicAudio ? window.cosmicAudio.musicVolume : 0.7;
    const sfxVolume = window.cosmicAudio ? window.cosmicAudio.sfxVolume : 0.8;
    
    // Save to localStorage
    const settings = {
        musicVolume: musicVolume,
        sfxVolume: sfxVolume,
        enhancedFX: document.querySelector('#enhanced-fx')?.checked || true,
        particles: document.querySelector('#particles')?.checked || true
    };
    
    localStorage.setItem('cosmicConquestSettings', JSON.stringify(settings));
    
    // Show confirmation
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00ff9d, #0096ff);
        color: #041428;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Orbitron', sans-serif;
        font-weight: bold;
        z-index: 11000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 255, 157, 0.4);
    `;
    notification.innerHTML = '<i class="fas fa-check"></i> Settings Saved Successfully!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load settings on page load
function loadSettings() {
    const savedSettings = localStorage.getItem('cosmicConquestSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply settings to audio manager when it's available
        if (window.cosmicAudio) {
            if (settings.musicVolume !== undefined) {
                window.cosmicAudio.setMusicVolume(settings.musicVolume);
            }
            if (settings.sfxVolume !== undefined) {
                window.cosmicAudio.setSFXVolume(settings.sfxVolume);
            }
        }
        
        console.log('📁 Settings loaded from storage');
    }
}

// Initialize settings on load
document.addEventListener('DOMContentLoaded', loadSettings);

console.log('✅ Enhanced button handlers loaded successfully!');
