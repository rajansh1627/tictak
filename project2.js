// project2.js

let currentPlayer = 'X'; // Start with player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Game state
let gameActive = true; // Game state tracker

// Select all cells
const cells = document.querySelectorAll('.cell');

// Function to handle player clicks
function handleCellClick(e) {
    const cellIndex = e.target.dataset.index;
    
    if (gameBoard[cellIndex] !== '' || !gameActive) return; // Ignore if the cell is already clicked or game is over
    
    gameBoard[cellIndex] = currentPlayer; // Update the game board
    e.target.textContent = currentPlayer; // Display the mark in the clicked cell
    
    // Check for winner or tie after each move
    if (checkWinner()) {
        setTimeout(() => alert(currentPlayer + ' wins!'), 100);
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        setTimeout(() => alert("It's a tie!"), 100);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

// Function to check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the cells
    });
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add event listener to reset button
document.getElementById('reset-btn').addEventListener('click', resetGame);
