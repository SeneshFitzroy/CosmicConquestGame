// Advanced cosmic effects and animations for the alien theme

// Generate random alien text glyphs
export function generateAlienGlyphs(length = 5) {
  const alienChars = '፨፷፪✧☉⌬ⵎ⎔⏣⏥⏢☫☬⚹✸✷⚝᥎⚛☄⚚⍟⌖♄♅⯐⯑';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alienChars.charAt(Math.floor(Math.random() * alienChars.length));
  }
  return result;
}

// Create wormhole animation
export function createWormholeEffect(element) {
  if (!element) return;
  
  const wormhole = document.createElement('div');
  wormhole.className = 'wormhole-effect';
  
  // Create concentric circles for wormhole
  for (let i = 0; i < 5; i++) {
    const circle = document.createElement('div');
    circle.className = 'wormhole-circle';
    circle.style.animationDelay = `${i * 0.2}s`;
    wormhole.appendChild(circle);
  }
  
  element.appendChild(wormhole);
  
  // Remove after animation completes
  setTimeout(() => {
    if (element.contains(wormhole)) {
      element.removeChild(wormhole);
    }
  }, 3000);
}

// Create hologram flicker effect
export function hologramFlicker(element) {
  if (!element) return;
  
  // Add flicker class
  element.classList.add('hologram-flicker');
  
  // Create scan line effect
  const scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  element.appendChild(scanLine);
  
  // Create glitch effect occasionally
  const glitchInterval = setInterval(() => {
    element.classList.add('glitch');
    setTimeout(() => {
      element.classList.remove('glitch');
    }, 200);
  }, 3000);
  
  return () => {
    clearInterval(glitchInterval);
    element.classList.remove('hologram-flicker');
    if (element.contains(scanLine)) {
      element.removeChild(scanLine);
    }
  };
}

// Generate cosmic ambient sounds
export function playCosmicSound(type) {
  if (typeof window === 'undefined') return;
  
  // Use AudioContext for advanced sound generation
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch (type) {
    case 'warp':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 1.5);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.5);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1.5);
      break;
      
    case 'teleport':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(50, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      break;
      
    case 'alert':
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.6);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
      break;
      
    case 'victory':
      // Play victory sequence
      let now = audioContext.currentTime;
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.setValueAtTime(660, now + 0.2);
      oscillator.frequency.setValueAtTime(880, now + 0.4);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      oscillator.start();
      oscillator.stop(now + 1.5);
      break;
  }
}

// Create star portal effect
export function createStarPortal(parent, callback) {
  if (!parent || typeof window === 'undefined') return;
  
  const portal = document.createElement('div');
  portal.className = 'star-portal';
  
  const stars = 200;
  for (let i = 0; i < stars; i++) {
    const star = document.createElement('div');
    star.className = 'portal-star';
    star.style.setProperty('--angle', `${Math.random() * 360}deg`);
    star.style.setProperty('--delay', `${Math.random()}s`);
    star.style.setProperty('--size', `${Math.random() * 3 + 1}px`);
    portal.appendChild(star);
  }
  
  const portalCore = document.createElement('div');
  portalCore.className = 'portal-core';
  portal.appendChild(portalCore);
  
  parent.appendChild(portal);
  
  // Execute callback after portal animation finishes
  setTimeout(() => {
    if (parent.contains(portal)) {
      parent.removeChild(portal);
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }, 3000);
}

// Alien planet data with biomes and characteristics
export const alienPlanets = [
  {
    name: "Zygorion",
    type: "Gas Giant",
    color: "#4A00E0",
    description: "Massive gas planet with floating crystal cities",
    danger: 2
  },
  {
    name: "Xeltrox",
    type: "Desert",
    color: "#FFA200",
    description: "Scorching sand world with silicon-based life",
    danger: 4
  },
  {
    name: "Quasar-9",
    type: "Oceanic",
    color: "#00C2FF",
    description: "Planet-wide ocean with bioluminescent megafauna",
    danger: 3
  },
  {
    name: "Nimbulus",
    type: "Cloud",
    color: "#EAEAEA",
    description: "Low-gravity world with floating islands",
    danger: 1
  },
  {
    name: "Vulcania",
    type: "Volcanic",
    color: "#FF3D00",
    description: "Volcanic hellscape with fire-resistant organisms",
    danger: 5
  },
  {
    name: "Glacius",
    type: "Ice",
    color: "#A1FFFF",
    description: "Frozen planet with subterranean thermal ecosystems",
    danger: 3
  },
  {
    name: "Chloros",
    type: "Jungle",
    color: "#00E676",
    description: "Dense vegetation with carnivorous plants",
    danger: 4
  },
  {
    name: "Neo Terra",
    type: "Earth-like",
    color: "#64DD17",
    description: "Habitable world with primitive civilizations",
    danger: 1
  },
  {
    name: "Obsidius",
    type: "Crystalline",
    color: "#AA00FF",
    description: "Crystal formations that respond to thought",
    danger: 2
  },
  {
    name: "Arachnia",
    type: "Hive",
    color: "#795548",
    description: "Entire planet dominated by insectoid hive mind",
    danger: 5
  },
  {
    name: "Nebulon",
    type: "Gaseous",
    color: "#2979FF",
    description: "Thin atmosphere with floating gas-bag creatures",
    danger: 3
  },
  {
    name: "Metallica",
    type: "Mechanical",
    color: "#607D8B",
    description: "Ancient world covered in ruins of mechanical civilization",
    danger: 4
  },
  {
    name: "Phantasma",
    type: "Ethereal",
    color: "#B388FF",
    description: "Phase-shifting world that exists partially in another dimension",
    danger: 5
  },
  {
    name: "Auroria",
    type: "Luminous",
    color: "#FFD700",
    description: "Glowing landscapes and light-based lifeforms",
    danger: 2
  },
  {
    name: "Terminus",
    type: "Black Hole",
    color: "#000000",
    description: "Planet on the edge of a black hole with extreme time dilation",
    danger: 5
  }
];
