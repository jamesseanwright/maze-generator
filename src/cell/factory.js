'use strict';

const { createWalls, toggleWallBits } = require('../wallGenerator');

const START = 'START';
const FINISH = 'FINISH';

function createCell(column, row) {
    let isVisited = false;
    let type = null;
    let walls = createWalls();

    return {
        get column() {
            return column;
        },

        get row() {
            return row;
        },

        get isVisited() {
            return isVisited;
        },

        get type() {
            return type;
        },

        get walls() {
            return walls;
        },

        set walls(newWall) {
            walls = newWall;
        },

        visit(neighbour) {
            isVisited = true;
            walls = toggleWallBits(this, neighbour);
            neighbour.walls = toggleWallBits(neighbour, this);
        },

        markAsStart() {
            isVisited = true; // start cell is technically already visited
            type = START;
        },

        markAsFinish() {
            type = FINISH;
        },
    };
}

module.exports = {
    createCell,
    START,
    FINISH,
};
