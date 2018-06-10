import '../styles/grid.css';

export class MetaGrid {
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

        this.getMetaIndex = childGrid => {
            if (this.isLeaf())
                return parent.getMetaIndex(this);

            const childIndex = getChildIndex(childGrid);

            if (this.isRoot())
                return [childIndex];

            return parent.getMetaIndex(this).concat(childIndex);
        };

        this.getChild = (row, col) => {
            if (!this.isLeaf())
                return _cells[row][col];
        };

        this.getElement = () => _element;

        this.getSize = () => size;

        this.getParent = () => parent;

        this.isLeaf = () => {
            return depth === 0;
        };

        this.isRoot = () => {
            return parent == null;
        };

        this.setMark = mark => {
            _mark = mark;
            updateElement();
        };

        this.getMark = () => {
            return _mark;
        };

        this.isMarked = () => {
            return _mark != null;
        };

        this.enable = enabled => {
            _enabled = enabled;
            updateElement();
        };

        this.isEnabled = () => _enabled;

        if (!this.isLeaf())
            makeChildren();

        updateElement();
    }
}
