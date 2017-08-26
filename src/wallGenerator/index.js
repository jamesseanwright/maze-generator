'use strict';

const wallDeletionComputations = [
    (cell, neighbour) => neighbour.row < cell.row ? 1 : 0,
    (cell, neighbour) => neighbour.column > cell.column ? 1 : 0,
    (cell, neighbour) => neighbour.row > cell.row ? 1 : 0,
    (cell, neighbour) => neighbour.column < cell.column ? 1 : 0,
];

const createWalls = () => [1, 1, 1, 1]; // top-right-bottom-left - transformed via bit mask
const isHorizontalWall = index => index % 2 === 0;
const isBottomWall = index => index === 2;
const isRightWall = index => index === 1;

const toggleWallBits = (cell, neighbour) => cell.walls.map(
    (bit, i) => bit ^ wallDeletionComputations[i](cell, neighbour)
);

module.exports = {
    createWalls,
    toggleWallBits,
    isHorizontalWall,
    isBottomWall,
    isRightWall,
};
