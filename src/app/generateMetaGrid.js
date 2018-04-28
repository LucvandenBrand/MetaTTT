import $ from 'jquery';

import '../styles/table.css';

const GRID_SIZE = 3,
      NODE_DIV = '<div>',
      CLASS_TABLE = 'table',
      CLASS_ROW = 'row',
      CLASS_CELL = 'cell';

function onCellClick(e) {
    console.log("Clicked!");
}

/**
 * Recursively generates a grid in the container.
 * @param container The container to add the grid to.
 * @param depth The number of recursions.
 */
function generateGrid(container, depth) {
    if (depth < 1) {
        $(container).addClass(CLASS_CELL);
        $(container).click(onCellClick);
    } else {
        $(container).addClass(CLASS_TABLE);
        for (let x = 0; x < GRID_SIZE; x++) {
            let row = $(NODE_DIV);
            $(row).addClass(CLASS_ROW);
            for (let y = 0; y < GRID_SIZE; y++) {
                let cell = $(NODE_DIV);
                generateGrid(cell, depth - 1);
                row.append(cell);
            }
            $(container).append(row);
        }
    }
}

/**
 * Generates a grid with multiple grids inside itself.
 * @param levels The number of meta-grids.
 * @returns {jQuery|HTMLElement} The generated grid.
 */
export default function generateMetaGrid(levels) {
    let container = $(NODE_DIV);
    generateGrid(container, levels);
    return container;
}