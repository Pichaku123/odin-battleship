class Cell {
    constructor() {
        this.occupied = null;   //changed it, now it stores object instead of t/f, i can track which ship occupies this.
        this.hit = false;
    }
}

module.exports = Cell;
