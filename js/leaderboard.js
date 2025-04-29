/**
 * Leaderboard functionality for Quest to Victory
 * Allows customization of player names and tracks game statistics
 */

// Initialize or load existing leaderboard data
const initializeLeaderboard = () => {
    // Check if leaderboard data exists in localStorage
    let leaderboardData = localStorage.getItem('questToVictory_leaderboard');
    
    // Default leaderboard if no data exists
    if (!leaderboardData) {
        const defaultLeaderboard = [
            { rank: 1, species: "Zorgons", name: "Player 1", victories: 12, losses: 3, ratio: 0.80 },
            { rank: 2, species: "Neburites", name: "Player 2", victories: 10, losses: 5, ratio: 0.67 },
            { rank: 3, species: "Pyraxians", name: "Player 3", victories: 8, losses: 7, ratio: 0.53 },
            { rank: 4, species: "Quasarians", name: "Player 4", victories: 6, losses: 9, ratio: 0.40 }
        ];
        
        // Save default data to localStorage
        localStorage.setItem('questToVictory_leaderboard', JSON.stringify(defaultLeaderboard));
        return defaultLeaderboard;
    }
    
    return JSON.parse(leaderboardData);
};

// Render leaderboard table in the specified container
const renderLeaderboard = (containerId = 'leaderboard-container') => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Leaderboard container with ID "${containerId}" not found.`);
        return;
    }
    
    // Get leaderboard data
    const leaderboardData = initializeLeaderboard();
    
    // Create table HTML
    let tableHTML = `
        <div class="leaderboard-header">
            <h2>🏆 GALACTIC DOMINANCE 🏆</h2>
            <button id="add-player-btn" class="leaderboard-btn">Add Player</button>
        </div>
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>RANK</th>
                    <th>SPECIES</th>
                    <th>NAME</th>
                    <th>VICTORIES</th>
                    <th>LOSSES</th>
                    <th>RATIO</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each player
    leaderboardData.forEach((player, index) => {
        tableHTML += `
            <tr data-player-index="${index}">
                <td>${player.rank}</td>
                <td>
                    <select class="species-select" data-player-index="${index}">
                        <option value="Zorgons" ${player.species === "Zorgons" ? "selected" : ""}>Zorgons</option>
                        <option value="Neburites" ${player.species === "Neburites" ? "selected" : ""}>Neburites</option>
                        <option value="Pyraxians" ${player.species === "Pyraxians" ? "selected" : ""}>Pyraxians</option>
                        <option value="Quasarians" ${player.species === "Quasarians" ? "selected" : ""}>Quasarians</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="player-name-input" value="${player.name}" data-player-index="${index}">
                </td>
                <td>${player.victories}</td>
                <td>${player.losses}</td>
                <td>${player.ratio.toFixed(2)}</td>
                <td>
                    <button class="win-btn" data-player-index="${index}">Win</button>
                    <button class="lose-btn" data-player-index="${index}">Lose</button>
                    <button class="delete-btn" data-player-index="${index}">×</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    // Insert table into container
    container.innerHTML = tableHTML;
    
    // Add event listeners
    attachLeaderboardEventListeners(containerId);
};

// Attach event listeners to leaderboard elements
const attachLeaderboardEventListeners = (containerId) => {
    const container = document.getElementById(containerId);
    
    // Add player button
    const addPlayerBtn = container.querySelector('#add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', addNewPlayer);
    }
    
    // Species select dropdowns
    const speciesSelects = container.querySelectorAll('.species-select');
    speciesSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            updatePlayerData(e.target.dataset.playerIndex, 'species', e.target.value);
        });
    });
    
    // Player name inputs
    const nameInputs = container.querySelectorAll('.player-name-input');
    nameInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            updatePlayerData(e.target.dataset.playerIndex, 'name', e.target.value);
        });
    });
    
    // Win buttons
    const winButtons = container.querySelectorAll('.win-btn');
    winButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            recordWin(e.target.dataset.playerIndex);
        });
    });
    
    // Lose buttons
    const loseButtons = container.querySelectorAll('.lose-btn');
    loseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            recordLoss(e.target.dataset.playerIndex);
        });
    });
    
    // Delete buttons
    const deleteButtons = container.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            deletePlayer(e.target.dataset.playerIndex);
        });
    });
};

// Add a new player to the leaderboard
const addNewPlayer = () => {
    // Get current leaderboard data
    const leaderboardData = initializeLeaderboard();
    
    // Create new player with default values
    const newPlayer = {
        rank: leaderboardData.length + 1,
        species: "Zorgons",
        name: `Player ${leaderboardData.length + 1}`,
        victories: 0,
        losses: 0,
        ratio: 0.00
    };
    
    // Add to leaderboard
    leaderboardData.push(newPlayer);
    
    // Save and refresh
    saveLeaderboard(leaderboardData);
    renderLeaderboard();
};

// Update a player's data field
const updatePlayerData = (playerIndex, field, value) => {
    const leaderboardData = initializeLeaderboard();
    const playerData = leaderboardData[playerIndex];
    
    if (playerData) {
        playerData[field] = value;
        saveLeaderboard(leaderboardData);
        renderLeaderboard();
    }
};

// Record a win for a player
const recordWin = (playerIndex) => {
    const leaderboardData = initializeLeaderboard();
    const playerData = leaderboardData[playerIndex];
    
    if (playerData) {
        playerData.victories += 1;
        updatePlayerRatio(playerData);
        sortAndRankPlayers(leaderboardData);
        saveLeaderboard(leaderboardData);
        renderLeaderboard();
    }
};

// Record a loss for a player
const recordLoss = (playerIndex) => {
    const leaderboardData = initializeLeaderboard();
    const playerData = leaderboardData[playerIndex];
    
    if (playerData) {
        playerData.losses += 1;
        updatePlayerRatio(playerData);
        sortAndRankPlayers(leaderboardData);
        saveLeaderboard(leaderboardData);
        renderLeaderboard();
    }
};

// Update a player's win/loss ratio
const updatePlayerRatio = (playerData) => {
    const totalGames = playerData.victories + playerData.losses;
    playerData.ratio = totalGames > 0 ? playerData.victories / totalGames : 0;
};

// Delete a player from the leaderboard
const deletePlayer = (playerIndex) => {
    const leaderboardData = initializeLeaderboard();
    
    if (confirm("Are you sure you want to delete this player?")) {
        leaderboardData.splice(playerIndex, 1);
        sortAndRankPlayers(leaderboardData);
        saveLeaderboard(leaderboardData);
        renderLeaderboard();
    }
};

// Sort players by ratio and update their ranks
const sortAndRankPlayers = (leaderboardData) => {
    // Sort by ratio (highest first)
    leaderboardData.sort((a, b) => b.ratio - a.ratio);
    
    // Update ranks
    leaderboardData.forEach((player, index) => {
        player.rank = index + 1;
    });
};

// Save leaderboard data to localStorage
const saveLeaderboard = (leaderboardData) => {
    localStorage.setItem('questToVictory_leaderboard', JSON.stringify(leaderboardData));
};

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('leaderboard-container')) {
        renderLeaderboard();
    }
});
