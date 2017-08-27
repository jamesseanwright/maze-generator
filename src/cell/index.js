'use strict';

const { createWalls, toggleWallBits } = require('../wallGenerator');

class Cell {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.isVisited = false;
        this.walls = createWalls();
    }

    visit(neighbour) {
        this.isVisited = true;
        this.walls = toggleWallBits(this, neighbour);
        neighbour.walls = toggleWallBits(neighbour, this);
    }
}

module.exports = Cell;
