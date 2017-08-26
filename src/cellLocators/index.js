'use strict';

const { GRID_SIZE } = require('../constants');

const validNeighbourRuleset = [
    // TODO: simplify first rule once tests are written
    (currentCell, neighbourColumn, neighbourRow) => (neighbourColumn === currentCell.column && neighbourRow !== currentCell.row) || (neighbourRow === currentCell.row && neighbourColumn !== currentCell.column),
    (currentCell, neighbourColumn) => neighbourColumn >= 0,
    (currentCell, neighbourColumn, neighbourRow) => neighbourRow >= 0,
    (currentCell, neighbourColumn) => neighbourColumn < GRID_SIZE,
    (currentCell, neighbourColumn, neighbourRow) => neighbourRow < GRID_SIZE,
];

const getRandomNumber = (max = 1) => Math.round(Math.random() * max);
const getRandomCell = (cells) => cells[getRandomNumber(GRID_SIZE - 1)][getRandomNumber(GRID_SIZE - 1)];

function getRandomNeighbour(cells, cell) {
    let column = -1;
    let row = -1;

    while (!isValidNeighbour(cell, column, row)) { // TODO - generate new random is neighbour already visited?
        column = (cell.column + 1) - getRandomNumber(2);
        row = (cell.row + 1) - getRandomNumber(2);
    }

    return cells[column][row];
}

const isValidNeighbour = (...args) => validNeighbourRuleset.every(rule => rule(...args));

module.exports = {
    getRandomCell,
    getRandomNeighbour,
};
