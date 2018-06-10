/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/control.js":
/*!****************************!*\
  !*** ./src/app/control.js ***!
  \****************************/
/*! exports provided: Control */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Control", function() { return Control; });
/**
 * Handles game-play logic and player control.
 */
class Control {
    /**
     * Construct a control object and attach it to the root grid.
     * @param {MetaGrid} rootGrid The root of a MetaGrid.
     */
    constructor(rootGrid) {
        let _previousPlayer = 0;

        const currentPlayer = () => {
            return _previousPlayer ^= 1;
        };

        const applyToLeafs = (grid, method) => {
            if (grid.isLeaf()) {
                method(grid);
                return;
            }

            for (let row = 0; row < grid.getSize(); row++) {
                for (let col = 0; col < grid.getSize(); col++) {
                    applyToLeafs(grid.getChild(row, col), method);
                }
            }
        };

        const checkRows = grid => {
            for (let row = 0; row < grid.getSize(); row++) {
                const firstCell = grid.getChild(row, 0).getMark();
                if (firstCell == null)
                    continue;

                let col;
                for (col = 0; col < grid.getSize(); col++) {
                    if (grid.getChild(row, col).getMark() !== firstCell)
                        break;
                }

                if (col === grid.getSize())
                    return true;
            }

            return false;
        };

        const checkColumns = grid => {
            for (let col = 0; col < grid.getSize(); col++) {
                const firstCell = grid.getChild(0, col).getMark();
                if (firstCell == null)
                    continue;

                let row;
                for (row = 0; row < grid.getSize(); row++) {
                    if (grid.getChild(row, col).getMark() !== firstCell)
                        break;
                }

                if (row === grid.getSize())
                    return true;
            }

            return false;
        };

        const checkDiagonals = grid => {
            const firstLeftCell = grid.getChild(0, 0).getMark();
            const firstRightCell = grid.getChild(0, grid.getSize()-1).getMark();

            let leftDiagonal = true, rightDiagonal = true;
            for (let index = 0; index < grid.getSize(); index++) {
                if (grid.getChild(index, index).getMark() !== firstLeftCell) {
                    leftDiagonal = false;
                }

                let mirrorIndex = grid.getSize() - index - 1;
                if (grid.getChild(index, mirrorIndex).getMark() !== firstRightCell) {
                    rightDiagonal = false;
                }
            }
            return firstLeftCell  != null && leftDiagonal ||
                firstRightCell != null && rightDiagonal;
        };

        const checkWin = (grid, checkMark) => {
            if (grid.isMarked())
                return;

            if (checkRows(grid) || checkColumns(grid) || checkDiagonals(grid)) {
                grid.setMark(checkMark);

                if (!grid.isRoot())
                    checkWin(grid.getParent(), checkMark);
            }
        };

        const countMarked = grid => {
            let numMarked = 0;
            for (let row = 0; row < grid.getSize(); row++)
                for (let col = 0; col < grid.getSize(); col++)
                    if (grid.getChild(row, col).isMarked())
                        numMarked++;
            return numMarked;
        };

        const isFilled = grid => {
            const numChildren = grid.getSize() * grid.getSize();
            return countMarked(grid) === numChildren;
        };

        const findEmpty = grid => {
            for (let row = 0; row < grid.getSize(); row++) {
                for (let col = 0; col < grid.getSize(); col++) {
                    const child = grid.getChild(row, col);
                    if (!isFilled(child)) {
                        return child;
                    }
                }
            }
        };

        const enableReverse = (grid, metaIndex) => {
            if (metaIndex.length === 1) {
                if (isFilled(grid) && !grid.isRoot())
                    grid = findEmpty(grid.getParent());

                if (grid == null)
                    return;

                applyToLeafs(grid, (leaf) => {
                    leaf.enable(true);
                });

                return;
            }

            const childIndex = metaIndex.pop();
            let child = grid.getChild(childIndex.row, childIndex.col);
            enableReverse(child, metaIndex);
        };

        const handleClick = gridLeaf => {
            const player = currentPlayer();
            if (gridLeaf.isEnabled() && !gridLeaf.isMarked()) {
                gridLeaf.setMark(player);
                checkWin(gridLeaf.getParent(), player);

                applyToLeafs(rootGrid, (leaf) => {
                    leaf.enable(false);
                });

                enableReverse(rootGrid, gridLeaf.getMetaIndex());
            }
        };

        applyToLeafs(rootGrid, (leaf) => {
            leaf.getElement().onclick = () => {handleClick(leaf)};
            leaf.enable(true);
        });
    }
}

/***/ }),

/***/ "./src/app/main.js":
/*!*************************!*\
  !*** ./src/app/main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metaGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metaGrid */ "./src/app/metaGrid.js");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control */ "./src/app/control.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_main_css__WEBPACK_IMPORTED_MODULE_2__);





const ID_CONTAINER = 'grid-container',
      ID_META_SLIDER = 'meta-level',
      ID_META_DISPLAY = 'level-value',
      ID_NEW_GAME_BUTTON = 'new-game',
      GRID_SIZE = 3;

const metaSlider = document.getElementById(ID_META_SLIDER);
const metaDisplay = document.getElementById(ID_META_DISPLAY);

