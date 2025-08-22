const Player = require("./player");
const Gameboard = require("./gameboard");
const Ship = require("./ship");
const Cell = require("./cell");

const human = new Player("human");
const comp = new Player("comp");

human.gameboard.placeShip(0, 0, "hori", 2);
comp.gameboard.placeShip(1, 1, "hori", 2);

human.gameboard.printBoard();
console.log("\n");
comp.gameboard.printBoard();