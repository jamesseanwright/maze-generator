'use strict';

const GRID_SIZE = 24;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

/* TODO - inject these into consuming methods instead
 * of importing this directly to improve test setup.
 */
module.exports = {
    GRID_SIZE,
    CELL_COUNT,
};
