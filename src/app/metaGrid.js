import '../styles/grid.css';

export class MetaGrid {
    constructor(size, depth, onLeafClick, parent) {
        const ATTR_MARK = 'mark',
              ELEM_GRID = 'div';

        const _cells = [];
        const _element = document.createElement(ELEM_GRID);
        let _mark;

        const updateElement = () => {
            _element.setAttribute(ATTR_MARK, _mark);
        };

        const makeChildren = () => {
            _cells.length = 0;
            _element.innerHTML = '';
            for (let row = 0; row < size; row++) {
                _cells[row] = [];
                for (let col = 0; col < size; col++) {
                    const cell = new MetaGrid(size, depth - 1, onLeafClick, this);
                    _cells[row].push(cell);
                    _element.appendChild(cell.getElement());
                }
            }
        };

        const checkRows = () => {
            for (let row = 0; row < size; row++) {
                const firstCell = _cells[row][0].getMark();
                if (firstCell == null)
                    continue;

                let col;
                for (col = 0; col < size; col++) {
                    if (_cells[row][col].getMark() !== firstCell)
                        break;
                }

                if (col === size)
                    return true;
            }

            return false;
        };

        const checkColumns = () => {
            for (let col = 0; col < size; col++) {
                const firstCell = _cells[0][col].getMark();
                if (firstCell == null)
                    continue;

                let row;
                for (row = 0; row < size; row++) {
                    if (_cells[row][col].getMark() !== firstCell)
                        break;
                }

                if (row === size)
                    return true;
            }

            return false;
        };

        const checkDiagonals = () => {
            const firstLeftCell = _cells[0][0].getMark();
            const firstRightCell = _cells[0][size-1].getMark();

            let leftDiagonal = true, rightDiagonal = true;
            for (let index = 0; index < size; index++) {
                if (_cells[index][index].getMark() !== firstLeftCell) {
                    leftDiagonal = false;
                }

                let mirrorIndex = size - index - 1;
                if (_cells[index][mirrorIndex].getMark() !== firstRightCell) {
                    rightDiagonal = false;
                }
            }
            return firstLeftCell  != null && leftDiagonal ||
                   firstRightCell != null && rightDiagonal;
        };

        this.checkWin = (checkMark) => {
            if (_mark != null)
                return;

            if (checkRows() || checkColumns() || checkDiagonals())
                this.setMark(checkMark);
        };

        this.setMark = mark => {
            _mark = mark;
            if (parent != null)
                parent.checkWin(mark);
            updateElement();
        };

        this.getMark = () => {
            return _mark;
        };

        this.getElement = () => _element;

        if (depth > 0)
            makeChildren();
        else
            _element.onclick = () => onLeafClick(this);
    }
}
