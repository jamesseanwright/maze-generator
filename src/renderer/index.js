'use strict';

const { GRID_SIZE } = require('../constants');
const { isHorizontalWall, isRightWall, isBottomWall } = require('../wallGenerator');
const { START, FINISH } = require('../cell');

const markerRenderers = new Map([
    [START, (cell, column, row, cellSizePx, context) => {
        const x = cellSizePx * column + cellSizePx / 2;
        const y = cellSizePx * row + cellSizePx / 2;

        context.fillStyle = 'red';
        context.beginPath();
        context.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
        context.fill();

    }],

    [FINISH, (cell, column, row, cellSizePx, context) => {
        const x = cellSizePx * column + cellSizePx / 2;
        const y = cellSizePx * row + cellSizePx / 2;

        context.fillStyle = 'yellow';
        context.beginPath();
        context.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
        context.fill();
    }],
]);

function renderMarker(cell, column, row, cellSizePx, context) {
    if (markerRenderers.has(cell.type)) {
        markerRenderers.get(cell.type)(cell, column, row, cellSizePx, context);
    }
}

function renderWall(wallIndex, column, row, cellSizePx, context) {
    const isHorizontal = isHorizontalWall(wallIndex);
    const startX = column * cellSizePx + (isRightWall(wallIndex) ? cellSizePx : 0);
    const startY = row * cellSizePx + (isBottomWall(wallIndex) ? cellSizePx : 0);
    const endX = startX + (isHorizontal ? cellSizePx : 0);
    const endY = startY + (isHorizontal ? 0 : cellSizePx);

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function renderCell(cell, column, row, cellSizePx, context) {
    const { walls } = cell;

    renderMarker(cell, column, row, cellSizePx, context);
    walls.forEach((wall, i) => wall && renderWall(i, column, row, cellSizePx, context));
}

function render(cells, canvas) {
    const cellSizePx = canvas.width / GRID_SIZE;
    const context = canvas.getContext('2d');

    cells.forEach(
        (columns, columnIndex) => columns.forEach(
            (cell, rowIndex) => renderCell(cell, columnIndex, rowIndex, cellSizePx, context)
        )
    );
}

module.exports = render;
