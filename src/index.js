'use strict';

const generateMaze = require('./mazeGenerator');
const render = require('./renderer');

const canvas = document.body.querySelector('#maze');
const context = canvas.getContext('2d');
const cells = generateMaze();

render(cells, context);
