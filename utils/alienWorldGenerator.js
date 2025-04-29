// Advanced alien world generator for cosmic game environments

// Atmospheric conditions for alien worlds
const atmospheres = [
  { type: 'Oxygen-rich', color: '#a1ffff', survivability: 'High', effects: 'Enhanced vitality' },
  { type: 'Methane-dominant', color: '#a371f7', survivability: 'Low', effects: 'Toxic without protection' },
  { type: 'Hydrogen-helium', color: '#ffffaa', survivability: 'None', effects: 'Extreme pressure' },
  { type: 'Nitrogen-oxygen', color: '#cceeff', survivability: 'High', effects: 'Earth-like conditions' },
  { type: 'Chlorine', color: '#aaff77', survivability: 'None', effects: 'Highly corrosive' },
  { type: 'Sulfuric', color: '#ffffaa', survivability: 'Low', effects: 'Corrosive to equipment' },
  { type: 'Carbon dioxide', color: '#ffaa77', survivability: 'Low', effects: 'Requires oxygen supply' },
  { type: 'Ammonia', color: '#aaaaff', survivability: 'None', effects: 'Freezing temperatures' },
  { type: 'Exotic particles', color: '#ff77ff', survivability: 'Unknown', effects: 'Unpredictable anomalies' }
];

// Geological features for terrain generation
const geologicalFeatures = [
  { name: 'Crystal spires', frequency: 'Rare', resources: 'Energy crystals', hazards: 'Reflective beam damage' },
  { name: 'Floating islands', frequency: 'Uncommon', resources: 'Anti-gravity minerals', hazards: 'Fatal falls' },
  { name: 'Plasma rivers', frequency: 'Rare', resources: 'Liquid energy', hazards: 'Extreme heat' },
  { name: 'Silicon forests', frequency: 'Common', resources: 'Crystalline wood', hazards: 'Shattering explosions' },
  { name: 'Magnetic peaks', frequency: 'Uncommon', resources: 'Magnetite ore', hazards: 'Equipment failure' },
  { name: 'Quantum lakes', frequency: 'Rare', resources: 'Probability matter', hazards: 'Phasing in/out of reality' },
  { name: 'Metallic dunes', frequency: 'Common', resources: 'Rare metals', hazards: 'Conductor during storms' },
  { name: 'Gas vents', frequency: 'Common', resources: 'Exotic gases', hazards: 'Toxic eruptions' },
  { name: 'Temporal rifts', frequency: 'Very rare', resources: 'Time-dilated materials', hazards: 'Aging/de-aging' },
  { name: 'Bioluminescent caverns', frequency: 'Uncommon', resources: 'Light-producing fungi', hazards: 'Toxic spores' }
];

// Life forms that might be encountered
const alienLifeForms = [
  { species: 'Crystallomorphs', intelligence: 'Hivemind', danger: 'Medium', abilities: 'Light refraction, regeneration' },
  { species: 'Void Drifters', intelligence: 'High', danger: 'Low', abilities: 'Telepathy, phase-shifting' },
  { species: 'Magmites', intelligence: 'Low', danger: 'High', abilities: 'Heat generation, fire immunity' },
  { species: 'Quantum Echoes', intelligence: 'Unknowable', danger: 'Variable', abilities: 'Time manipulation, probability alteration' },
  { species: 'Aeroforms', intelligence: 'Medium', danger: 'Low', abilities: 'Gaseous form, weather control' },
  { species: 'Silicoids', intelligence: 'Medium', danger: 'Medium', abilities: 'Extreme durability, mineral absorption' },
  { species: 'Neural Webs', intelligence: 'High', danger: 'Medium', abilities: 'Mind control, knowledge absorption' },
  { species: 'Voidswimmers', intelligence: 'Low', danger: 'High', abilities: 'Space travel, energy absorption' },
  { species: 'Photosynthoids', intelligence: 'Medium', danger: 'Low', abilities: 'Light manipulation, rapid growth' }
];

// Celestial bodies that can host alien worlds
const celestialBodyTypes = [
  'Planet', 'Moon', 'Asteroid', 'Dwarf Planet', 'Space Station', 
  'Artificial Construct', 'Rogue Planet', 'Neutron Star Surface', 
  'Gas Giant Floating City', 'Dimensional Intersection'
];

// Alien civilization types
const civilizationTypes = [
  { type: 'Pre-industrial', tech: 'Primitive', structures: 'Simple constructions', government: 'Tribal' },
  { type: 'Industrial', tech: 'Mechanical', structures: 'Factories, cities', government: 'Nations' },
  { type: 'Information Age', tech: 'Digital', structures: 'Connected cities', government: 'Global alliances' },
  { type: 'Space Age', tech: 'Interplanetary', structures: 'Orbital habitats', government: 'Planetary council' },
  { type: 'Interstellar', tech: 'FTL capability', structures: 'Megastructures', government: 'Stellar federation' },
  { type: 'Type I', tech: 'Planetary energy', structures: 'Planetary engineering', government: 'Unified species' },
  { type: 'Type II', tech: 'Stellar energy', structures: 'Dyson structures', government: 'System collective' },
  { type: 'Type III', tech: 'Galactic energy', structures: 'Galaxy-spanning', government: 'Galactic overmind' },
  { type: 'Post-physical', tech: 'Energy/information beings', structures: 'Virtual realms', government: 'Consensus reality' },
  { type: 'Ancient/Extinct', tech: 'Mysterious artifacts', structures: 'Ruins', government: 'None remaining' }
];

