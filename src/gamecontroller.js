/* eslint-disable */
const Player = require("./player");
const Gameboard = require("./gameboard");
class GameController {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.currPlayer = p1; //by default, we'll swap this later.
        this.winner = null;
        this.gameOver = false;
    }

    start() {
        //place ships before moving on.
        //moving ship placement logic to random button for now, might remove this function later.
    }

    turn(row = null, col = null, callback = null) {
        //assume we have coordinates from player.
        //we play the move and see outcome.
        //again, we track the currentPlayer throughout.
        const oppPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;

        //logic for computer moves here.
        if (this.currPlayer.type === "comp") {
            const [r, c] = this.currPlayer.makeMove(oppPlayer.gameboard);
            row = r;
            col = c;
        }

        //now take coords and attack oppPlayer's board.
        const status = oppPlayer.gameboard.receiveAttack(row, col);
        console.log(
            `Move played by ${this.currPlayer === this.p1 ? "p1" : "p2"} at ${row}, ${col}`
        );

        let result = {
            //for default case, update fields as needed
            row,
            col,
            status,
            gameOver: false,
            winner: null,
            currentPlayer: this.currPlayer,
        };

        if (status === "alr_atk") {
            if (callback) callback(result);
            return result;
        }

        // smarter ai logic, adds valid neighbours to a list which is checked on next move
        // more details in player
        if (status == "hit" && this.currPlayer.type === "comp") {
            const dirs = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
            ];
            for (const [dr, dc] of dirs) {
                const nr = row + dr;
                const nc = col + dc;
                //checking if valid position and if already hit, if anything occurs, ignore and move on to next
                if (
                    nr >= 0 &&
                    nc >= 0 &&
                    nr < oppPlayer.gameboard.size &&
                    nc < oppPlayer.gameboard.size &&
                    !oppPlayer.gameboard.board[nr][nc].hit
                ) {
                    this.currPlayer.checkNext.push([nr, nc]);
                }
            }
        }

        //check win condition
        if (oppPlayer.gameboard.allShipsSunk()) {
            //we win, update winner
            this.winner = this.currPlayer;
            result.gameOver = true;
            result.winner = this.currPlayer;
        } else {
            //swap current player only if they've played valid move
            this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
        }

        if (callback) callback(result); // basically the callback is used to update ui
        // basically sending result back to display.js to update the UI

        // play computer's move immediately if its computer's turn next, else move on normally.
        if (!result.gameOver && this.currPlayer.type === "comp") {
            setTimeout(() => this.turn(null, null, callback), 900); // fake illusion of ai "thinking"
        }
        return result;
    }

}

module.exports = GameController;
