export class Control {
    constructor() {
        let _previousPlayer = 0;

        const currentPlayer = () => {
            return _previousPlayer ^= 1;
        };

        this.handleClick = gridLeaf => {
            if (gridLeaf.getMark() == null)
                gridLeaf.setMark(currentPlayer());
        };
    }
}