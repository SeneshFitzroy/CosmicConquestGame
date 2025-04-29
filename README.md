# 🏆 Quest to Victory 🏆

![Game Banner](assets/images/game-banner.png)

## 🌟 Overview

**Quest to Victory** is an exciting browser-based board game where players navigate a treacherous path from start to finish, overcoming obstacles and seizing opportunities along the way. Race against your opponents to be the first to reach the victory point!

![Game Screenshot](assets/images/gameplay-screenshot.png)

## ✨ Features

- 🎲 **Dynamic Gameplay**: Simple dice-rolling mechanics for intuitive movement
- 🛣️ **Strategic Path**: 15 unique spaces filled with obstacles and opportunities
- 🧩 **Challenge Cards**: Overcome Obstacle Cards that test your luck and strategy
- 🎯 **Opportunity Cards**: Leverage Chance Cards to gain advantages
- 👥 **Multiplayer**: Play with friends in hot-seat mode
- 🎮 **Responsive Design**: Enjoy on any device - desktop, tablet, or mobile
- 🔊 **Immersive Audio**: Experience engaging sound effects and background music

## 📋 Table of Contents

- [Installation](#-installation)
- [How to Play](#-how-to-play)
- [Game Rules](#-game-rules)
- [Development](#-development)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Installation

### Play Online

Visit [questtovictory.game](https://questtovictory.game) to play instantly in your browser!

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quest-to-victory.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quest-to-victory
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server
   
   # Using Node.js
   npx serve
   ```

4. Access the game at `http://localhost:8000` or the port provided by your server.

## 🎮 How to Play

### Quick Start Guide

1. 🎲 **Roll the Dice**: Click the dice button to move your token
2. 🧭 **Navigate the Board**: Land on different tiles to trigger events
3. 📝 **Draw Cards**: When landing on special tiles, draw Obstacle or Chance cards
4. 🏁 **Reach the End**: Be the first player to reach the finish line to win!

### Controls

- **Roll Dice**: Click the "Roll Dice" button or press `Space`
- **View Instructions**: Click the "📜 Cosmic Codex" button
- **Adjust Settings**: Click the "⚙️ Settings" button
- **Reset Game**: Click the "Reset Game" button or press `R`

## 📜 Game Rules

### Setup

1. Each player selects a token and places it at the starting position
2. Determine player order (youngest player goes first)
3. Shuffle the Obstacle and Chance card decks separately

### Gameplay Flow

#### On Your Turn:

1. Roll the dice by clicking the "Roll Dice" button
2. Move your token forward the number of spaces shown on the dice
3. Follow the instructions for the tile you land on:
   - **Regular Tile**: Nothing happens
   - **Obstacle Tile** (🚧): Draw an Obstacle card and follow its instructions
   - **Chance Tile** (✨): Draw a Chance card and follow its instructions
   - **Boost Tile** (🚀): Move forward an additional 2 spaces
   - **Setback Tile** (⚡): Move backward 3 spaces

#### Card Effects:

- **Obstacle Cards**:
  - **Minor Obstacle**: Skip your next turn
  - **Major Obstacle**: Move backward 2 spaces
  - **Critical Obstacle**: Return to the nearest regular tile behind you
  - **Challenge Obstacle**: Answer a question correctly or move back 1 space

- **Chance Cards**:
  - **Lucky Break**: Move forward 1-3 additional spaces
  - **Shortcut**: Move to the next special tile ahead
  - **Shield**: Ignore the next obstacle you encounter
  - **Extra Turn**: Take another turn immediately

### Winning the Game

The first player to reach or exceed the final tile (space 15) wins the game!

## 💻 Development

### Project Structure

```
quest-to-victory/
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

### Build Instructions

To modify or extend the game:

1. Clone the repository as described in [Installation](#-installation)
2. Make your changes to the HTML, CSS, or JavaScript files
3. Test locally before deploying

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript**: Game logic and interactions
- **LocalStorage API**: Saving game progress and settings
- **Web Audio API**: Sound effects and background music

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve Quest to Victory:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Developer**: Your Name
- **Email**: your.email@example.com
- **Twitter**: [@yourusername](https://twitter.com/yourusername)
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)

## 🌟 Acknowledgements

- Sound effects from [ZapSplat](https://www.zapsplat.com)
- Font icons by [Font Awesome](https://fontawesome.com)
- Background music by [incompetech.com](https://incompetech.com)

---

<p align="center">
  <img src="assets/images/game-logo-small.png" alt="Quest to Victory Logo" width="150">
  <br>
  <em>Embark on your quest today!</em>
</p>