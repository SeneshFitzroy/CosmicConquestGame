// React Audio Manager for Cosmic Conquest
import { useEffect, useRef, useState } from 'react';

export const useCosmicAudio = () => {
  const audioContextRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play cosmic sound effect
  const playCosmicSound = (type = 'warp', customVolume = 0.1) => {
    if (!audioContextRef.current) return;
    
    try {
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'warp':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 1.5);
          gainNode.gain.setValueAtTime(customVolume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 1.5);
          break;
          
        case 'teleport':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(50, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(customVolume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
          
        case 'alert':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(customVolume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'click':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          gainNode.gain.setValueAtTime(customVolume * 0.5, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'hover':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          gainNode.gain.setValueAtTime(customVolume * 0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.05);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
          
        default:
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          gainNode.gain.setValueAtTime(customVolume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  // Start background music
  const startBackgroundMusic = () => {
    if (!audioContextRef.current || isPlaying) return;
    
    try {
      const audioContext = audioContextRef.current;
      
      // Create a complex ambient sound
      const createAmbientOscillator = (freq, type = 'sine', delay = 0) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.type = type;
        oscillator.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;
        
        gainNode.gain.value = volume * 0.1;
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime + delay);
        
        // Add some variation
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + delay);
        oscillator.frequency.linearRampToValueAtTime(freq * 1.1, audioContext.currentTime + delay + 10);
        oscillator.frequency.linearRampToValueAtTime(freq, audioContext.currentTime + delay + 20);
        
        return { oscillator, gainNode };
      };
      
      // Create multiple layers for rich ambient sound
      const layer1 = createAmbientOscillator(60, 'sine', 0);
      const layer2 = createAmbientOscillator(90, 'triangle', 2);
      const layer3 = createAmbientOscillator(120, 'sine', 4);
      
      backgroundMusicRef.current = [layer1, layer2, layer3];
      setIsPlaying(true);
      
    } catch (error) {
      console.warn('Background music failed to start:', error);
    }
  };

  // Stop background music
  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.forEach(layer => {
        if (layer.oscillator) {
          layer.oscillator.stop();
        }
      });
      backgroundMusicRef.current = null;
      setIsPlaying(false);
    }
  };

  // Update volume
  const updateVolume = (newVolume) => {
    setVolume(newVolume);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.forEach(layer => {
        if (layer.gainNode) {
          layer.gainNode.gain.value = newVolume * 0.1;
        }
      });
    }
  };

  return {
    playCosmicSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    updateVolume,
    isPlaying,
    volume
  };
};

export default useCosmicAudio;
