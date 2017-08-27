'use strict';

const sinon = require('sinon');
const constants = require('../constants');
const { getRandomCell, getUnvisitedNeighbours } = require('./locators');

describe('the cell locators', function () {
    afterEach(function () {
        if (Math.random.restore) {
            Math.random.restore();
        }
    });

    describe('the getRandomCell function', function () {
        let originalGridSize;

        before(function () {
            originalGridSize = constants.GRID_SIZE;
        });

        after(function () {
            constants.GRID_SIZE = originalGridSize;
        });

        it('should retrieve a random cell from the 2D cells array', function () {
            constants.GRID_SIZE = 2;

            const cells = [
                [
                    'column 0 row 0',
                    'column 0 row 1',
                    'column 0 row 2',
                ],

                [
                    'column 1 row 0',
                    'column 2 row 1',
                    'column 3 row 2',
                ],
            ];

            sinon.stub(Math, 'random')
                .onFirstCall()
                .returns(1)
                .onSecondCall()
                .returns(0);

            const expectedCell = 'column 1 row 0';
            const actualCell = getRandomCell(cells);

            expect(actualCell).to.equal(expectedCell);
        });
    });

    describe('the getUnvisitedNeighbours function', function () {
        let originalGridSize;

        before(function () {
            originalGridSize = constants;
        });

        after(function () {
            constants.GRID_SIZE = originalGridSize;
        });

        it('should return all horizontal and vertical neighbours that are unvisited', function () {
            const cells = [
                [
                    { column: 0, row: 0 },
                    { column: 0, row: 1 },
                    { column: 0, row: 2 },
                ],

                [
                    { column: 1, row: 0 },
                    { column: 1, row: 1 },
                    { column: 1, row: 2 },
                ],

                [
                    { column: 2, row: 0 },
                    { column: 2, row: 1 },
                    { column: 2, row: 2 },
                ],
            ];

            const cell = cells[1][1];

            const expectedNeighbours = [
                cells[0][1],
                cells[1][0],
                cells[2][1],
                cells[1][2],
            ];

            const actualNeighbours = getUnvisitedNeighbours(cells, cell);
            expect(actualNeighbours).to.deep.equal(expectedNeighbours);
        });
    });
});
