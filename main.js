// MODULE THAT HANDLES THE STATE OF THE GAME BOARD
const Gameboard = (() => {
    let board = Array(9).fill("");

    const getBoard = () => board;

    const resetBoard = () => {
        board = Array(9).fill("");
    };

    const setCell = (index, symbol) => {
        if (index >= 0 && index < board.length && board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    return { getBoard, resetBoard, setCell };
})();

// PLAYER FACTORY FUNCTION THAT CREATES PLAYER OBJECTS
const Player = (name, symbol) => {
    return { name, symbol };
};

// MODULE THAT HANDLES THE GAME LOGIC
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const startGame = (player1Name, player2Name) => {
        players = [
            Player(player1Name, "X"),
            Player(player2Name, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.updateResult("");
    };
    
    const playRound = (cellIndex) => {
        if (gameOver) return;

        const currentPlayer = players[currentPlayerIndex];
        if (Gameboard.setCell(cellIndex, currentPlayer.symbol)) {
            if (checkWin()) {
                gameOver = true;
                DisplayController.updateResult(`${currentPlayer.name} wins!`);
            } else if (checkTie()) {
                gameOver = true;
                DisplayController.updateResult("It's a tie!");
            } else {
                currentPlayerIndex = 1 - currentPlayerIndex; // Switch player
                DisplayController.renderBoard();
            }
        }
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    return { startGame, playRound };
})();
