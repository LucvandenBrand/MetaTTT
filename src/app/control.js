/**
 * Handles game-play logic and player control.
 */
export class Control {
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