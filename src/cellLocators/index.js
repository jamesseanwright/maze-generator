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

function getRandomNumber(max = 1) {
    return Math.round(Math.random() * max);
}

function getRandomCell(cells) {
    return cells[getRandomNumber(GRID_SIZE - 1)][getRandomNumber(GRID_SIZE - 1)];
}

function getRandomNeighbour(cells, cell) {
    let column = -1;
    let row = -1;
    let i = 0;

    while (!isValidNeighbour(cell, column, row)) {
        if (i > 100) { // TODO: this is to avoid infinite loops. Remove when more stable
            throw new Error('100 iterations for neighbour selection surpassed', column, row, cell);
        }

        column = (cell.column + 1) - getRandomNumber(2);
        row = (cell.row + 1) - getRandomNumber(2);
        i++;
    }

    return cells[column][row];
}

function isValidNeighbour(...args) {
    return validNeighbourRuleset.every(rule => rule(...args));
}

module.exports = {
    getRandomCell,
    getRandomNeighbour,
};
