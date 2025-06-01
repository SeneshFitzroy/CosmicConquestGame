import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { generateAlienGlyphs, playCosmicSound } from '../utils/cosmicEffects';
import useCosmicAudio from '../utils/useCosmicAudio';

export default function Home() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Zorgon Explorer', position: 0, color: '#00E676', icon: '👽' },
    { id: 2, name: 'Neburite Captain', position: 0, color: '#2979FF', icon: '👾' }
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [boardSize] = useState(15);
  const [gameBoard, setGameBoard] = useState([]);
  const [diceValue, setDiceValue] = useState(null);
  const [gameMessage, setGameMessage] = useState('Prepare for interstellar journey!');
  const [isRolling, setIsRolling] = useState(false);
  const [cardToShow, setCardToShow] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  
  // Initialize stars and nebulae state variables
  const [stars, setStars] = useState([]);
  const [nebulae, setNebulae] = useState([]);
  
  // Enhanced game state
  const [gameMode, setGameMode] = useState('standard'); // standard, hardcore, exploration
  const [alienRankings, setAlienRankings] = useState([
    { race: 'Zorgons', victories: 12, losses: 3 },
    { race: 'Neburites', victories: 10, losses: 5 },
    { race: 'Pyraxians', victories: 8, losses: 7 },
    { race: 'Quasarians', victories: 6, losses: 9 }
  ]);
  const [showEnhancedUI, setShowEnhancedUI] = useState(true);
  const [interactiveBG, setInteractiveBG] = useState(true);
  const [hologramMode, setHologramMode] = useState(false); // Added the missing hologramMode state
  const [alienRace, setAlienRace] = useState("Zorgons");
  const [galaxyName, setGalaxyName] = useState("Andromeda Nexus");
  const [showIntro, setShowIntro] = useState(true);
    // Add sound enabled state
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Add modal states
  const [showCosmicCodex, setShowCosmicCodex] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
    // Refs for animations and interactive elements
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const gameboardRef = useRef(null);
  const starsRef = useRef(null);

  // Audio system
  const { 
    playCosmicSound: playAudioSound, 
    startBackgroundMusic, 
    stopBackgroundMusic, 
    updateVolume, 
    isPlaying: isMusicPlaying 
  } = useCosmicAudio();

  // Add a hologram flicker effect function
  const hologramFlicker = (element) => {
    if (!element) return () => {};
    
    // Add a class for the flicker effect
    element.classList.add(styles.hologramFlicker);
    
    // Return cleanup function
    return () => {
      element.classList.remove(styles.hologramFlicker);
    };
  };

  // Generate starfield on component mount
  useEffect(() => {
    generateStarfield();
    
    // Apply hologram effect if enabled
    if (hologramMode && titleRef.current) {
      const cleanup = hologramFlicker(titleRef.current);
      return cleanup;
    }
  }, [hologramMode]);
  
  // Generate dynamic stars
  const generateStarfield = () => {
    const newStars = [];
    const newNebulae = [];
    
    // Generate stars
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 5}s`
      });
    }
    
    // Generate nebulae
    const nebulaColors = ['#AA00FF', '#2979FF', '#00E676', '#FF3D00'];
    for (let i = 0; i < 4; i++) {
      newNebulae.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 300 + 100}px`,
        height: `${Math.random() * 300 + 100}px`,
        color: nebulaColors[i]
      });
    }
    
    setStars(newStars);
    setNebulae(newNebulae);
  };

  // Initialize game board function
  const initializeBoard = () => {
    const board = [];
    
    // Create a board with 15 tiles
    for (let i = 0; i < boardSize; i++) {
      let tileType = 'normal';
      
      if (i === 0) {
        tileType = 'start';
      } else if (i === boardSize - 1) {
        tileType = 'end';
      } else if (i % 3 === 1) { // Obstacle tiles
        tileType = 'obstacle';
      } else if (i % 4 === 2) { // Chance tiles
        tileType = 'chance';
      }
      
      board.push({
        position: i,
        type: tileType,
        label: tileType === 'start' ? 'START' : 
               tileType === 'end' ? 'FINISH' : 
               tileType === 'obstacle' ? 'O' : 
               tileType === 'chance' ? 'C' : 
               i.toString()
      });
    }
    
    setGameBoard(board);
  };

  // Initialize game board when game starts
  useEffect(() => {
    if (gameStarted) {
      initializeBoard();
    }
  }, [gameStarted]);

  // Player movement function - moved inside the component to access state
  const movePlayer = (player, steps) => {
    if (!player) return;
    
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex(p => p.id === player.id);
    
    if (playerIndex === -1) return;
    
    // Update position
    updatedPlayers[playerIndex].position += steps;
    
    // Make sure not to go beyond board
    if (updatedPlayers[playerIndex].position >= boardSize - 1) {
      updatedPlayers[playerIndex].position = boardSize - 1;
      setShowWinner(true);
    }
    
    // Make sure not to go below zero
    if (updatedPlayers[playerIndex].position < 0) {
      updatedPlayers[playerIndex].position = 0;
    }
    
    setPlayers(updatedPlayers);
    
    // Check for special tiles
    const newPosition = updatedPlayers[playerIndex].position;
    const currentTile = gameBoard.find(tile => tile.position === newPosition);
    
    if (currentTile) {
      // Handle special tile effects
      if (currentTile.type === 'obstacle') {
        setGameMessage(`${player.name} landed on an Obstacle!`);
        // Could trigger obstacle effects here
      } else if (currentTile.type === 'chance') {
        setGameMessage(`${player.name} landed on a Chance!`);
        // Could trigger chance effects here
      }
    }
      // Play sound if enabled
    if (soundEnabled) {
      playAudioSound('warp');
    }
    
    // Switch to next player
    setTimeout(() => {
      setCurrentPlayerIdx((currentPlayerIdx + 1) % players.length);
      setGameMessage(`${updatedPlayers[(currentPlayerIdx + 1) % players.length].name}'s turn.`);
    }, 1500);
  };

  // Handle mouse movement for interactive stars
  const handleMouseMove = (e) => {
    if (!interactiveBG || !starsRef.current) return;
    
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    
    // Move stars in parallax effect
    const stars = starsRef.current.querySelectorAll(`.${styles.star}`);
    stars.forEach((star, index) => {
      const depth = 1 + index % 5 / 5;
      const translateX = moveX / (50 * depth);
      const translateY = moveY / (50 * depth);
      star.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  };
  
  // Handle scroll for enhanced parallax
  const handleScroll = () => {
    if (!showEnhancedUI) return;
    
    const scrollY = window.scrollY;
    if (titleRef.current) {
      titleRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      titleRef.current.style.opacity = 1 - scrollY / 300;
    }
  };
  
  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Generate more immersive starfield
    generateEnhancedStarfield();
    
    // Pulse animation for title
    const titlePulse = setInterval(() => {
      if (titleRef.current) {
        titleRef.current.classList.add(styles.titlePulse);
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.classList.remove(styles.titlePulse);
          }
        }, 1000);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(titlePulse);
    };
  }, [interactiveBG, showEnhancedUI]);
  
  // Generate enhanced starfield with more variety
  const generateEnhancedStarfield = () => {
    const newStars = [];
    const newNebulae = [];
    
    // More stars with varying sizes and colors
    for (let i = 0; i < 150; i++) {
      const starSize = Math.random() * 3 + 1;
      const hue = Math.floor(Math.random() * 60) + 180; // Blue to cyan range
      const saturation = Math.floor(Math.random() * 50) + 50;
      const lightness = Math.floor(Math.random() * 30) + 70;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      newStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${starSize}px`,
        color: i % 10 === 0 ? color : 'white', // Some colored stars
        animationDuration: `${Math.random() * 5 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
        twinkleType: i % 3 // Different twinkling effects
      });
    }
    
    // More detailed and varied nebulae
    const nebulaColors = [
      'radial-gradient(ellipse at center, rgba(170, 0, 255, 0.4) 0%, rgba(170, 0, 255, 0) 70%)',
      'radial-gradient(ellipse at center, rgba(41, 121, 255, 0.4) 0%, rgba(41, 121, 255, 0) 70%)',
      'radial-gradient(ellipse at center, rgba(0, 230, 118, 0.4) 0%, rgba(0, 230, 118, 0) 70%)',
      'radial-gradient(ellipse at center, rgba(255, 61, 0, 0.4) 0%, rgba(255, 61, 0, 0) 70%)',
      'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0) 70%)'
    ];
    
    for (let i = 0; i < 5; i++) {
      newNebulae.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 500 + 200}px`,
        height: `${Math.random() * 500 + 200}px`,
        background: nebulaColors[i],
        transform: `rotate(${Math.random() * 360}deg)`
      });
    }
    
    setStars(newStars);
    setNebulae(newNebulae);
  };
  
  // Create dynamic shooting stars
  const createShootingStar = () => {
    if (!starsRef.current) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = styles.shootingStar;
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const angle = Math.random() * 45 + 15; // 15-60 degree angle
    
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    starsRef.current.appendChild(shootingStar);
    
    setTimeout(() => {
      if (starsRef.current && starsRef.current.contains(shootingStar)) {
        starsRef.current.removeChild(shootingStar);
      }
    }, 1000);
  };
  
  // Create shooting stars periodically
  useEffect(() => {
    if (!interactiveBG) return;
    
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, 2000);
    
    return () => clearInterval(shootingStarInterval);
  }, [interactiveBG]);
  
  // Toggle UI enhancement settings
  const toggleEnhancedUI = () => {
    setShowEnhancedUI(!showEnhancedUI);
  };
  
  const toggleInteractiveBG = () => {
    setInteractiveBG(!interactiveBG);
  };
  
  // Choose game mode
  const selectGameMode = (mode) => {
    setGameMode(mode);
    
    // Update UI based on mode
    if (mode === 'hardcore') {
      // Darker, more intense colors
      document.documentElement.style.setProperty('--primary-color', '#ff3d00');
      document.documentElement.style.setProperty('--glow-color', '#ff3d00');
    } else if (mode === 'exploration') {
      // Softer, more wondrous colors
      document.documentElement.style.setProperty('--primary-color', '#aa00ff');
      document.documentElement.style.setProperty('--glow-color', '#aa00ff');
    } else {
      // Standard colors
      document.documentElement.style.setProperty('--primary-color', '#00e676');
      document.documentElement.style.setProperty('--glow-color', '#00e676');
    }
  };
  
  // Interactive title component
  const InteractiveTitle = () => {
    return (
      <h1 
        className={styles.title} 
        ref={titleRef}
        data-text="Cosmic Conquest: Beyond The Void"
      >
        <span className={styles.titlePrefix}>ULTRA</span>
        Cosmic Conquest
        <span className={styles.titleSuffix}>Beyond The Void</span>
        <div className={styles.titleUnderline}></div>
      </h1>
    );
  };
  
  // Game mode selector component
  const GameModeSelector = () => {
    return (
      <div className={styles.modeSelector}>
        <h2 className={styles.modeTitle}>SELECT MISSION TYPE</h2>
        <div className={styles.modeOptions}>
          <div 
            className={`${styles.modeOption} ${gameMode === 'standard' ? styles.activeMode : ''}`}
            onClick={() => selectGameMode('standard')}
          >
            <div className={styles.modeIcon}>🚀</div>
            <h3>STANDARD</h3>
            <p>Classic cosmic adventure</p>
          </div>
          <div 
            className={`${styles.modeOption} ${gameMode === 'hardcore' ? styles.activeMode : ''}`}
            onClick={() => selectGameMode('hardcore')}
          >
            <div className={styles.modeIcon}>☠️</div>
            <h3>HARDCORE</h3>
            <p>Intense challenge with higher risks</p>
          </div>
          <div 
            className={`${styles.modeOption} ${gameMode === 'exploration' ? styles.activeMode : ''}`}
            onClick={() => selectGameMode('exploration')}
          >
            <div className={styles.modeIcon}>🔭</div>
            <h3>EXPLORATION</h3>
            <p>Discover unique cosmic phenomena</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Alien race rankings component
  const AlienRankings = () => {
    return (
      <div className={styles.rankingsContainer}>
        <h2 className={styles.rankingsTitle}>GALACTIC DOMINANCE</h2>
        <div className={styles.rankingsTable}>
          <div className={styles.rankingsHeader}>
            <div className={styles.rankColumn}>RANK</div>
            <div className={styles.raceColumn}>SPECIES</div>
            <div className={styles.statsColumn}>VICTORIES</div>
            <div className={styles.statsColumn}>LOSSES</div>
            <div className={styles.ratioColumn}>RATIO</div>
          </div>
          {alienRankings.sort((a, b) => b.victories - a.victories).map((race, index) => (
            <div key={race.race} className={styles.rankingRow}>
              <div className={styles.rankColumn}>{index + 1}</div>
              <div className={styles.raceColumn}>{race.race}</div>
              <div className={styles.statsColumn}>{race.victories}</div>
              <div className={styles.statsColumn}>{race.losses}</div>
              <div className={styles.ratioColumn}>{(race.victories / (race.victories + race.losses)).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Settings toggle component
  const SettingsPanel = () => {
    return (
      <div className={styles.settingsPanel}>
        <div className={styles.settingOption}>
          <span>Enhanced UI</span>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={showEnhancedUI}
              onChange={toggleEnhancedUI}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
        <div className={styles.settingOption}>
          <span>Interactive Background</span>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={interactiveBG}
              onChange={toggleInteractiveBG}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
        <div className={styles.settingOption}>
          <span>Sound Effects</span>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
      </div>
    );
  };
    // Action buttons
  const ActionButtons = () => {
    return (
      <div className={styles.actionButtons}>
        <button 
          className={`${styles.actionButton} ${styles.primaryButton}`}          onClick={() => {
            setGameStarted(true);
            setShowIntro(false);
            if (soundEnabled) playAudioSound('warp');
          }}
        >
          <span className={styles.buttonIcon}>🎮</span>
          <span>Start Mission</span>
        </button>
        <button 
          className={`${styles.actionButton} ${styles.secondaryButton}`}          onClick={() => {
            setShowCosmicCodex(true);
            if (soundEnabled) playAudioSound('teleport');
          }}
        >
          <span className={styles.buttonIcon}>📜</span>
          <span>Cosmic Codex</span>
        </button>
        <button 
          className={`${styles.actionButton} ${styles.secondaryButton}`}          onClick={() => {
            setShowSettingsModal(true);
            if (soundEnabled) playAudioSound('alert');
          }}
        >
          <span className={styles.buttonIcon}>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    );
  };

  // Cosmic Codex Modal Component
  const CosmicCodexModal = () => {
    if (!showCosmicCodex) return null;
    
    return (
      <div className={styles.modalOverlay} onClick={() => setShowCosmicCodex(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>📜 Cosmic Codex</h2>
            <button 
              className={styles.modalClose}
              onClick={() => setShowCosmicCodex(false)}
            >
              ✕
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.codexSection}>
              <h3>🚀 Game Rules</h3>
              <ul>
                <li>Roll the cosmic dice to move through space</li>
                <li>Land on different tiles for various effects</li>
                <li>First to reach the end wins the conquest</li>
                <li>Beware of obstacles and use chance tiles wisely</li>
              </ul>
            </div>
            
            <div className={styles.codexSection}>
              <h3>👽 Alien Species</h3>
              <div className={styles.alienGrid}>
                <div className={styles.alienCard}>
                  <span className={styles.alienIcon}>👽</span>
                  <h4>Zorgons</h4>
                  <p>Master explorers with advanced warp technology</p>
                </div>
                <div className={styles.alienCard}>
                  <span className={styles.alienIcon}>👾</span>
                  <h4>Neburites</h4>
                  <p>Energy beings who manipulate cosmic forces</p>
                </div>
              </div>
            </div>
            
            <div className={styles.codexSection}>
              <h3>🌌 Tile Types</h3>
              <div className={styles.tileGuide}>
                <div className={styles.tileType}>
                  <span className={styles.tileIcon}>🟢</span>
                  <div>
                    <strong>Normal Tiles</strong>
                    <p>Safe passage through space</p>
                  </div>
                </div>
                <div className={styles.tileType}>
                  <span className={styles.tileIcon}>⚠️</span>
                  <div>
                    <strong>Obstacle Tiles</strong>
                    <p>Cosmic hazards that may slow progress</p>
                  </div>
                </div>
                <div className={styles.tileType}>
                  <span className={styles.tileIcon}>✨</span>
                  <div>
                    <strong>Chance Tiles</strong>
                    <p>Mysterious events with unknown outcomes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Settings Modal Component
  const SettingsModal = () => {
    if (!showSettingsModal) return null;
    
    return (
      <div className={styles.modalOverlay} onClick={() => setShowSettingsModal(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>⚙️ Settings</h2>
            <button 
              className={styles.modalClose}
              onClick={() => setShowSettingsModal(false)}
            >
              ✕
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.settingsGrid}>
              <div className={styles.settingGroup}>
                <h3>🎨 Visual Settings</h3>
                <div className={styles.settingOption}>
                  <span>Enhanced UI</span>
                  <label className={styles.toggleSwitch}>
                    <input 
                      type="checkbox" 
                      checked={showEnhancedUI}
                      onChange={toggleEnhancedUI}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.settingOption}>
                  <span>Interactive Background</span>
                  <label className={styles.toggleSwitch}>
                    <input 
                      type="checkbox" 
                      checked={interactiveBG}
                      onChange={toggleInteractiveBG}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.settingOption}>
                  <span>Hologram Mode</span>
                  <label className={styles.toggleSwitch}>
                    <input 
                      type="checkbox" 
                      checked={hologramMode}
                      onChange={() => setHologramMode(!hologramMode)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
                <div className={styles.settingGroup}>
                <h3>🔊 Audio Settings</h3>
                <div className={styles.settingOption}>
                  <span>Sound Effects</span>
                  <label className={styles.toggleSwitch}>
                    <input 
                      type="checkbox" 
                      checked={soundEnabled}
                      onChange={() => setSoundEnabled(!soundEnabled)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                <div className={styles.settingOption}>
                  <span>Background Music</span>
                  <label className={styles.toggleSwitch}>
                    <input 
                      type="checkbox" 
                      checked={isMusicPlaying}
                      onChange={() => {
                        if (isMusicPlaying) {
                          stopBackgroundMusic();
                        } else {
                          startBackgroundMusic();
                        }
                      }}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
              
              <div className={styles.settingGroup}>
                <h3>🎮 Game Mode</h3>
                <div className={styles.gameModeSettings}>
                  <button 
                    className={`${styles.modeButton} ${gameMode === 'standard' ? styles.activeModeButton : ''}`}
                    onClick={() => selectGameMode('standard')}
                  >
                    🚀 Standard
                  </button>
                  <button 
                    className={`${styles.modeButton} ${gameMode === 'hardcore' ? styles.activeModeButton : ''}`}
                    onClick={() => selectGameMode('hardcore')}
                  >
                    ☠️ Hardcore
                  </button>
                  <button 
                    className={`${styles.modeButton} ${gameMode === 'exploration' ? styles.activeModeButton : ''}`}
                    onClick={() => selectGameMode('exploration')}
                  >
                    🔭 Exploration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container} data-mode={gameMode}>
      <Head>
        <title>ULTRA Cosmic Conquest: Beyond The Void</title>
        <meta name="description" content="The most advanced immersive alien-themed intergalactic board game experience" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Enhanced starfield with parallax */}
      <div className={styles.starfield} ref={starsRef}>
        {stars.map(star => (
          <div 
            key={star.id}
            className={styles.star}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay
            }}
          />
        ))}
        
        {nebulae.map(nebula => (
          <div 
            key={nebula.id}
            className={styles.nebula}
            style={{
              left: nebula.left,
              top: nebula.top,
              width: nebula.width,
              height: nebula.height,
              background: nebula.background,
              transform: nebula.transform
            }}
          />
        ))}
      </div>

      <main className={styles.main} ref={mainRef}>
        <InteractiveTitle />
        
        {gameStarted ? (
          // Game board content when game is started
          <div className={styles.gameContent}>
            <div className={styles.gameBoard} ref={gameboardRef}>
              {gameBoard.map((tile, index) => (
                <div
                  key={index}
                  className={`${styles.tile} ${styles[tile.type] || ''}`}
                >
                  {tile.label}
                  
                  {/* Player tokens */}
                  {players.map((player) => (
                    player.position === tile.position ? (
                      <div
                        key={player.id}
                        className={styles.playerToken}
                        style={{ 
                          backgroundColor: player.color,
                          right: player.id === 1 ? '5px' : '25px'
                        }}
                      >
                        {player.icon}
                      </div>
                    ) : null
                  ))}
                </div>
              ))}
            </div>
            
            <div className={styles.gameControls}>
              <div className={styles.playerInfo}>
                {players.map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`${styles.player} ${index === currentPlayerIdx ? styles.active : ''}`}
                  >
                    <div className={styles.playerToken} style={{ backgroundColor: player.color }}>
                      {player.icon}
                    </div>
                    <div className={styles.playerName}>{player.name}</div>
                    <div className={styles.playerPosition}>Position: {player.position}</div>
                  </div>
                ))}
              </div>
              
              <div className={styles.diceSection}>
                <button 
                  onClick={() => {
                    if (!isRolling) {
                      setIsRolling(true);
                      const value = Math.floor(Math.random() * 6) + 1;
                      setDiceValue(value);
                      setTimeout(() => {
                        movePlayer(players[currentPlayerIdx], value);
                        setIsRolling(false);
                      }, 1000);
                    }
                  }} 
                  className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}
                  disabled={isRolling}
                >
                  {diceValue || '?'}
                </button>
                <div className={styles.diceMessage}>
                  {isRolling ? 'Rolling...' : 'Click to roll'}
                </div>
              </div>
              
              <button 
                className={styles.gameButton}
                onClick={() => {
                  setGameStarted(false);
                  setGameBoard([]);
                  setPlayers([
                    { id: 1, name: 'Zorgon Explorer', position: 0, color: '#00E676', icon: '👽' },
                    { id: 2, name: 'Neburite Captain', position: 0, color: '#2979FF', icon: '👾' }
                  ]);
                  setCurrentPlayerIdx(0);
                  setDiceValue(null);
                  setGameMessage('Prepare for interstellar journey!');
                }}
              >
                Back to Main Menu
              </button>
            </div>
          </div>
        ) : (
          // Menu content when game is not started
          <div className={styles.contentGrid}>
            <GameModeSelector />
            <AlienRankings />
            <SettingsPanel />
            <ActionButtons />          </div>
        )}
      </main>
      
      {/* Modal Components */}
      <CosmicCodexModal />
      <SettingsModal />
    </div>
  );
}
