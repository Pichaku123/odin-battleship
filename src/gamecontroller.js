/* eslint-disable */
const Player = require("./player");
const Gameboard = require("./gameboard");
class GameController{
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
        this.currPlayer = p1;     //by default, we'll swap this later.
    }
    
    start(){
        //place ships before moving on.
        this.p1.gameboard.placeShip(0, 0, "hori", 2);   //use input from ui later.
        this.p2.gameboard.placeShip(1, 1, "hori", 2);
        this.p2.gameboard.placeShip(2, 4, "vert", 3);

        //render boards here, do it later in display.js
        // this.p1.gameboard.printBoard();
        // console.log("\n");
        // this.p2.gameboard.printBoard();
    }

    turn(){
        //assume we have coordinates from player.
        //we play the move and see outcome.
        //again, we track the currentPlayer throughout.
        const oppPlayer = (this.currPlayer === this.p1) ? (this.p2) : (this.p1);
        //now take coords and attack oppPlayer's board.
        let tempR = 2, tempC = 3;
        const status = oppPlayer.gameboard.receiveAttack(tempR, tempC);
        console.log(status);

        //well status part works ig, use that to do smth in ui, ofc that's tbd later.
        //call smth from ui here

        //swap current player only if they've played valid move
        this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;

        //check win condition
        if(oppPlayer.gameboard.allShipsSunk()){
            //we win
        }
        else{
            //continue, return the info about this turn for ui.
        }
    }

}

module.exports = GameController;