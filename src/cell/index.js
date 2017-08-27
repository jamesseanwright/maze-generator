'use strict';

const { createWalls, toggleWallBits } = require('../wallGenerator');

const START = 'START';
const FINISH = 'FINISH';

class Cell {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.isVisited = false;
        this.type = null;
        this.walls = createWalls();
    }

    visit(neighbour) {
        this.isVisited = true;
        this.walls = toggleWallBits(this, neighbour);
        neighbour.walls = toggleWallBits(neighbour, this);
    }

    markAsStart() {
        this.isVisited = true; // start cell is technically already visited
        this.type = START;
    }

    markAsFinish() {
        this.type = FINISH;
    }
}

module.exports = {
    Cell,
    START,
    FINISH,
};
