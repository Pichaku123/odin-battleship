/* eslint-disable*/
const GameController = require("./gamecontroller");

const UI = (gameController) => {
    const board1 = gameController.p1.gameboard;
    const board2 = gameController.p2.gameboard;
    const boardContainer = document.querySelector("#board-container");
    const statusMsg = document.querySelector("#status-msg");
    
    //random ship placement
    document.querySelector("#random-ship").addEventListener("click", () => {
        const lengths = [2, 3, 3, 4, 5];
        board1.randomlyPlaceShips(lengths);
        board2.randomlyPlaceShips(lengths);
        renderBothBoards();
        statusMsg.innerHTML = "Randomly placed boards.";
    });

    const renderBothBoards = () => {
        boardContainer.innerHTML = ""; // to clear previous boards
        renderBoard(board1);
        renderBoard(board2);
    };

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
                markCondition(currBoard.board[i][j], cell);

                const oppBoard = gameController.currPlayer === gameController.p1 ? board2 : board1;
                //add event listener during cell creation in dom itself, tbd later
                cell.addEventListener("click", () => clickHandler(currBoard, i, j, cell));
                statusMsg.innerHTML = gameController.currPlayer === gameController.p1 ? `Player 1's turn` : `Player 2's turn`;
            }

            boardDisplay.appendChild(row);
        }
    };

    const clickHandler = (currBoard, i, j, cell) => {
        //use the turn's result to get turn details like coords, status and stuff
        if (!gameController.winner) {
            //adding checks to ensure we only click on enemy's board, not our own
            statusMsg.innerHTML = "";
            const oppBoard = gameController.currPlayer === gameController.p1 ? board2 : board1;
            if (currBoard !== oppBoard) {
                statusMsg.innerHTML = "Can't attack your own board";
                console.log(statusMsg.innerHTML);
                return;
            }

            //pass callback to turn() to update ui after every turn
            gameController.turn(i, j, (turnResult) => {
                renderBothBoards();
                if (turnResult.status === "alr_atk") {
                    statusMsg.innerHTML = "Invalid, retry";
                    console.log(statusMsg.innerHTML);
                    return;
                }

                if (turnResult.gameOver) {
                    if (turnResult.winner === gameController.p1) {
                        statusMsg.innerHTML = "Player 1 wins!";
                        console.log(statusMsg.innerHTML);
                    } else {
                        statusMsg.innerHTML = "Player 2 wins!";
                        console.log(statusMsg.innerHTML);
                    }
                }
            }); //callback to update the board after every turn
        }
    };

    const markCondition = (currCell, cellDOM) => {
        //remove the other classes first, cuz that was causing issues with updating css
        cellDOM.classList.remove("hit", "miss", "not-yet", "nothing");
        if (currCell.occupied && currCell.hit) {
            cellDOM.classList.toggle("hit");
        } else if (currCell.occupied && !currCell.hit) {
            cellDOM.classList.toggle("not-yet");
        } else if (!currCell.occupied && currCell.hit) {
            cellDOM.classList.toggle("miss");
        } else {
            cellDOM.classList.toggle("nothing");
        }
    };

    renderBoard(board1);
    renderBoard(board2);
};

module.exports = UI;
