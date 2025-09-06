/* eslint-disable*/
const GameController = require("./gamecontroller");

const UI = (gameController) => {
    const board1 = gameController.p1.gameboard;
    const board2 = gameController.p2.gameboard;
    const boardContainer = document.querySelector("#board-container");
    const statusMsg = document.querySelector("#status-msg");
    const ships = document.querySelectorAll(".ship");
    const startBtn = document.querySelector("#start-game");
    let gameStartedYet = false;

    ships.forEach((ship) => {
        ship.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("length", ship.dataset.length);
            e.dataTransfer.setData("orientation", "hori");
        });
    });

    const shipPlacement = () => {
        if (gameController.p1.type === "comp") {
            board1.randomlyPlaceShips([2, 3, 3, 4, 5]);
        }
        if(gameController.p2.type === "comp"){
            board2.randomlyPlaceShips([2, 3, 3, 4, 5]);
        }
        renderBothBoards();
        updateStart();
        statusMsg.innerHTML = "Place your ships!";
    }

    //random ship placement
    document.querySelector("#random-ship").addEventListener("click", () => {
        randomPlacementMode();
    });

    const randomPlacementMode = () => {
        // reset boards before placing more, else it places them along with these
        board1.ships = [];
        for (let i = 0; i < board1.size; i++) {
            for (let j = 0; j < board1.size; j++) {
                board1.board[i][j].occupied = false;
                board1.board[i][j].hit = false;
            }
        }
        board2.ships = [];
        for (let i = 0; i < board2.size; i++) {
            for (let j = 0; j < board2.size; j++) {
                board2.board[i][j].occupied = false;
                board2.board[i][j].hit = false;
            }
        }

        board1.randomlyPlaceShips([2, 3, 3, 4, 5]);
        board2.randomlyPlaceShips([2, 3, 3, 4, 5]);

        renderBothBoards();
        updateStart();
        statusMsg.innerHTML = "Randomly placed boards.";
    };
    
    const allShipsPlaced = () => {
        const p1Done = board1.ships.length === 5;
        const p2Done = board2.ships.length === 5;
        if (gameController.p1.type === "human" && gameController.p2.type === "human") {
            return p1Done && p2Done;
        }
        if (gameController.p1.type === "human" && gameController.p2.type === "comp") {
            return p1Done;
        }
        if (gameController.p1.type === "comp" && gameController.p2.type === "human") {
            return p2Done;
        }
        return true;
    }

    const updateStart = () => {
        if(startBtn){
            startBtn.disabled = !allShipsPlaced();  // disable if all ships are not placed
            if (startBtn.disabled) {
                statusMsg.innerHTML = "Place all ships before starting.";
            } else {
                statusMsg.innerHTML = "Ready to start!";
            }
        }
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            if (allShipsPlaced()) {
                statusMsg.innerHTML = "Game started!";
                startBtn.disabled = true;
                gameStartedYet = true;
            } else {
                statusMsg.innerHTML = "Place all ships first!";
            }
        });
    }

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

                //add event listener during cell creation in dom itself, tbd later
                //logic for clicks on board
                const oppBoard = gameController.currPlayer === gameController.p1 ? board2 : board1;
                if(currBoard === oppBoard){
                    cell.addEventListener("click", () => clickHandler(currBoard, i, j, cell));
                }

                //drag and drop for ship placing
                if (
                    (currBoard === board1 && gameController.p1.type === "human") ||
                    (currBoard === board2 && gameController.p2.type === "human")
                ) {
                    cell.addEventListener("dragover", (e) => {
                        e.preventDefault();
                    });

                    cell.addEventListener("drop", (e) => {
                        e.preventDefault();
                        const len = parseInt(e.dataTransfer.getData("length"));
                        const ori = e.dataTransfer.getData("orientation");

                        const alreadyPlaced = currBoard.ships.some((ship) => ship.length === len);
                        if (alreadyPlaced) return; 
                        
                        const status = currBoard.placeShip(i, j, ori, len);
                        if (status) {
                            const shipDOM = Array.from(ships).find(
                                (s) => parseInt(s.dataset.length) === len && s.draggable
                            );
                            if(shipDOM) {
                                shipDOM.draggable = false;
                                shipDOM.classList.add("placed");
                            }
                            //make it not draggable, will darken this using css ig.
                            renderBothBoards();
                            updateStart();
                        }
                    });
                }

                statusMsg.innerHTML =
                    gameController.currPlayer === gameController.p1
                        ? `Player 1's turn`
                        : `Player 2's turn`;
            }

            boardDisplay.appendChild(row);
        }
    };

    const clickHandler = (currBoard, i, j, cell) => {
        if(!gameStartedYet){
            statusMsg.innerHTML = "Game not started.";
            return;
        }
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
            gameController.turn(i, j, handleTurnResult);
        }
    };

    const handleTurnResult = (turnResult) => {
        renderBothBoards();

        const board1DOM = document.querySelector(".board-1");
        const board2DOM = document.querySelector(".board-2");
        board1DOM.classList.remove("active-board", "inactive-board"); //reset them
        board2DOM.classList.remove("active-board", "inactive-board");

        //apply opacity based on class
        if (turnResult.currentPlayer === gameController.p1) {
            board1DOM.classList.add("active-board");
            board2DOM.classList.add("inactive-board");
        } else {
            board2DOM.classList.add("active-board");
            board1DOM.classList.add("inactive-board");
        }

        //checking status of result
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
    }

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

    shipPlacement();
    updateStart();
};

module.exports = UI;
