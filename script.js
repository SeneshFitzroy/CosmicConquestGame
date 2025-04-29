document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    const boardSize = 30; // Total number of tiles
    const gameBoard = document.querySelector('.game-board');
    const diceResult = document.getElementById('dice-result');
    const rollDiceBtn = document.getElementById('roll-dice');
    const gameMessage = document.getElementById('game-message');
    const resetGameBtn = document.getElementById('reset-game');
    const obstacleDeck = document.getElementById('obstacle-deck');
    const chanceDeck = document.getElementById('chance-deck');
    const drawnObstacleCard = document.getElementById('drawn-obstacle-card');
    const drawnChanceCard = document.getElementById('drawn-chance-card');
    
    let players = [
        { name: 'Player 1', position: 0, element: document.querySelector('.player-1'), positionElement: document.querySelector('.player-1 .player-position') },
        { name: 'Player 2', position: 0, element: document.querySelector('.player-2'), positionElement: document.querySelector('.player-2 .player-position') }
    ];
    
    let currentPlayerIndex = 0;
    let gameActive = true;
    let skipTurns = [0, 0]; // How many turns to skip for each player
    
    // Obstacle cards
    const obstacleCards = [
        { title: "Mud Pit", description: "Go back 3 spaces due to getting stuck in the mud.", effect: player => movePlayer(player, -3) },
        { title: "Rock Slide", description: "Skip your next turn while you recover from the slide.", effect: player => skipPlayerTurn(player, 1) },
        { title: "Lost Map", description: "Miss your next 2 turns while you find your way back.", effect: player => skipPlayerTurn(player, 2) },
        { title: "Wild Animal Encounter", description: "Move back 2 spaces as you evade the animal.", effect: player => movePlayer(player, -2) },
        { title: "Tangled Path", description: "Move forward only 1 space this turn due to a blocked path.", effect: player => { movePlayer(player, -player.lastMove + 1); } },
        { title: "Fallen Tree", description: "You cannot move for 1 turn as you clear the fallen tree.", effect: player => skipPlayerTurn(player, 1) },
        { title: "Thick Fog", description: "Go back 1 space as you struggle to navigate through the fog.", effect: player => movePlayer(player, -1) },
        { title: "Crossing the River", description: "Roll the dice again; if you roll 4 or higher, move forward 2 spaces; otherwise, lose your next turn.", effect: player => {
            const roll = Math.floor(Math.random() * 6) + 1;
            if (roll >= 4) {
                gameMessage.innerHTML += `<br>You rolled a ${roll}. Move forward 2 spaces!`;
                movePlayer(player, 2);
            } else {
                gameMessage.innerHTML += `<br>You rolled a ${roll}. Lose your next turn!`;
                skipPlayerTurn(player, 1);
            }
        }}
    ];
    
    // Chance cards
    const chanceCards = [
        { title: "Shortcut Found", description: "Move ahead 3 spaces by taking a shortcut.", effect: player => movePlayer(player, 3) },
        { title: "Lucky Break", description: "Roll the dice again and move that number of spaces.", effect: player => {
            const roll = Math.floor(Math.random() * 6) + 1;
            gameMessage.innerHTML += `<br>You rolled a ${roll}. Move forward ${roll} spaces!`;
            movePlayer(player, roll);
        }},
        { title: "Helping Hand", description: "Move forward 2 spaces as another player helps clear your path.", effect: player => movePlayer(player, 2) },
        { title: "Boost of Speed", description: "Move forward 4 spaces because of an energy burst.", effect: player => movePlayer(player, 4) },
        { title: "Find a Compass", description: "Skip the next obstacle you land on.", effect: player => { player.skipNextObstacle = true; gameMessage.innerHTML += "<br>You'll skip the next obstacle you land on!"; } },
        { title: "Sudden Wind", description: "Move forward 1 space due to a strong wind pushing you.", effect: player => movePlayer(player, 1) },
        { title: "Slide Back", description: "Move back 2 spaces.", effect: player => movePlayer(player, -2) },
        { title: "Dare", description: "Complete a dare from the other player.", effect: player => {
            gameMessage.innerHTML += "<br>The other player must give you a dare to complete!";
        }},
        { title: "Skip 1 Turn", description: "Miss the next turn.", effect: player => skipPlayerTurn(player, 1) },
        { title: "Sing a Song", description: "You must sing a short song to continue.", effect: player => {
            gameMessage.innerHTML += "<br>You must sing a short song to continue your turn!";
        }},
        { title: "Treasure Chest", description: "Gain a bonus move in your next turn.", effect: player => {
            player.bonusMove = true;
            gameMessage.innerHTML += "<br>You'll get a bonus move in your next turn!";
        }},
        { title: "Friendly Animal", description: "Move forward 2 spaces as a friendly animal leads the way.", effect: player => movePlayer(player, 2) }
    ];
    
    // Initialize the game board
    function initBoard() {
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < boardSize; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            if (i === 0) {
                tile.classList.add('start');
                tile.textContent = 'START';
            } else if (i === boardSize - 1) {
                tile.classList.add('end');
                tile.textContent = 'FINISH';
            } else {
                // Randomly distribute obstacle and chance tiles
                const random = Math.random();
                if (random < 0.2) {
                    tile.classList.add('obstacle');
                    tile.textContent = 'O';
                } else if (random < 0.4) {
                    tile.classList.add('chance');
                    tile.textContent = 'C';
                } else {
                    tile.classList.add('normal');
                    tile.textContent = i;
                }
            }
            
            gameBoard.appendChild(tile);
        }
    }
    
    // Update player position display
    function updatePlayerPosition(player) {
        player.positionElement.textContent = `Position: ${player.position}`;
        
        // Move player token on the board
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            if (index === player.position) {
                const playerToken = document.createElement('div');
                playerToken.classList.add('player-on-board');
                playerToken.textContent = player === players[0] ? 'P1' : 'P2';
                playerToken.style.position = 'absolute';
                playerToken.style.top = '0';
                playerToken.style.right = player === players[0] ? '0' : '25px';
                playerToken.style.background = player === players[0] ? '#65c1f7' : '#f76565';
                playerToken.style.color = 'white';
                playerToken.style.padding = '2px 5px';
                playerToken.style.borderRadius = '3px';
                playerToken.style.fontSize = '12px';
                
                // Remove any existing tokens
                const existingToken = tile.querySelector(`.player-on-board:nth-of-type(${player === players[0] ? 1 : 2})`);
                if (existingToken) {
                    tile.removeChild(existingToken);
                }
                
                tile.appendChild(playerToken);
            }
        });
    }
    
    // Move player and check for tile effects
    function movePlayer(player, spaces) {
        player.lastMove = spaces;
        player.position += spaces;
        
        // Ensure player doesn't go below position 0
        if (player.position < 0) {
            player.position = 0;
        }
        
        // Check if player has won
        if (player.position >= boardSize - 1) {
            player.position = boardSize - 1;
            updatePlayerPosition(player);
            gameMessage.textContent = `${player.name} has reached the finish line and won the game!`;
            gameActive = false;
            return;
        }
        
        updatePlayerPosition(player);
        
        // Check for tile effects
        const tiles = document.querySelectorAll('.tile');
        const currentTile = tiles[player.position];
        
        if (currentTile.classList.contains('obstacle') && !player.skipNextObstacle) {
            gameMessage.textContent = `${player.name} landed on an Obstacle tile! Draw an Obstacle card.`;
            highlightDeck(obstacleDeck, true);
        } else if (currentTile.classList.contains('chance')) {
            gameMessage.textContent = `${player.name} landed on a Chance tile! Draw a Chance card.`;
            highlightDeck(chanceDeck, true);
        } else {
            if (player.skipNextObstacle && currentTile.classList.contains('obstacle')) {
                gameMessage.textContent = `${player.name} skipped the obstacle effect thanks to the compass!`;
                player.skipNextObstacle = false;
            } else {
                gameMessage.textContent = `${player.name} moved to position ${player.position}.`;
            }
            switchPlayer();
        }
    }
    
    // Skip player turns
    function skipPlayerTurn(player, turns) {
        const playerIndex = players.indexOf(player);
        skipTurns[playerIndex] += turns;
        gameMessage.innerHTML += `<br>${player.name} will skip ${turns} turn(s).`;
        switchPlayer();
    }
    
    // Switch to the next player
    function switchPlayer() {
        if (!gameActive) return;
        
        players[currentPlayerIndex].element.classList.remove('active');
        
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        
        // Check if next player needs to skip turns
        if (skipTurns[currentPlayerIndex] > 0) {
            gameMessage.textContent = `${players[currentPlayerIndex].name} skips a turn!`;
            skipTurns[currentPlayerIndex]--;
            
            setTimeout(() => {
                switchPlayer();
            }, 1500);
            return;
        }
        
        players[currentPlayerIndex].element.classList.add('active');
        
        // Apply bonus move if player has one
        if (players[currentPlayerIndex].bonusMove) {
            gameMessage.textContent = `${players[currentPlayerIndex].name}'s turn. You have a bonus move!`;
            players[currentPlayerIndex].bonusMove = false;
        } else {
            gameMessage.textContent = `${players[currentPlayerIndex].name}'s turn. Roll the dice!`;
        }
        
        // Reset card highlights
        highlightDeck(obstacleDeck, false);
        highlightDeck(chanceDeck, false);
        
        // Hide drawn cards
        drawnObstacleCard.classList.remove('visible');
        drawnChanceCard.classList.remove('visible');
    }
    
    // Highlight card deck
    function highlightDeck(deck, highlight) {
        if (highlight) {
            deck.style.transform = 'scale(1.1)';
            deck.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            deck.style.animation = 'pulse 1.5s infinite';
        } else {
            deck.style.transform = '';
            deck.style.boxShadow = '';
            deck.style.animation = '';
        }
    }
    
    // Draw a card from a deck
    function drawCard(deck, cardElement, cards) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards[randomIndex];
        
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        `;
        
        cardElement.classList.add('visible');
        highlightDeck(deck, false);
        
        // Apply card effect after a delay
        setTimeout(() => {
            card.effect(players[currentPlayerIndex]);
        }, 1500);
    }
    
    // Event listeners
    rollDiceBtn.addEventListener('click', function() {
        if (!gameActive || gameBoard.children.length === 0) return;
        
        // Check if it's appropriate to roll
        const currentTile = document.querySelectorAll('.tile')[players[currentPlayerIndex].position];
        if (currentTile.classList.contains('obstacle') || currentTile.classList.contains('chance')) {
            gameMessage.textContent = "Draw a card first!";
            return;
        }
        
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = roll;
        
        gameMessage.textContent = `${players[currentPlayerIndex].name} rolled a ${roll}!`;
        
        setTimeout(() => {
            movePlayer(players[currentPlayerIndex], roll);
        }, 800);
    });
    
    obstacleDeck.addEventListener('click', function() {
        if (!gameActive) return;
        
        // Only allow drawing if on an obstacle tile
        const currentTile = document.querySelectorAll('.tile')[players[currentPlayerIndex].position];
        if (!currentTile.classList.contains('obstacle')) return;
        
        drawCard(obstacleDeck, drawnObstacleCard, obstacleCards);
    });
    
    chanceDeck.addEventListener('click', function() {
        if (!gameActive) return;
        
        // Only allow drawing if on a chance tile
        const currentTile = document.querySelectorAll('.tile')[players[currentPlayerIndex].position];
        if (!currentTile.classList.contains('chance')) return;
        
        drawCard(chanceDeck, drawnChanceCard, chanceCards);
    });
    
    resetGameBtn.addEventListener('click', function() {
        // Reset game state
        players.forEach(player => {
            player.position = 0;
            player.element.classList.remove('active');
            updatePlayerPosition(player);
        });
        
        currentPlayerIndex = 0;
        players[0].element.classList.add('active');
        
        gameActive = true;
        skipTurns = [0, 0];
        
        diceResult.textContent = '?';
        gameMessage.textContent = 'Game reset! Roll the dice to begin.';
        
        // Hide drawn cards
        drawnObstacleCard.classList.remove('visible');
        drawnChanceCard.classList.remove('visible');
        
        // Reset card highlights
        highlightDeck(obstacleDeck, false);
        highlightDeck(chanceDeck, false);
        
        // Regenerate the board
        initBoard();
    });
    
    // Initialize the game
    initBoard();
});
