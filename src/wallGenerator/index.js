'use strict';

const wallDeletionComputations = [
    (cell, neighbour) => neighbour.row < cell.row ? 1 : 0,
    (cell, neighbour) => neighbour.column > cell.column ? 1 : 0,
    (cell, neighbour) => neighbour.row > cell.row ? 1 : 0,
    (cell, neighbour) => neighbour.column < cell.column ? 1 : 0,
];

const createWalls = () => [1, 1, 1, 1]; // top-right-bottom-left - transformed via bit mask

function toggleWallBits(cell, neighbour) {
    return cell.walls.map(
        (bit, i) => bit ^ wallDeletionComputations[i](cell, neighbour)
    );
}

module.exports = {
    createWalls,
    toggleWallBits,
};
