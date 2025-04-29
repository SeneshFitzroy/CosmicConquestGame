// Alien-themed elements and data for the game

// Alien planet names for board tiles
export const planetNames = [
  'Zorbon', 'Xelnar', 'Quvari', 'Trizion', 'Neplux',
  'Vazara', 'Yendis', 'Krolox', 'Juvine', 'Wexar',
  'Plorb', 'Draxis', 'Gliese', 'Haldar', 'Ixion'
];

// Alien species for player tokens
export const alienSpecies = [
  { name: 'Zorgons', color: '#00E676', icon: '👽' }, // Green aliens
  { name: 'Neburites', color: '#2979FF', icon: '👾' }, // Blue aliens
  { name: 'Pyraxians', color: '#FF3D00', icon: '🛸' }, // Red aliens
  { name: 'Quasarians', color: '#AA00FF', icon: '🌌' }  // Purple aliens
];

// Alien-themed obstacle cards
export const alienObstacles = [
  {
    title: "Meteor Shower",
    description: "A sudden meteor shower forces your ship back 3 spaces.",
    color: "#FF3D00"
  },
  {
    title: "Gravity Anomaly",
    description: "A strange gravitational field stops your ship for 1 turn.",
    color: "#FF3D00"
  },
  {
    title: "Space Pirates",
    description: "Your ship is intercepted by space pirates. Move back 2 spaces.",
    color: "#FF3D00"
  },
  {
    title: "Wormhole",
    description: "Your ship gets sucked into a wormhole. Skip 1 turn to escape.",
    color: "#FF3D00"
  },
  {
    title: "Solar Flare",
    description: "A solar flare disrupts your navigation. Go back 1 space.",
    color: "#FF3D00"
  },
  {
    title: "Alien Virus",
    description: "Your crew contracts an alien virus. Skip 2 turns for quarantine.",
    color: "#FF3D00"
  }
];

// Alien-themed chance cards
export const alienChances = [
  {
    title: "Hyperspace Jump",
    description: "Your ship makes a successful hyperspace jump. Move forward 3 spaces.",
    color: "#2979FF"
  },
  {
    title: "Alien Alliance",
    description: "You form an alliance with a friendly alien species. Move ahead 2 spaces.",
    color: "#2979FF"
  },
  {
    title: "Quantum Propulsion",
    description: "Your engines receive a quantum boost. Roll again.",
    color: "#2979FF"
  },
  {
    title: "Stardust Trail",
    description: "You discover a stardust trail that acts as a shortcut. Move forward 4 spaces.",
    color: "#2979FF"
  },
  {
    title: "Telepathic Map",
    description: "Alien telepathy reveals a secret route. Teleport to the next special tile.",
    color: "#2979FF"
  },
  {
    title: "Time Distortion",
    description: "A time distortion gives you an extra turn.",
    color: "#2979FF"
  }
];

// Cosmic sound effects
export const cosmicSounds = {
  dice: "space_dice.mp3",
  obstacle: "alert.mp3",
  chance: "discovery.mp3",
  move: "warp.mp3",
  win: "victory.mp3"
};

// Generate alien language for messages
export function alienLanguage(message) {
  // Translate some common words to alien language
  const translations = {
    "rolled": "zorbified",
    "landed": "quantumized",
    "turn": "cycle",
    "move": "warp",
    "forward": "lightward",
    "back": "darkward",
    "player": "cosmic explorer",
    "space": "parsec",
    "spaces": "parsecs",
    "tile": "planet",
    "card": "artifact",
    "dice": "probability cube",
    "game": "cosmic journey",
    "win": "interstellar victory",
    "skip": "cryosleep"
  };
  
  // Apply translations
  let alienMessage = message;
  Object.keys(translations).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    alienMessage = alienMessage.replace(regex, translations[word]);
  });
  
  return alienMessage;
}

// CSS variables for alien theme
export const alienThemeCSS = {
  backgroundColor: '#000B27', // Deep space
  primaryColor: '#00E676', // Alien green
  secondaryColor: '#2979FF', // Cosmic blue
  accentColor: '#AA00FF', // Nebula purple
  obstacleColor: '#FF3D00', // Alert red
  chanceColor: '#00B0FF', // Opportunity blue
  textColor: '#E0F7FA', // Light cosmic blue
  startTileColor: '#00E676', // Alien green
  endTileColor: '#AA00FF', // Nebula purple
  tileBackgroundColor: '#0D2149', // Space blue
  borderGlow: '0 0 10px #00E676', // Green glow
  starfieldBackground: 'radial-gradient(circle at center, #001440 0%, #000000 100%)'
};
