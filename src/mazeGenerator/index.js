'use strict';

const constants = require('../constants');
const cellLocators = require('../cell/locators');
const cellFactory = require('../cell/factory');
const createStack = require('./stack');

const FIRST_CELL = 'FIRST_CELL';
const LAST_COORD = `${constants.GRID_SIZE - 1},${constants.GRID_SIZE - 1}`;

const cellMarkers = new Map([
    [FIRST_CELL, cell => cell.visit()], // first cell is inherently visited
    ['0,0', cell => cell.markAsStart()],
    [LAST_COORD, cell => cell.markAsFinish()],
]);

const createFilledArray = (length, predicate) => Array(length).fill(null).map(
    (_, i) => predicate(i)
);

function generateCells() {
    const { GRID_SIZE } = constants;

    return createFilledArray(
        GRID_SIZE,
        column => createFilledArray(
            GRID_SIZE,
            row => cellFactory.createCell(column, row)
        )
    );
}

function markCell(cell, visitedCellsCount) {
    const key = visitedCellsCount === 0 ? FIRST_CELL : cell.toString();

    if (cellMarkers.has(key)) {
        cellMarkers.get(key)(cell);
    }
}

function generateMaze(
    cells = generateCells(),
    cell = cellLocators.getRandomCell(cells),
    stack = createStack(),
    visitedCellsCount = 0
) {
    const { CELL_COUNT } = constants;
    const neighbour = cellLocators.getUnvisitedNeighbour(cells, cell);
    const nextCell = neighbour || stack.pop();
    const increment = neighbour ? 1 : 0;

    markCell(cell, visitedCellsCount);

    if (neighbour) {
        neighbour.visit(cell); // TODO - progressively render maze by calling decoupled render function
        stack.push(neighbour);
    }

    return visitedCellsCount === CELL_COUNT - 1
        ? cells
        : generateMaze(cells, nextCell, stack, visitedCellsCount + increment);
}

module.exports = generateMaze;
