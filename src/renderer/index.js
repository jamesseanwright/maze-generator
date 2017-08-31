'use strict';

const { GRID_SIZE } = require('../constants');
const { isHorizontalWall, isRightWall, isBottomWall } = require('../wallGenerator');
const { START, FINISH } = require('../cell/factory');

const FLAG_CHECKER_COUNT = 4;

const markerRenderers = new Map([
    [START, (cell, column, row, cellSizePx, context) => {
        const x = cellSizePx * column;
        const y = cellSizePx * row;

        context.fillStyle = 'green';

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + cellSizePx, y + cellSizePx / 2);
        context.lineTo(x, y + cellSizePx);
        context.lineTo(x, y);
        context.fill();
    }],

    [FINISH, (cell, column, row, cellSizePx, context) => {
        const baseX = cellSizePx * column;
        const baseY = cellSizePx * row;
        const checkerSizePx = cellSizePx / FLAG_CHECKER_COUNT;

        for (let i = 0; i < FLAG_CHECKER_COUNT; i++) {
            const x = baseX + checkerSizePx * i;

            for (let j = 0; j < FLAG_CHECKER_COUNT; j++) {
                const y = baseY + checkerSizePx * j;
                const fill = (i + j) % 2 === 0 ? 'black' : 'white';
                context.strokeStyle = null;
                context.fillStyle = fill;
                context.fillRect(x, y, checkerSizePx, checkerSizePx);
            }
        }
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
