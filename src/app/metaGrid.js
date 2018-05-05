import $ from 'jquery';

import '../styles/table.css';

const GRID_SIZE = 3,
      NODE_DIV = '<div>',
      CLASS_TABLE = 'table',
      CLASS_ROW = 'row',
      CLASS_CELL = 'cell',
      CLASS_DISABLED = 'disabled',
      CLASS_CLICKED   = 'played',
      ATTR_LOCATION = 'location';

/**
 * Recursively generates a grid in the container.
 * @param container The container to add the grid to.
 * @param depth The number of recursions.
 */
function generateTable(container, depth) {
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
                generateTable(cell, depth - 1);
                row.append(cell);
            }
            $(container).append(row);
        }
    }
}

function getClickStack(cell) {
    let locations = [$(cell).attr(ATTR_LOCATION)];
    $(cell).parents('.' + CLASS_TABLE).each(function () {
        let location = $(this).attr(ATTR_LOCATION);
        if (location != null)
            locations.push($(this).attr(ATTR_LOCATION));
    });
    return locations;
}

function enableTable(table) {
    table.find('.' + CLASS_DISABLED).removeClass(CLASS_DISABLED);
}

function disableWithStack(currentTable, locations) {
    let root = currentTable;
    enableTable(root);

    while (locations.length > 1) {
        let location = locations.shift();
        currentTable.children().closest('.' + CLASS_ROW).children().each(function () {
            if ($(this).attr(ATTR_LOCATION) === location)
                currentTable = $(this);
            else
                $(this).addClass(CLASS_DISABLED);
        });
    }

    if (isTableFull(currentTable)) {
        let freeCell = $(root).find('.' + CLASS_CELL).not('.' + CLASS_CLICKED)[0];
        disableWithStack(root, getClickStack(freeCell));
    }
}

function isTableFull(table) {
    let numPlayed = $(table).children().children('.' + CLASS_CLICKED).length;
    return numPlayed === GRID_SIZE * GRID_SIZE;
}


function isCellDisabled(cell) {
    let containingTable = $(cell).parents('.' + CLASS_TABLE);
    return containingTable.hasClass(CLASS_DISABLED) || $(cell).hasClass(CLASS_CLICKED);
}

/**
 * Generates a grid with multiple grids inside itself.
 */
export default class MetaGrid {
  constructor(metaLevel) {
      let _rootTable = $(NODE_DIV);
      generateTable(_rootTable, metaLevel);

      this.getContainer = function() {
          return _rootTable;
      };

      this.onCellClick = function(onClick) {
          _rootTable.find('.' + CLASS_CELL).click(function () {
              if (!isCellDisabled(this)) {
                  onClick(this);
                  disableWithStack(_rootTable, getClickStack(this));
                  $(this).addClass(CLASS_CLICKED);
              }
          });
      };
  }
};