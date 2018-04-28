import $ from 'jquery';

import '../styles/table.css';

const GRID_SIZE = 3,
      NODE_DIV = '<div>';

export const CLASS_TABLE = 'table',
             CLASS_ROW = 'row',
             CLASS_CELL = 'cell',
             CLASS_DISABLED = 'disabled',
             ATTR_LOCATION = 'location';

/**
 * Recursively generates a grid in the container.
 * @param container The container to add the grid to.
 * @param depth The number of recursions.
 */
function generateGrid(container, depth) {
    if (depth < 1) {
        $(container).addClass(CLASS_CELL);
    } else {
        $(container).addClass(CLASS_TABLE);
        for (let y = 0; y < GRID_SIZE; y++) {
            let row = $(NODE_DIV);
            $(row).addClass(CLASS_ROW);
            for (let x = 0; x < GRID_SIZE; x++) {
                let cell = $(NODE_DIV);
                $(cell).attr(ATTR_LOCATION, y * GRID_SIZE + x);
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