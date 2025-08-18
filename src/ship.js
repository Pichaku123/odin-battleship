class Ship {
    constructor(length, hits = 0) {
        this.length = length;
        this.hits = hits;
    }

    isSunk() {
        return this.length === this.hits;
    }

    gotHit() {
        this.hits += 1;
    }
}

module.exports = Ship;
