/* eslint-disable */
const Ship = require("./ship");
const Cell = require("./cell");
class Gameboard {
    constructor(size) {
        const board = [];
        for (let i = 0; i < size; i++) {
            const temp = [];
            for (let j = 0; j < size; j++) {
                const currCell = new Cell();
                temp.push(currCell);
            }
            board.push(temp);
        }
        this.board = board;
        this.size = size;
    }

    validPos(row, col) {
        // basically to check valid position or not
        if (
            row >= 0 &&
            row < this.size &&
            col >= 0 &&
            col < this.size &&
            !this.board[row][col].occupied
        ) {
            // 0 indexed
            return true;
        }
        return false;
    }

    placeShip(row, col, direction, length) {
        // reutrn false if can't place, return true and place if we can.
        // ill make a button to change direction later ig
        if (direction === "hori") {
            for (let i = 0; i < length; i++) {
                if (!this.validPos(row, col + i)) {
                    return false;
                }
            }
        } else if (direction === "vert") {
            for (let i = 0; i < length; i++) {
                if (!this.validPos(row + i, col)) {
                    return false;
                }
            }
        }

        // place the actual ship, no need to check anymore.
        const ship = new Ship(length);
        if (direction === "hori") {
            for (let i = 0; i < length; i++) {
                this.board[row][col + i].occupied = ship; // each cell here points to ship, no need to make seperate stuff to track it.
            }
        } else if (direction === "vert") {
            for (let i = 0; i < length; i++) {
                this.board[row + i][col].occupied = ship;
            }
        }
        return true; // just to confirm its placed
    }

    receiveAttack(row, col) {
        const currCell = this.board[row][col];
        if (currCell.hit) {
            x;
            return "alr_atk"; // here its already hit
        }
        currCell.hit = true;
        //now after hitting this cell, check if it sunk any ships or not.
        //rules for miss/hit in cell.js, rn we need to check whether it hit a ship or not.
        if (currCell.occupied) {
            //hit an actual ship
            let currShip = currCell.occupied;
            currShip.gotHit();
            if (currShip.isSunk()) {
                return "sunk";
            } else {
                return "hit";
            }
        } else {
            //no ship here, shot missed
            return "miss";
        }
    }

    printBoard() {
        for (let i = 0; i < this.size; i++) {
            let rowOP = "";
            for (let j = 0; j < this.size; j++) {
                if (!this.board[i][j].occupied && !this.board[i][j].hit) {
                    rowOP += ".";
                } else if (this.board[i][j].occupied && !this.board[i][j].hit) {
                    rowOP += "x";
                }
            }
            console.log(`${rowOP}\n`);
        }
    }

    allShipsSunk() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                //check each cell if it has ship or not.
                //if it has ship, check if that ship is sunk or not.
                //if it has ship that's not sunk, return false.
                const currShip = this.board[i][j].occupied;
                if (currShip && !currShip.isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }
}
module.exports = Gameboard;
