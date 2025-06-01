// Enhanced Audio Manager for Cosmic Conquest
console.log('🎵 Audio Manager initializing...');

class CosmicAudioManager {
    constructor() {
        this.audioContext = null;
        this.musicGainNode = null;
        this.sfxGainNode = null;
        this.isPlaying = false;
        this.musicVolume = 0.7;
        this.sfxVolume = 0.8;
        this.currentOscillators = [];
        
        // Initialize audio context on user interaction
        this.initializeAudio();
    }
    
    async initializeAudio() {
        try {
            // Wait for user interaction to create audio context
            document.addEventListener('click', async () => {
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    
                    // Create gain nodes for volume control
                    this.musicGainNode = this.audioContext.createGain();
                    this.sfxGainNode = this.audioContext.createGain();
                    
                    this.musicGainNode.connect(this.audioContext.destination);
                    this.sfxGainNode.connect(this.audioContext.destination);
                    
                    this.musicGainNode.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
                    this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
                    
                    console.log('🎼 Audio context initialized');
                    
                    // Auto-start ambient music
                    this.startAmbientMusic();
                }
            }, { once: true });
        } catch (error) {
            console.error('Audio initialization failed:', error);
        }
    }
    
    createOscillator(frequency, type = 'sine', duration = 1) {
        if (!this.audioContext) return null;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.musicGainNode);
        
        return { oscillator, gainNode };
    }
    
    startAmbientMusic() {
        if (!this.audioContext || this.isPlaying) return;
        
        this.isPlaying = true;
        console.log('🌌 Starting ambient space music...');
        
        this.playAmbientSequence();
    }
    
    playAmbientSequence() {
        if (!this.audioContext || !this.isPlaying) return;
        
        // Create a complex ambient sequence
        const sequences = [
            { freq: 110, type: 'sine', duration: 8, delay: 0 },
            { freq: 165, type: 'triangle', duration: 6, delay: 2 },
            { freq: 220, type: 'sine', duration: 4, delay: 4 },
            { freq: 330, type: 'sawtooth', duration: 3, delay: 6 },
            { freq: 82.5, type: 'sine', duration: 10, delay: 1 }
        ];
        
        sequences.forEach(seq => {
            setTimeout(() => {
                if (this.isPlaying) {
                    const { oscillator, gainNode } = this.createOscillator(seq.freq, seq.type, seq.duration);
                    
                    // Add subtle frequency modulation for more interesting sound
                    const lfo = this.audioContext.createOscillator();
                    const lfoGain = this.audioContext.createGain();
                    
                    lfo.frequency.setValueAtTime(0.5, this.audioContext.currentTime);
                    lfoGain.gain.setValueAtTime(10, this.audioContext.currentTime);
                    
                    lfo.connect(lfoGain);
                    lfoGain.connect(oscillator.frequency);
                    
                    oscillator.start();
                    lfo.start();
                    
                    this.currentOscillators.push({ oscillator, lfo, gainNode });
                    
                    // Clean up after duration
                    setTimeout(() => {
                        try {
                            oscillator.stop();
                            lfo.stop();
                        } catch (e) {}
                        
                        // Remove from tracking array
                        this.currentOscillators = this.currentOscillators.filter(
                            osc => osc.oscillator !== oscillator
                        );
                    }, seq.duration * 1000);
                }
            }, seq.delay * 1000);
        });
        
        // Schedule next sequence
        setTimeout(() => {
            if (this.isPlaying) {
                this.playAmbientSequence();
            }
        }, 12000); // 12 second loop
    }
    
    stopMusic() {
        this.isPlaying = false;
        console.log('🔇 Stopping ambient music...');
        
        // Stop all current oscillators
        this.currentOscillators.forEach(({ oscillator, lfo }) => {
            try {
                oscillator.stop();
                lfo.stop();
            } catch (e) {}
        });
        
        this.currentOscillators = [];
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.musicGainNode) {
            this.musicGainNode.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
        }
        console.log(`🎵 Music volume set to ${Math.round(this.musicVolume * 100)}%`);
    }
    
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        if (this.sfxGainNode) {
            this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        }
        console.log(`🔊 SFX volume set to ${Math.round(this.sfxVolume * 100)}%`);
    }
    
    playClickSound() {
        if (!this.audioContext) return;
        
        const { oscillator } = this.createOscillator(800, 'square', 0.1);
        if (oscillator) {
            oscillator.connect(this.sfxGainNode);
            oscillator.start();
            setTimeout(() => {
                try {
                    oscillator.stop();
                } catch (e) {}
            }, 100);
        }
    }
    
    playHoverSound() {
        if (!this.audioContext) return;
        
        const { oscillator } = this.createOscillator(1000, 'sine', 0.05);
        if (oscillator) {
            oscillator.connect(this.sfxGainNode);
            oscillator.start();
            setTimeout(() => {
                try {
                    oscillator.stop();
                } catch (e) {}
            }, 50);
        }
    }
    
    playModalSound() {
        if (!this.audioContext) return;
        
        // Play a cosmic "whoosh" sound for modal opening
        const frequencies = [400, 600, 800, 1000];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const { oscillator } = this.createOscillator(freq, 'sine', 0.3);
                if (oscillator) {
                    oscillator.connect(this.sfxGainNode);
                    oscillator.start();
                    setTimeout(() => {
                        try {
                            oscillator.stop();
                        } catch (e) {}
                    }, 300);
                }
            }, index * 50);
        });
    }
}

// Create global audio manager instance
window.cosmicAudio = new CosmicAudioManager();

// Load saved settings
const savedSettings = localStorage.getItem('cosmicConquestSettings');
if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    if (settings.musicVolume !== undefined) {
        window.cosmicAudio.setMusicVolume(settings.musicVolume);
    }
    if (settings.sfxVolume !== undefined) {
        window.cosmicAudio.setSFXVolume(settings.sfxVolume);
    }
}

// Add subtle hover sounds to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.game-button, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            window.cosmicAudio.playHoverSound();
        });
        
        button.addEventListener('click', () => {
            window.cosmicAudio.playClickSound();
        });
    });
});

console.log('✅ Cosmic Audio Manager loaded successfully!');
