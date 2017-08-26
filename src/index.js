'use strict';

const generateMaze = require('./mazeGenerator');

console.log('**** here');

// const canvas = document.body.querySelector('#maze');
// const context = canvas.getContext('2d');

const cells = generateMaze();
console.log(cells);
