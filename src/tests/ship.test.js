/* eslint-disable */
const Ship = require("../ship");

test("checking sunk or not", () => {
    const boat = new Ship(5, 3);
    expect(boat.isSunk()).toBe(false);
    boat.gotHit();
    boat.gotHit();
    expect(boat.isSunk()).toBe(true);
});
