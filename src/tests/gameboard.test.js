/* eslint-disable */
const Gameboard = require("../gameboard");

test("check normal coords", () => {
    const gb = new Gameboard(5);
    expect(gb.board[0][0].occupied).toBe(false);
});

test("place random boat", () => {
    const gb = new Gameboard(5);
    gb.placeShip(2, 1, "hori", 3);

    expect(gb.board[0][0].occupied).toBe(false);
    expect(gb.board[2][1].occupied).not.toBe(false);
    expect(gb.board[2][2].occupied).not.toBe(false);
    expect(gb.board[2][3].occupied).not.toBe(false);
});
