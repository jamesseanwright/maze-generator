'use strict';

const {
    createWalls,
    toggleWallBits,
    isHorizontalWall,
    isBottomWall,
    isRightWall,
} = require('./');

describe('wall generation', function () {
    describe('the isHorizontalWall function', function () {
        it('should return true for horizontal walls and false for vertical ones', function () {
            const expectedResults = [
                true,
                false,
                true,
                false,
            ];

            expectedResults.forEach(
                (expectedResult, i) => expect(isHorizontalWall(i)).to.equal(expectedResult)
            );
        });
    });

    describe('the isBottomWall function', function () {
        it('should return true for an index of 2', function () {
            expect(isBottomWall(2)).to.be.true;
        });

        it('should return false for any other index', function () {
            expect(isBottomWall(0)).to.be.false;
        });
    });

    describe('the isRightWall function', function () {
        it('should return true for an index of 1', function () {
            expect(isRightWall(1)).to.be.true;
        });

        it('should return false for any other index', function () {
            expect(isRightWall(0)).to.be.false;
        });
    });

    describe('the toggleWallBits function', function () {
        it('should invert the top bit if the neighbour`s row is lower than the cell`s row', function () {
            const cell = {
                column: 1,
                row: 1,
                walls: createWalls(),
            };

            const neighbour = {
                column: 1,
                row: 0,
            };

            const wallBits = toggleWallBits(cell, neighbour);
            expect(wallBits).to.deep.equal([0, 1, 1, 1]);
        });

        it('should invert the right bit if the neighbour`s column is higher than the cell`s column', function () {
            const cell = {
                column: 1,
                row: 0,
                walls: createWalls(),
            };

            const neighbour = {
                column: 2,
                row: 0,
            };

            const wallBits = toggleWallBits(cell, neighbour);
            expect(wallBits).to.deep.equal([1, 0, 1, 1]);
        });

        it('should invert the bottom bit if the neighbour`s row is higher than the cell`s row', function () {
            const cell = {
                column: 0,
                row: 1,
                walls: createWalls(),
            };

            const neighbour = {
                column: 0,
                row: 2,
            };

            const wallBits = toggleWallBits(cell, neighbour);
            expect(wallBits).to.deep.equal([1, 1, 0, 1]);
        });

        it('should invert the left bit if the neighbour`s column is lower than the cell`s column', function () {
            const cell = {
                column: 1,
                row: 2,
                walls: createWalls(),
            };

            const neighbour = {
                column: 0,
                row: 2,
            };

            const wallBits = toggleWallBits(cell, neighbour);
            expect(wallBits).to.deep.equal([1, 1, 1, 0]);
        });
    });
});
