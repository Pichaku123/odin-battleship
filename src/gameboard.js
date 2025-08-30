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
        this.ships = [];    //ships for each board kept seperately
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
            return true;
        }
        return false;
    }

    randomlyPlaceShips(lengths){
        const dirs = ["hori", "vert"];
        for(let length of lengths){
            //run loop to place it till its placed in valid spot
            while(true){
                const r = Math.floor(Math.random() * this.size);
                const c = Math.floor(Math.random() * this.size);
                const dir = dirs[Math.floor(Math.random() * dirs.length)];
                if(this.placeShip(r, c, dir, length)){  //if it can't be placed, it returns false, if it can, it places and ret. true
                    break;  //go to next ship
                }
            }
        }
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
        this.ships.push(ship);  //push to ships array, easier to check if all sunk
        return true; // just to confirm its placed
    }

    receiveAttack(row, col) {
        const currCell = this.board[row][col];
        if (currCell.hit) {
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

    allShipsSunk() {
        for(let ship of this.ships){
            if(!ship.isSunk()){
                return false; 
            }
        }
        return true;
    }
}
module.exports = Gameboard;
