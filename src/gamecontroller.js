/* eslint-disable */
const Player = require("./player");
const Gameboard = require("./gameboard");
class GameController{
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
        this.currPlayer = p1;     //by default, we'll swap this later.
        this.winner = null;
        this.gameOver = false;
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

    turn(row = null, col = null, callback = null){
        //assume we have coordinates from player.
        //we play the move and see outcome.
        //again, we track the currentPlayer throughout.
        const oppPlayer = (this.currPlayer === this.p1) ? (this.p2) : (this.p1);
        
        //logic for computer moves here.
        if(this.currPlayer.type === "comp"){
            const [r, c] =  this.currPlayer.makeMove(oppPlayer.gameboard);
            row = r;
            col = c;
        }

        //now take coords and attack oppPlayer's board.
        const status = oppPlayer.gameboard.receiveAttack(row, col); 

        //well status part works ig, use that to do smth in ui, ofc that's tbd later.

        console.log(`Move played by ${this.currPlayer === this.p1 ? "p1" : "p2"} at ${row}, ${col}`);
        if(status === "alr_atk"){
            return {
                row,
                col,
                status,
                gameOver: false,
                winner: null,
                currentPlayer: this.currPlayer, 
            };
        }

        const result = {
            row, 
            col, 
            status, 
            gameOver: false, 
            winner: null, 
            currentPlayer: this.currPlayer
        };

        //check win condition
        if(oppPlayer.gameboard.allShipsSunk()){
            //we win, update winner
            this.winner = this.currPlayer;
            result.gameOver = true;
            result.winner = this.currPlayer;
        }
        else{
            //swap current player only if they've played valid move
            this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
            //update- play computer's move immediately if its computer's turn next, else move on normally.
            
            if(this.currPlayer.type === "comp"){
                setTimeout(() => this.turn(null, null, callback), 300);     // fake illusion of ai "thinking", recursively play next turn
            }
        }
        if(callback) callback(result); //basically the callback is used to update ui
        //the definition of callback is in display.js
        //basically sending result back to display.js to update the UI
        return result;  
    }

}

module.exports = GameController;