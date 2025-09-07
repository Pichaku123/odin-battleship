import "./styles.css";

const UI = require("./display");
const GameController = require("./gamecontroller");
const Player = require("./player");

document.addEventListener("DOMContentLoaded", () => {
    const p1 = new Player("human");
    const p2 = new Player("human"); // display.js changes p2 as needed
    const gameController = new GameController(p1, p2);

    UI(gameController); // <-- pass the gameController instance!
});