const setMetaDisplay = () => {
    metaDisplay.innerText = String(metaSlider.value - 1)
};

setMetaDisplay();
metaSlider.oninput = setMetaDisplay;

document.getElementById(ID_NEW_GAME_BUTTON).onclick = () => {
    const gridContainer = document.getElementById(ID_CONTAINER);
    gridContainer.innerHTML = '';
    const metaGrid = new _metaGrid__WEBPACK_IMPORTED_MODULE_0__["MetaGrid"](GRID_SIZE, metaSlider.value);
    gridContainer.appendChild(metaGrid.getElement());
    new _control__WEBPACK_IMPORTED_MODULE_1__["Control"](metaGrid);
};

/***/ }),

/***/ "./src/app/metaGrid.js":
/*!*****************************!*\
  !*** ./src/app/metaGrid.js ***!
  \*****************************/
/*! exports provided: MetaGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaGrid", function() { return MetaGrid; });
/* harmony import */ var _styles_grid_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/grid.css */ "./src/styles/grid.css");
/* harmony import */ var _styles_grid_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_grid_css__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Defines a grid that can contain other grids.
 */
class MetaGrid {
    /**
     * Construct a meta grid.
     * @param {Number} size The size of the square grid.
     * @param {Number} depth The number of nested grids inside this grid.
     * @param {MetaGrid | undefined} parent The parent of this grid, undefined means this is the root.
     */
    constructor(size, depth, parent) {
        const ATTR_MARK = 'mark',
              ELEM_GRID = 'div',
              CLASS_ENABLED = 'enabled';

        const _cells = [];
        const _element = document.createElement(ELEM_GRID);
        let _mark;
        let _enabled = false;

        const updateElement = () => {
            if (this.isMarked())
                _element.setAttribute(ATTR_MARK, _mark);
            if (this.isEnabled())
                _element.classList.add(CLASS_ENABLED);
            else
                _element.classList.remove(CLASS_ENABLED);
        };

        const makeChildren = () => {
            _cells.length = 0;
            _element.innerHTML = '';
            for (let row = 0; row < size; row++) {
                _cells[row] = [];
                for (let col = 0; col < size; col++) {
                    const cell = new MetaGrid(size, depth - 1, this);
                    _cells[row].push(cell);
                    _element.appendChild(cell.getElement());
                }
            }
        };

        const getChildIndex = childGrid => {
            let childRow = -1;
            let childCol = -1;
            for (let row = 0; row < size; row++) {
                childCol = _cells[row].indexOf(childGrid);
                if (childCol >= 0) {
                    childRow = row;
                    break;
                }
            }

            return {row: childRow, col: childCol};
        };

        /**
         * Return the index of the grid in its nested state.
         * @param {MetaGrid} childGrid
         * @return {Object[]} List of objects containing (row, col) indices.
         */
        this.getMetaIndex = childGrid => {
            if (this.isLeaf())
                return parent.getMetaIndex(this);

            const childIndex = getChildIndex(childGrid);

            if (this.isRoot())
                return [childIndex];

            return parent.getMetaIndex(this).concat(childIndex);
        };

        /**
         * Return the nested child at (row, col).
         * @param {Number} row The row that contains the child.
         * @param {Number} col The column that contains the child.
         * @return {MetaGrid | undefined} Meta grid if it exists, otherwise undefined.
         */
        this.getChild = (row, col) => {
            if (!this.isLeaf())
                return _cells[row][col];
        };

        /**
         * Return the HTMLElement visualizing the meta grid.
         * @return {HTMLDivElement}
         */
        this.getElement = () => _element;

        /**
         * Return the size of this meta grid.
         * @return {Number}
         */
        this.getSize = () => size;

        /**
         * Return the parent of this meta grid.
         * @return {MetaGrid}
         */
        this.getParent = () => parent;

        /**
         * Return true if this meta grid contains no children.
         * @return {boolean}
         */
        this.isLeaf = () => {
            return depth === 0;
        };

        /**
         * Return true if this meta grid contains no parent.
         * @return {boolean}
         */
        this.isRoot = () => {
            return parent == null;
        };

        /**
         * Assign a mark to this meta grid.
         * @param {Number} mark Mark to assign.
         */
        this.setMark = mark => {
            _mark = mark;
            updateElement();
        };

        /**
         * Return the mark assigned to this meta grid.
         * @return {Number} The mark of this grid.
         */
        this.getMark = () => {
            return _mark;
        };

        /**
         * Return true if this meta grid contains a mark.
         * @return {boolean} True if this meta grid is marked.
         */
        this.isMarked = () => {
            return _mark != null;
        };

        /**
         * Enable or disable this meta grid for interaction.
         * @param {boolean} enabled True if this meta grid can be interacted with.
         */
        this.enable = enabled => {
            _enabled = enabled;
            updateElement();
        };

        /**
         * Return true if this meta grid can be interacted with.
         * @return {boolean} True if this meta grid can be interacted with.
         */
        this.isEnabled = () => _enabled;

        if (!this.isLeaf())
            makeChildren();

        updateElement();
    }
}


/***/ }),

/***/ "./src/styles/grid.css":
/*!*****************************!*\
  !*** ./src/styles/grid.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=metaTTT.js.map