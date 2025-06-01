// Advanced Alien Theme Extensions with Quantum Effects

import { alienSpecies, planetNames } from './alienTheme.js';

// Quantum-enhanced alien civilizations
export const quantumCivilizations = [
  {
    name: "Quantum Architects",
    technology: "Reality Manipulation",
    homeworld: "Nexus Prime",
    abilities: ["Dimensional phasing", "Time dilation", "Matter reconstruction"],
    threat_level: 9,
    description: "Masters of quantum mechanics who can alter reality at the subatomic level"
  },
  {
    name: "Void Swimmers",
    technology: "Dark Energy Harvesting",
    homeworld: "Event Horizon",
    abilities: ["Black hole navigation", "Gravity manipulation", "Dark matter shielding"],
    threat_level: 8,
    description: "Beings who thrive in the emptiness between galaxies"
  },
  {
    name: "Neural Collective",
    technology: "Consciousness Networking",
    homeworld: "Synapsis",
    abilities: ["Telepathic communication", "Memory sharing", "Collective problem solving"],
    threat_level: 7,
    description: "A hive mind spanning across multiple star systems"
  },
  {
    name: "Plasma Entities",
    technology: "Energy Embodiment",
    homeworld: "Solar Core Beta",
    abilities: ["Energy form shifting", "Stellar manipulation", "Electromagnetic control"],
    threat_level: 6,
    description: "Pure energy beings living within stars"
  }
];

// Advanced cosmic phenomena
export const cosmicPhenomena = [
  {
    name: "Quantum Storm",
    effect: "Reality distortion field - all players swap positions",
    rarity: "Ultra Rare",
    visual: "Swirling particles of light and dark energy",
    color: "#8A2BE2"
  },
  {
    name: "Wormhole Cascade",
    effect: "Instant teleportation to random location on board",
    rarity: "Rare",
    visual: "Spiraling vortex of spacetime",
    color: "#00CED1"
  },
  {
    name: "Temporal Rift",
    effect: "Take an extra turn or skip next turn (50/50 chance)",
    rarity: "Uncommon",
    visual: "Fractured timeline with clock imagery",
    color: "#FFD700"
  },
  {
    name: "Nebula Drift",
    effect: "Move 1-3 spaces in any direction",
    rarity: "Common",
    visual: "Colorful gas clouds with stellar nurseries",
    color: "#FF69B4"
  }
];

// Evolutionary alien technology tiers
export const technologyTiers = [
  {
    tier: 1,
    name: "Primitive",
    description: "Stone tools and basic agriculture",
    examples: ["Cave dwellings", "Fire mastery", "Simple weapons"]
  },
  {
    tier: 2,
    name: "Industrial",
    description: "Mechanical power and mass production",
    examples: ["Steam engines", "Manufacturing", "Wheeled transport"]
  },
  {
    tier: 3,
    name: "Electronic",
    description: "Computers and digital communication",
    examples: ["Computers", "Radio waves", "Nuclear power"]
  },
  {
    tier: 4,
    name: "Space-faring",
    description: "Interplanetary travel and colonization",
    examples: ["Rocket technology", "Satellites", "Space stations"]
  },
  {
    tier: 5,
    name: "Stellar",
    description: "Interstellar travel and stellar engineering",
    examples: ["FTL drives", "Dyson spheres", "Terraforming"]
  },
  {
    tier: 6,
    name: "Galactic",
    description: "Galaxy-wide civilization and megastructures",
    examples: ["Ringworlds", "Galactic networks", "Star lifting"]
  },
  {
    tier: 7,
    name: "Universal",
    description: "Universe-spanning influence and reality manipulation",
    examples: ["Dimension travel", "Time control", "Reality engines"]
  }
];

// Advanced game mechanics
export const advancedMechanics = {
  // Quantum dice that can exist in superposition
  quantumDice: {
    rollMultiple: () => {
      const results = [];
      for (let i = 0; i < 3; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
      }
      return results;
    },
    
    chooseResult: (results) => {
      // Player can choose which result to use from the quantum superposition
      return results;
    }
  },
  
  // Dimensional phasing - pass through obstacles
  dimensionalPhase: {
    duration: 3, // turns
    effect: "Ignore obstacle effects",
    visualEffect: "Player token becomes translucent with particle trail"
  },
  
  // Time dilation effects
  timeDilation: {
    slowTime: "Take two turns in a row",
    fastTime: "Skip next turn but move double distance",
    timeLoop: "Repeat last turn exactly"
  }
};

