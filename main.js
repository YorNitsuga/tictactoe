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