const Gameboard = require("./gameboard");

class Player{
    constructor(type = "human"){
        this.type = type;
        this.gameboard = new Gameboard(10);
    }
}

module.exports = Player;