class Cell {
    constructor() {
        this.occupied = null; // changed it, now it stores object instead of t/f, i can track which ship occupies this.
        this.hit = false;
        // also, if cell is not occupied but got hit, then shot missed.
        // (!occupied && hit)\
        // shot missed when occ = false, hit = true
        // occ = false, hit = false means nothing happened
        // occ = true, hit = false means it isn't attacked yet.
        // occ = true, hit = true means it hit the ship, there we need to update the ship's status.
    }
}

module.exports = Cell;