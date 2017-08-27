'use strict';

const sinon = require('sinon');
const constants = require('../constants');
const locators = require('./locators');
const { getRandomCell, getUnvisitedNeighbours, getUnvisitedNeighbour } = locators;

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

        it('should filter any cells that are visited', function () {
            const cells = [
                [
                    { column: 0, row: 0 },
                    { column: 0, row: 1, isVisited: true },
                    { column: 0, row: 2 },
                ],

                [
                    { column: 1, row: 0 },
                    { column: 1, row: 1 },
                    { column: 1, row: 2, isVisited: true },
                ],

                [
                    { column: 2, row: 0 },
                    { column: 2, row: 1 },
                    { column: 2, row: 2 },
                ],
            ];

            const cell = cells[1][1];

            const expectedNeighbours = [
                cells[1][0],
                cells[2][1],
            ];

            const actualNeighbours = getUnvisitedNeighbours(cells, cell);
            expect(actualNeighbours).to.deep.equal(expectedNeighbours);
        });

        it('should return an empty array if all neighbours have been visited', function () {
            const cells = [
                [
                    { column: 0, row: 0, isVisited: true },
                    { column: 0, row: 1, isVisited: true },
                    { column: 0, row: 2, isVisited: true },
                ],

                [
                    { column: 1, row: 0, isVisited: true },
                    { column: 1, row: 1 },
                    { column: 1, row: 2, isVisited: true },
                ],

                [
                    { column: 2, row: 0, isVisited: true },
                    { column: 2, row: 1, isVisited: true },
                    { column: 2, row: 2, isVisited: true },
                ],
            ];

            const cell = cells[1][1];
            const expectedNeighbours = [];

            const actualNeighbours = getUnvisitedNeighbours(cells, cell);
            expect(actualNeighbours).to.deep.equal(expectedNeighbours);
        });
    });

    describe('the getUnvisitedNeighbour function', function () {
        afterEach(function () {
            if (locators.getUnvisitedNeighbours.restore) {
                locators.getUnvisitedNeighbours.restore();
            }

            if (Math.random.restore) {
                Math.random.restore();
            }
        });

        it('should return a single, random neighbour', function () {
            const cells = [
                [
                    { column: 0, row: 0 },
                    { column: 0, row: 1 },
                    { column: 0, row: 2 },
                ],
            ];

            sinon.stub(locators, 'getUnvisitedNeighbours')
                .returns([cells[0], cells[2]]);

            sinon.stub(Math, 'random')
                .returns(0);

            const neighbour = getUnvisitedNeighbour(cells, cells[1]);
            expect(neighbour).to.equal(cells[0]);
        });

        it('should return null if there are no neighbours', function () {
            const cells = [
                [
                    { column: 0, row: 0 },
                    { column: 0, row: 1 },
                    { column: 0, row: 2 },
                ],
            ];

            sinon.stub(locators, 'getUnvisitedNeighbours')
                .returns([]);

            sinon.stub(Math, 'random')
                .returns(0);

            const neighbour = getUnvisitedNeighbour(cells, cells[1]);
            expect(neighbour).to.be.null;
        });
    });
});
