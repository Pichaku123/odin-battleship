class Cell {
    constructor() {
        this.occupied = null; // changed it, now it stores object instead of t/f, i can track which ship occupies this.
        this.hit = false;
        // also, if cell is not occupied but got hit, then shot missed.
        // (!occupied && hit)
    }
}

module.exports = Cell;