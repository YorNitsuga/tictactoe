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
})();
