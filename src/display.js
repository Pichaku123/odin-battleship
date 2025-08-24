/* eslint-disable*/
const GameController = require("./gamecontroller");

const UI = (gameController) => {
    const board1 = gameController.p1.gameboard;
    const board2 = gameController.p2.gameboard;
    const boardContainer = document.querySelector("#board-container");
    console.log(boardContainer);

    const renderBoard = (currBoard) => {
        // now we've passed the gamecontroller with all the methods and stuff into UI.
        // this includes the actual boards, so we can access those too.
        const boardNo = currBoard === board1 ? 1 : 2;
        const boardDisplay = document.createElement("div");
        boardDisplay.classList.add(`board-${boardNo}`);
        boardContainer.appendChild(boardDisplay);
        for (let i = 0; i < currBoard.size; i++) {
            const row = document.createElement("div");
            row.classList.add("board-row");
            for (let j = 0; j < currBoard.size; j++) {
                const cell = document.createElement("div");
                cell.classList.add("board-cell");
                row.appendChild(cell);
            }
            boardDisplay.appendChild(row);
        }
    };
    renderBoard(board1);
    renderBoard(board2);
    
};

module.exports = UI;
