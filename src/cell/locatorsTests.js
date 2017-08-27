'use strict';

const sinon = require('sinon');
const constants = require('../constants');
const { getRandomCell } = require('./locators');

describe('the cell locators', function () {
    describe('the getRandomCell function', function () {
        let originalGridSize;

        before(function () {
            originalGridSize = constants;
        });

        after(function () {
            constants.GRID_SIZE = originalGridSize;
        });

        afterEach(function () {
            if (Math.random.restore) {
                Math.random.restore();
            }
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
});
