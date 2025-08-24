import "./styles.css";

const Player = require("./player");
const Gameboard = require("./gameboard");
const Ship = require("./ship");
const Cell = require("./cell");
const GameController = require("./gamecontroller");
const UI = require("./display");

const human = new Player("human");
const comp = new Player("comp");

const game = new GameController(human, comp);
game.start();
document.addEventListener("DOMContentLoaded", () => {
    UI(game);
});
