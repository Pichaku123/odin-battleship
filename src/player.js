const Gameboard = require("./gameboard");

class Player {
    constructor(type = "human") {
        this.type = type;
        this.gameboard = new Gameboard(10);
        if(this.type == "comp"){
            this.checkNext = [];    // basically stores cells that surround current hit one, if its empty, just pick randomly.
        }
    }

    makeMove(oppBoard) {
        // basically this does nothing if we've got a human, but chooses random spot if its a computer player.
        if (this.type === "human") return null; // again, no changes for human turn logic, cuz we're the ones manually inputting moves
        let r;
        let c;
        if(this.checkNext.length > 0){  // if we have smth to check, basically if we hit a ship earlier
            [r, c] = this.checkNext.pop();  // check a direction from checkNext
        } 
        else {
            while (true) {
                r = Math.floor(Math.random() * oppBoard.size);
                c = Math.floor(Math.random() * oppBoard.size);
                if (!oppBoard.board[r][c].hit) {
                    // valid move found
                    break;
                }
            }
        }
        return [r, c];
    }
}

module.exports = Player;
