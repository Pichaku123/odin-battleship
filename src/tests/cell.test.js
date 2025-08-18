/*eslint-disable*/
const Cell = require("../cell");

test("cell creation", () => {
    const temp = new Cell();
    temp.hit = true;
    expect(temp.hit).toBe(true);
    expect(temp.occupied).toBe(false);
});
