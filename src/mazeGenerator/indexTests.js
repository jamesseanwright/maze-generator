'use strict';

const sinon = require('sinon');
const generateMaze = require('./');
const constants = require('../constants');
const createStack = require('./stack');
const cellLocators = require('../cell/locators');
const { createCell } = require('../cell/factory');

// more of an integration test suite between a few pieces
describe('the generateMaze function', function () {
    let originalConstants;

    before(function () {
        // TODO: pass constants to function to remove this crap
        originalConstants = Object.assign({}, constants);
    });

    afterEach(function () {
        for (let prop in constants) {
            originalConstants[prop] = constants[prop];
        }

        if (cellLocators.getUnvisitedNeighbour.restore) {
            cellLocators.getUnvisitedNeighbour.restore();
        }
    });

    it('should recursively visit all neighbours', function () {
        const cells = [
            [
                createCell(0, 0),
                createCell(0, 1),
                createCell(0, 2),
            ],

            [
                createCell(1, 0),
                createCell(1, 1),
                createCell(1, 2),
            ],

            [
                createCell(2, 0),
                createCell(2, 1),
                createCell(2, 2),
            ],
        ];

        constants.GRID_SIZE = 3;
        constants.CELL_COUNT = 9;

        const maze = generateMaze(cells, cells[1][1]);

        const hasVisitedAllCells = maze.every(
            cells => cells.every(cell => cell.isVisited)
        );

        expect(hasVisitedAllCells).to.be.true;
    });

    it('should pop a cell from the stack if the walker has hit a dead end', function () {
        const cells = [
            [
                createCell(0, 0),
                createCell(0, 1),
            ],

            [
                createCell(1, 0),
                createCell(1, 1),
            ],
        ];

        constants.GRID_SIZE = 2;
        constants.CELL_COUNT = 4;

        sinon.stub(cellLocators, 'getUnvisitedNeighbour')
            .onFirstCall()
            .returns(cells[0][0])
            .onSecondCall()
            .returns(cells[1][0])
            .onThirdCall()
            .returns(cells[1][1])
            .onCall(3)
            .returns(null);

        const stack = createStack();
        const mockStack = sinon.mock(stack);

        mockStack.expects('push')
            .thrice();

        mockStack.expects('pop')
            .once();

        generateMaze(cells, cells[0][1], stack);

        mockStack.verify();
    });

    it('should decorate any marked cells', function () {
        const cells = [
            [
                createCell(0, 0),
                createCell(0, 1),
            ],

            [
                createCell(1, 0),
                createCell(1, 1),
            ],
        ];

        constants.GRID_SIZE = 2;
        constants.CELL_COUNT = 4;

        sinon.stub(cellLocators, 'getUnvisitedNeighbour')
            .onFirstCall()
            .returns(cells[0][0])
            .onSecondCall()
            .returns(cells[1][0])
            .onThirdCall()
            .returns(cells[1][1])
            .onCall(3)
            .returns(cells[0][1]);

        const mockFirstCell = sinon.mock(cells[0][1]);
        const mockStartCell = sinon.mock(cells[0][0]);

        mockFirstCell.expects('visit')
            .twice();

        mockStartCell.expects('markAsStart')
            .once();

        generateMaze(cells, cells[0][1]);

        mockFirstCell.verify();
        mockStartCell.verify();
    });
});

