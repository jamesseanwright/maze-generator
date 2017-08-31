'use strict';

const wallGenerator = require('../wallGenerator');

const START = 'START';
const FINISH = 'FINISH';

function createCell(column, row) {
    let isVisited = false;
    let type = null;
    let walls = wallGenerator.createWalls();

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

            if (neighbour) {
                walls = wallGenerator.toggleWallBits(this, neighbour);
                neighbour.walls = wallGenerator.toggleWallBits(neighbour, this);
            }
        },

        markAsStart() {
            type = START;
        },

        markAsFinish() {
            type = FINISH;
        },

        toString() {
            return `${column},${row}`;
        },
    };
}

module.exports = {
    createCell,
    START,
    FINISH,
};
