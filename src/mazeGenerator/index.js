'use strict';

const { GRID_SIZE, CELL_COUNT } = require('../constants');
const { getRandomCell, getUnvisitedNeighbour } = require('../cellLocators');
const { createCell } = require('../cell');
const createStack = require('./stack');

const cellMarkers = new Map([
    [0, cell => cell.markAsStart()],
    [CELL_COUNT - 1, cell => cell.markAsFinish()],
]);

function generateCells() {
    const cells = [];

    for (let column = 0; column < GRID_SIZE; column++) {
        cells[column] = [];

        for (let row = 0; row < GRID_SIZE; row++) {
            cells[column][row] = createCell(column, row);
        }
    }

    return cells;
}

function markCell(cell, visitedCellsCount) {
    if (cellMarkers.has(visitedCellsCount)) {
        cellMarkers.get(visitedCellsCount)(cell);
    }
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

    markCell(cell, visitedCellsCount);

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
