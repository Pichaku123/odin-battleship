/* eslint-disable */
const Gameboard = require("../gameboard");

test("check normal coords", () => {
    const gb = new Gameboard(5);
    expect(gb.board[0][0]).toBe(".");
});

test("place random boat", () => {
    const gb = new Gameboard(5);
    gb.placeShip(2, 1, "hori", 3);

    expect(gb.board[0][0]).toBe(".");
    expect(gb.board[2][1]).not.toBe(".");
    expect(gb.board[2][2]).not.toBe(".");
    expect(gb.board[2][3]).not.toBe(".");
});
