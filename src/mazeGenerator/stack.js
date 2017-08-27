'use strict';

function createStack() {
    const items = [];
    const push = item => items.push(item);
    const pop = () => items.pop();

    return {
        push,
        pop,
    };
}

module.exports = createStack;
