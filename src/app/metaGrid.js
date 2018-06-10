import '../styles/grid.css';

/**
 * Defines a grid that can contain other grids.
 */
export class MetaGrid {
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
