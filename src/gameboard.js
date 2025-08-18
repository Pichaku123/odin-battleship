/* eslint-disable */
const Ship = require("./ship");

class Gameboard {
    constructor(size) {
        const board = [];
        for (let i = 0; i < size; i++) {
            const temp = [];
            for (let j = 0; j < size; j++) {
                temp.push("."); // . means not hit, x means hit.
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
            this.board[row][col] === "."
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
        const ship = new Ship(3);
        if (direction === "hori") {
            for (let i = 0; i < length; i++) {
                this.board[row][col + i] = ship; // each cell here points to ship.
            }
        } else if (direction === "vert") {
            for (let i = 0; i < length; i++) {
                this.board[row + i][col] = ship;
            }
        }
        return true; // just to confirm its placed
    }

    receiveAttack(x, y) {
        // we need some sort of marker to tell whether its been hit or not, cuz before this we only checked if its occupied or not.
    }
}

module.exports = Gameboard;
