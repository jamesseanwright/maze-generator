'use strict';

const { createWalls, toggleWallBits } = require('../wallGenerator');

class Cell {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.walls = createWalls();
    }

    visit(neighbour) {
        this.walls = toggleWallBits(this, neighbour);
    }
}

module.exports = Cell;
