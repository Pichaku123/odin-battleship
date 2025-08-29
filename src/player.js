const Gameboard = require("./gameboard");

class Player {
    constructor(type = "human") {
        this.type = type;
        this.gameboard = new Gameboard(10);
    }

    makeMove(oppBoard) {
        // basically this does nothing if we've got a human, but chooses random spot if its a computer player.
        if (this.type === "human") return null; // again, no changes for human turn logic, cuz we're the ones manually inputting moves
        let r;
        let c;
        while (true) {
            r = Math.floor(Math.random() * oppBoard.size);
            c = Math.floor(Math.random() * oppBoard.size);
            if (!oppBoard.board[r][c].hit) {
                // valid move found
                break;
            }
        }
        return [r, c];
    }
}

module.exports = Player;