// Generate a random alien world with consistent properties
export function generateAlienWorld() {
  // Choose a celestial body type
  const bodyType = celestialBodyTypes[Math.floor(Math.random() * celestialBodyTypes.length)];
  
  // Select size category
  const sizeCategories = ['Tiny', 'Small', 'Medium', 'Large', 'Massive'];
  const size = sizeCategories[Math.floor(Math.random() * sizeCategories.length)];
  
  // Select atmosphere
  const atmosphere = atmospheres[Math.floor(Math.random() * atmospheres.length)];
  
  // Select gravity level
  const gravityLevels = ['Very Low (0.1-0.5G)', 'Low (0.5-0.8G)', 'Earth-like (0.8-1.2G)', 
                         'High (1.2-2G)', 'Very High (2-5G)', 'Extreme (5G+)'];
  const gravity = gravityLevels[Math.floor(Math.random() * gravityLevels.length)];
  
  // Determine temperature range
  const temperatureRanges = ['Frozen (-200°C to -50°C)', 'Cold (-50°C to 0°C)', 'Temperate (0°C to 30°C)', 
                            'Hot (30°C to 100°C)', 'Extreme Heat (100°C to 500°C)', 'Plasma-level (500°C+)'];
  const temperature = temperatureRanges[Math.floor(Math.random() * temperatureRanges.length)];
  
  // Select 1-3 geological features
  const features = [];
  const featureCount = Math.floor(Math.random() * 3) + 1;
  const shuffledFeatures = [...geologicalFeatures].sort(() => 0.5 - Math.random());
  for (let i = 0; i < featureCount; i++) {
    features.push(shuffledFeatures[i]);
  }
  
  // Determine if life exists
  const hasLife = Math.random() > 0.3; // 70% chance of life
  
  let lifeforms = [];
  let civilization = null;
  
  if (hasLife) {
    // Select 1-4 lifeforms
    const lifeformCount = Math.floor(Math.random() * 4) + 1;
    const shuffledLifeforms = [...alienLifeForms].sort(() => 0.5 - Math.random());
    for (let i = 0; i < lifeformCount; i++) {
      lifeforms.push(shuffledLifeforms[i]);
    }
    
    // 30% chance of civilization if life exists
    if (Math.random() > 0.7) {
      civilization = civilizationTypes[Math.floor(Math.random() * civilizationTypes.length)];
    }
  }
  
  // Generate a planet name
  const generatePlanetName = () => {
    const prefixes = ['Xen', 'Zor', 'Thal', 'Kry', 'Vex', 'Qu', 'Az', 'Ul', 'Nyx', 'Eos'];
    const middleParts = ['or', 'ar', 'ix', 'on', 'an', 'il', 'ob', 'ax', 'un', 'eg'];
    const suffixes = ['ia', 'us', 'um', 'ix', 'or', 'is', 'oid', 'ar', 'yn', 'ux'];
    
    const useMiddle = Math.random() > 0.5;
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const middle = useMiddle ? middleParts[Math.floor(Math.random() * middleParts.length)] : '';
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return prefix + middle + suffix;
  };
  
  // Generate resources and dangers
  const resourceTypes = ['Energy crystals', 'Rare metals', 'Exotic gases', 'Biological compounds', 
                         'Ancient technology', 'Quantum particles', 'Dimensional fragments'];
  
  const dangerTypes = ['Extreme weather', 'Predatory lifeforms', 'Radiation', 'Toxic atmosphere',
                       'Gravitational anomalies', 'Temporal distortions', 'Rogue AI defenses'];
  
  const resources = resourceTypes
    .filter(() => Math.random() > 0.7)
    .slice(0, 3);
    
  const dangers = dangerTypes
    .filter(() => Math.random() > 0.6)
    .slice(0, 3);
  
  // Assign a color palette for the planet
  const generateColorPalette = () => {
    // Base the primary color on the atmosphere
    const primary = atmosphere.color;
    
    // Generate complementary colors
    const hslToRgb = (h, s, l) => {
      let r, g, b;
    
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
    
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
    
      return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
    };
    
    // Extract hue from primary color
    const hexToHsl = (hex) => {
      // Convert hex to RGB
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      
      // Find greatest and smallest channel values
      let cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;
          
      // Calculate hue
      if (delta === 0) h = 0;
      else if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      
      // Calculate lightness
      l = (cmax + cmin) / 2;
      
      // Calculate saturation
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
      return [h/360, s, l];
    };
    
    const [h, s, l] = hexToHsl(primary);
    
    // Generate complementary and analogous colors
    const secondary = hslToRgb((h + 0.5) % 1, s, l); // Complementary
    const accent1 = hslToRgb((h + 0.3) % 1, s, l);   // Analogous 1
    const accent2 = hslToRgb((h + 0.7) % 1, s, l);   // Analogous 2
    
    return {
      primary,
      secondary,
      accent1,
      accent2
    };
  };
  
  return {
    name: generatePlanetName(),
    bodyType,
    size,
    atmosphere: atmosphere.type,
    atmosphereColor: atmosphere.color,
    gravity,
    temperature,
    features,
    hasLife,
    lifeforms,
    civilization,
    resources,
    dangers,
    survivability: atmosphere.survivability,
    colors: generateColorPalette()
  };
}

// Generate a set of planets for game board
export function generateGamePlanets(count) {
  const planets = [];
  for (let i = 0; i < count; i++) {
    planets.push(generateAlienWorld());
  }
  return planets;
}
