'use strict';

const constants = require('../constants');

const getRandomNumber = (max = 1, method = 'round') => Math[method](Math.random() * max);
const getRandomCell = cells => cells[getRandomNumber(constants.GRID_SIZE - 1)][getRandomNumber(constants.GRID_SIZE - 1)];

function getUnvisitedNeighbours(cells, { column, row }) {
    const { GRID_SIZE } = constants;

    const previousColumn = column > 0 ? cells[column - 1][row] : null;
    const previousRow = row > 0 ? cells[column][row - 1] : null;
    const nextColumn = column < GRID_SIZE - 1 ? cells[column + 1][row] : null;
    const nextRow = row < GRID_SIZE - 1 ? cells[column][row + 1] : null;

    return [previousColumn, previousRow, nextColumn, nextRow]
        .filter(Boolean)
        .filter(cell => !cell.isVisited);
}

function getUnvisitedNeighbour(cells, cell) {
    const neighbours = locators.getUnvisitedNeighbours(cells, cell);
    return neighbours[getRandomNumber(neighbours.length, 'floor')] || null;
}

const locators = module.exports = {
    getRandomCell,
    getUnvisitedNeighbour,
    getUnvisitedNeighbours,
};
