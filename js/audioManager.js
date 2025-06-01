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
        
        // Create a more sophisticated ambient sequence with chord progressions
        const sequences = [
            // Base drone
            { freq: 55, type: 'sine', duration: 16, delay: 0, gain: 0.05 },
            { freq: 82.5, type: 'sine', duration: 12, delay: 2, gain: 0.04 },
            
            // Harmonic layers
            { freq: 110, type: 'triangle', duration: 8, delay: 0, gain: 0.03 },
            { freq: 165, type: 'sine', duration: 6, delay: 3, gain: 0.025 },
            { freq: 220, type: 'triangle', duration: 4, delay: 6, gain: 0.02 },
            
            // Melodic elements
            { freq: 330, type: 'sawtooth', duration: 3, delay: 8, gain: 0.015 },
            { freq: 440, type: 'sine', duration: 2, delay: 10, gain: 0.01 },
            { freq: 293.7, type: 'triangle', duration: 4, delay: 12, gain: 0.02 }, // D note
            
            // Atmospheric pads
            { freq: 146.8, type: 'sine', duration: 10, delay: 1, gain: 0.03 }, // D an octave down
            { freq: 196, type: 'triangle', duration: 8, delay: 4, gain: 0.025 }, // G
        ];
        
        sequences.forEach(seq => {
            setTimeout(() => {
                if (this.isPlaying) {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    const filter = this.audioContext.createBiquadFilter();
                    const reverb = this.audioContext.createConvolver();
                    
                    // Configure oscillator
                    oscillator.type = seq.type;
                    oscillator.frequency.setValueAtTime(seq.freq, this.audioContext.currentTime);
                    
                    // Configure filter for space-like sound
                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(800 + Math.random() * 400, this.audioContext.currentTime);
                    filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
                    
                    // Configure gain envelope
                    const maxGain = seq.gain * this.musicVolume;
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(maxGain, this.audioContext.currentTime + 1);
                    gainNode.gain.linearRampToValueAtTime(maxGain * 0.8, this.audioContext.currentTime + seq.duration - 1);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + seq.duration);
                    
                    // Add subtle frequency modulation for organic feel
                    const lfo = this.audioContext.createOscillator();
                    const lfoGain = this.audioContext.createGain();
                    
                    lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.3, this.audioContext.currentTime);
                    lfoGain.gain.setValueAtTime(seq.freq * 0.01, this.audioContext.currentTime);
                    
                    // Connect audio graph
                    lfo.connect(lfoGain);
                    lfoGain.connect(oscillator.frequency);
                    
                    oscillator.connect(filter);
                    filter.connect(gainNode);
                    gainNode.connect(this.musicGainNode);
                    
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
        
        // Schedule next sequence with slight variation
        const nextSequenceDelay = 16000 + (Math.random() * 4000); // 16-20 seconds
        setTimeout(() => {
            if (this.isPlaying) {
                this.playAmbientSequence();
            }
        }, nextSequenceDelay);
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
