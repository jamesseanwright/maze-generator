'use strict';

const generateMaze = require('./mazeGenerator');
const render = require('./renderer');

render(generateMaze(), document.body.querySelector('#maze'));
