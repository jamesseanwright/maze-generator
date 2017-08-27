'use strict';

function createStack() {
    let items = [];
    const push = item => items = items.concat(item);

    const pop = () => {
        const [ tail ] = items;
        items = items.slice(1);
        return tail;
    };

    return {
        push,
        pop,
    };
}

module.exports = createStack;
