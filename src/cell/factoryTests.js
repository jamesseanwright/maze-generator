'use strict';

const sinon = require('sinon');
const wallGenerator = require('../wallGenerator');
const { createCell, START, FINISH } = require('./factory');

describe('the cell factory', function () {
    let cell;

    beforeEach(function () {
        cell = createCell(0, 0);
    });

    afterEach(function () {
        if (wallGenerator.toggleWallBits.restore) {
            wallGenerator.toggleWallBits.restore();
        }
    });

    describe('the markAsStart method', function () {
        it('should mark the cell as visited and set its type to START', function () {
            cell.markAsStart();
            expect(cell.isVisited).be.true;
            expect(cell.type).be.equal(START);
        });
    });

    describe('the markAsEnd method', function () {
        it('should set the cell`s type to FINISH', function () {
            cell.markAsFinish();
            expect(cell.type).be.equal(FINISH);
        });
    });

    describe('the visit method', function () {
        it('should mark the cell as visited and toggle the bits of the cell`s and neighbour`s walls', function () {
            const neighbour = { walls: undefined };

            sinon.stub(wallGenerator, 'toggleWallBits')
                .onFirstCall()
                .returns('cell wall bits')
                .onSecondCall()
                .returns('neighbour wall bits');

            cell.visit(neighbour);

            expect(cell.isVisited).to.be.true;
            expect(cell.walls).to.equal('cell wall bits');
            expect(neighbour.walls).to.equal('neighbour wall bits');
        });
    });
});
