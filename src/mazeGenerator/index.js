'use strict';

const { GRID_SIZE, CELL_COUNT } = require('../constants');
const { getRandomCell, getUnvisitedNeighbour } = require('../cellLocators');
const { createCell } = require('../cell');
const createStack = require('./stack');

const cellMarkers = new Map([
    [0, cell => cell.markAsStart()],
    [CELL_COUNT - 1, cell => cell.markAsFinish()],
]);

const createFilledArray = (length, predicate) => Array(length).fill(null).map(
    (_, i) => predicate(i)
);

function generateCells() {
    return createFilledArray(
        GRID_SIZE,
        column => createFilledArray(
            GRID_SIZE,
            row => createCell(column, row)
        )
    );
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
