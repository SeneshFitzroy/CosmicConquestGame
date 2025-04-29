# **Cosmic Conquest** 🏆🚀

## **🌟 Overview** 

**Cosmic Conquest** is an immersive **browser-based board game** where players navigate a **challenging** path filled with obstacles and opportunities. Players race to be the first to reach the **finish line**, overcoming **traps**, **cards**, and **dice rolls** to claim victory!

## **✨ Key Features** 

- 🎲 **Dynamic Gameplay**: Simple dice-rolling mechanics for intuitive and fun movement.
- 🛣️ **Strategic Path**: 15 unique spaces filled with obstacles, challenges, and rewards.
- 🧩 **Challenge Cards**: Navigate through Obstacle Cards that test your luck and strategy.
- 🎯 **Opportunity Cards**: Use Chance Cards to gain significant advantages on your journey.
- 👥 **Multiplayer Support**: Play with friends in **hot-seat mode**, taking turns to conquer the game board.
- 🎮 **Fully Responsive Design**: Optimized for **desktop**, **tablet**, and **mobile** devices.
- 🔊 **Engaging Audio**: Dynamic sound effects and background music that enhance the gaming experience.

## **📋 Table of Contents**

- [Installation](#-installation)
- [How to Play](#-how-to-play)
- [Game Rules](#-game-rules)
- [Development](#-development)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)

## **🚀 Installation** 

### **Play Online** 

Simply visit [cosmicconquest.game](https://cosmicconquest.game) and dive into the action instantly through your browser! 🌐

### **Local Installation** 

1. Clone the repository:
   ```bash
   git clone https://github.com/SeneshFitzroy/CosmicConquestGame.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CosmicConquestGame
   ```

3. Open `index.html` directly in your browser or set up a local server:
   ```bash
   # Using Python
   python -m http.server
   # Using Node.js
   npx serve
   ```

4. Access the game at `http://localhost:8000` or any port specified by your server.

## **🎮 How to Play**

### **Quick Start Guide** 

1. 🎲 **Roll the Dice**: Click the dice button to move your token forward.
2. 🧭 **Navigate the Board**: Land on different tiles to trigger game events.
3. 📝 **Draw Cards**: When you land on **Obstacle** or **Chance** tiles, draw the corresponding card to see how it will affect your gameplay.
4. 🏁 **Finish the Game**: Be the first player to reach the final space on the board to win! 🎉

### **Controls**

- **Roll Dice**: Click the "Roll Dice" button or press `Space`
- **View Instructions**: Click the "📜 Cosmic Codex" button for gameplay instructions.
- **Adjust Settings**: Click the "⚙️ Settings" button to customize game preferences.
- **Reset Game**: Click the "Reset Game" button or press `R` to start over.

## **📜 Game Rules**

### **Setup**

1. Each player selects a token and places it at the starting position on the board.
2. Determine the player order (the youngest player goes first).
3. Shuffle both the **Obstacle Cards** and **Chance Cards** separately.

### **Gameplay Flow**

#### **On Your Turn:**

1. Roll the dice by clicking the "Roll Dice" button.
2. Move your token forward the number of spaces indicated by the dice roll.
3. Follow the instructions for the space you land on:
   - **Regular Tile**: No effect.
   - **Obstacle Tile** (🚧): Draw an **Obstacle Card** and follow its instructions.
   - **Chance Tile** (✨): Draw a **Chance Card** and follow its instructions.
   - **Boost Tile** (🚀): Move forward an additional 2 spaces.
   - **Setback Tile** (⚡): Move back 3 spaces.

#### **Card Effects:**

- **Obstacle Cards**:
  - **Minor Obstacle**: Skip your next turn.
  - **Major Obstacle**: Move backward 2 spaces.
  - **Critical Obstacle**: Return to the nearest regular tile behind you.
  - **Challenge Obstacle**: Answer a question correctly to avoid moving back 1 space.

- **Chance Cards**:
  - **Lucky Break**: Move forward 1-3 additional spaces.
  - **Shortcut**: Move to the next special tile ahead.
  - **Shield**: Block the next obstacle you encounter.
  - **Extra Turn**: Take an additional turn immediately.

### **Winning the Game**

The first player to reach or exceed the **finish line** (space 15) wins the game! 🏆

## **💻 Development**

### **Project Structure**

```
CosmicConquestGame/
├── assets/
│   ├── audio/         # Game sounds and music
│   ├── css/           # Stylesheet files
│   └── images/        # Game images and sprites
├── js/
│   ├── script.js      # Main game logic
│   ├── buttonHandlers.js  # UI button functionality
│   └── cards.js       # Card deck logic
├── index.html         # Main game page
└── README.md          # This documentation
```

### **Build Instructions**

To modify or extend the game:

1. Clone the repository as described in [Installation](#-installation).
2. Make your desired changes to the **HTML**, **CSS**, or **JavaScript** files.
3. Test your changes locally by running a local server and ensuring everything works as expected before deploying.

## **🛠️ Technologies Used**

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript**: Game logic, interactions, and gameplay mechanics
- **LocalStorage API**: Saving game progress and settings
- **Web Audio API**: Sound effects and background music

## **🤝 Contributing**

Contributions are welcome! Here’s how you can help improve **Cosmic Conquest**:

1. Fork the repository to your own GitHub account.
2. Create a new feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push your branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request** to merge your feature with the main repository.

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for additional contribution guidelines.

## **📝 License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
