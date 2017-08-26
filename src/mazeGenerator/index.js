'use strict';

const { GRID_SIZE, CELL_COUNT } = require('../constants');
const { getRandomCell, getRandomNeighbour } = require('../cellLocators');
const Cell = require('../cell');

// TODO: cleaner approach
function generateCells() {
    const cells = [];

    for (let i = 0; i < GRID_SIZE; i++) {
        cells[i] = [];

        for (let j = 0; j < GRID_SIZE; j++) {
            cells[i][j] = new Cell(i, j);
        }
    }

    return cells;
}

// TODO: Generate in Worker thread?
function generateMaze(cells = generateCells(), cell = getRandomCell(cells), visitedCellsCount = 0) {
    const neighbour = getRandomNeighbour(cells, cell);
    neighbour.visit(cell); // TODO - progressively render maze by calling decoupled render function

    if (visitedCellsCount === CELL_COUNT - 1) {
        console.log('******* returning cells');
        return cells;
    }

    generateMaze(cells, neighbour, visitedCellsCount + 1);
}

module.exports = generateMaze;
