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
                markCondition(currBoard.board[i][j], cell);
                console.log(cell.classList.entries);

                //add event listener during cell creation in dom itself, tbd later
                cell.addEventListener("click", () => {
                    //use the turn's result to get turn details like coords, status and stuff
                    if(!gameController.winner){
                        const turnResult = gameController.turn(i, j);
                        if(turnResult.status === "alr_atk"){
                            console.log("Invalid, retry");
                            return;
                        }

                        markCondition(currBoard.board[i][j], cell);     //dom updated here
                        if(turnResult.gameOver){
                            if(turnResult.winner === gameController.p1){
                                alert(`Player 1 wins!`);
                            }
                            else{
                                alert(`Player 2 wins!`);
                            }
                        }
                    }
                });
                
            }

            boardDisplay.appendChild(row);
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
