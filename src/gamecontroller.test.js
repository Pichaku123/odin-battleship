const GameController = require("./gamecontroller");
const Player = require("./player");

test("putting random ships", () => {
    const human = new Player("human");
    const comp = new Player("comp");

    const newGame = new GameController(human, comp);
    newGame.start();
    newGame.turn();
    const cell = comp.gameboard.board[2][3];
    expect(cell.hit).toBe(true);
    if(cell.occupied){
        expect(cell.occupied.hits).toBe();
    }
    else{
        expect(cell.occupied).toBeNull();
    }
});
