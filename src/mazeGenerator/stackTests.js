'use strict';

const createStack = require('./stack');

describe('the stack', function () {
    it('should maintain LIFO ordering via the push and pop methods', function () {
        const stack = createStack();
        const items = [1, 4, 2, 7];

        items.forEach(stack.push);

        items.reverse().forEach(
            expectedItem => expect(stack.pop()).to.equal(expectedItem)
        );
    });
});
