'use strict';

const { GRID_SIZE, CELL_COUNT } = require('../constants');
const { getRandomCell, getUnvisitedNeighbour } = require('../cellLocators');
const Cell = require('../cell');
const createStack = require('./stack');

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
function generateMaze(
    cells = generateCells(),
    cell = getRandomCell(cells),
    visitedCellsCount = 0,
    stack = createStack(),
) {
    const neighbour = getUnvisitedNeighbour(cells, cell);
    let increment = 0;

    if (neighbour) {
        neighbour.visit(cell); // TODO - progressively render maze by calling decoupled render function
        stack.push(neighbour);
        increment = 1;
    }

    if (visitedCellsCount === CELL_COUNT - 1) return cells;

    const nextCell = neighbour || stack.pop();

    return generateMaze(cells, nextCell, visitedCellsCount + increment, stack);
}

module.exports = generateMaze;
