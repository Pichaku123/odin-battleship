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
                this.board[row][col + i].occupied = ship; // each cell here points to ship.
            }
        } else if (direction === "vert") {
            for (let i = 0; i < length; i++) {
                this.board[row + i][col].occupied = ship;
            }
        }
        return true; // just to confirm its placed
    }

    receiveAttack(x, y) {
        //ill just update the cell's properties to mark as occupied, not sure what to do about ship tho, idk how to track ship.
    }
}

module.exports = Gameboard;