// Cosmic event system
export class CosmicEventSystem {
  constructor() {
    this.activeEvents = [];
    this.eventProbability = 0.15; // 15% chance per turn
  }
  
  checkForEvent() {
    if (Math.random() < this.eventProbability) {
      return this.triggerRandomEvent();
    }
    return null;
  }
  
  triggerRandomEvent() {
    const event = cosmicPhenomena[Math.floor(Math.random() * cosmicPhenomena.length)];
    this.activeEvents.push({
      ...event,
      duration: Math.floor(Math.random() * 3) + 1,
      triggeredTurn: Date.now()
    });
    return event;
  }
  
  updateEvents() {
    this.activeEvents = this.activeEvents.filter(event => {
      event.duration--;
      return event.duration > 0;
    });
  }
}

// Advanced AI behaviors for alien species
export const alienAI = {
  Zorgons: {
    strategy: "Aggressive expansion",
    preferredActions: ["Direct assault", "Resource hoarding"],
    decisionWeight: (gameState) => {
      // Zorgons prefer risky, high-reward moves
      return gameState.risk * 1.5 + gameState.reward;
    }
  },
  
  Neburites: {
    strategy: "Technological superiority",
    preferredActions: ["Research advancement", "Defensive positioning"],
    decisionWeight: (gameState) => {
      // Neburites prefer safe, technology-focused strategies
      return gameState.technology * 2 + gameState.safety;
    }
  },
  
  Pyraxians: {
    strategy: "Diplomatic manipulation",
    preferredActions: ["Alliance formation", "Information gathering"],
    decisionWeight: (gameState) => {
      // Pyraxians prefer diplomatic and information-based moves
      return gameState.diplomacy * 1.8 + gameState.information;
    }
  },
  
  Quasarians: {
    strategy: "Balanced approach",
    preferredActions: ["Adaptive tactics", "Opportunity exploitation"],
    decisionWeight: (gameState) => {
      // Quasarians adapt to current game conditions
      return Math.max(gameState.risk, gameState.technology, gameState.diplomacy) * 1.2;
    }
  }
};

// Procedural alien language generator
export function generateAlienLanguage(baseWords, complexity = 'medium') {
  const prefixes = ['Zy', 'Qr', 'Xl', 'Vz', 'Nx', 'Ph', 'Th', 'Kr'];
  const middles = ['or', 'ax', 'el', 'in', 'og', 'uz', 'ek', 'av'];
  const suffixes = ['ion', 'ath', 'eos', 'rik', 'tol', 'nex', 'vor', 'zil'];
  
  const complexityLevels = {
    simple: 1,
    medium: 2,
    complex: 3
  };
  
  const syllables = complexityLevels[complexity] || 2;
  let word = '';
  
  word += prefixes[Math.floor(Math.random() * prefixes.length)];
  
  for (let i = 0; i < syllables - 1; i++) {
    word += middles[Math.floor(Math.random() * middles.length)];
  }
  
  word += suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return word;
}

// Advanced card effects with quantum mechanics
export const quantumCardEffects = {
  "Quantum Entanglement": {
    description: "Link with another player - when they move, you move the same distance",
    duration: 3,
    type: "persistent",
    rarity: "legendary"
  },
  
  "Superposition Collapse": {
    description: "Roll 3 dice simultaneously, choose which result becomes reality",
    duration: 1,
    type: "instant",
    rarity: "epic"
  },
  
  "Temporal Paradox": {
    description: "Return to your position from 2 turns ago, but keep any benefits gained",
    duration: 1,
    type: "instant",
    rarity: "rare"
  },
  
  "Dark Energy Surge": {
    description: "Phase through obstacles for the next 3 turns",
    duration: 3,
    type: "persistent",
    rarity: "epic"
  },
  
  "Consciousness Transfer": {
    description: "Swap positions with any other player",
    duration: 1,
    type: "instant",
    rarity: "legendary"
  }
};

// Export all advanced features
export default {
  quantumCivilizations,
  cosmicPhenomena,
  technologyTiers,
  advancedMechanics,
  CosmicEventSystem,
  alienAI,
  generateAlienLanguage,
  quantumCardEffects
};