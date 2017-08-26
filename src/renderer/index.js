'use strict';

const { CELL_SIZE_PX } = require('../constants');
const { isHorizontalWall } = require('../wallRenderer');

function renderWall(wallIndex, column, row, context) {
    const isHorizontal = isHorizontalWall(wallIndex);

}

function renderCell({ walls }, column, row, context) {
    for (let i = 0; i < walls.length; i++) {
        if (walls[i]) {
            renderWall(i, column, row, context);
        }
    }
}

function render(cells, context) {
    for (let column = 0; column < cells.length; column++) {
        for (let row = 0; row < cells[column].length; row++) {
            renderCell(cells[column][row], column, row, context);
        }
    }
}

module.exports = render;
