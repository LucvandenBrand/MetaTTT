import $ from 'jquery';

const ATTR_PLAYER_MARK = 'player-mark';

export class Control {
    constructor(metaGrid) {
        let _currentPlayer = 0;

        function nextPlayer() {
            _currentPlayer = 1 - _currentPlayer;
        }

        metaGrid.onCellClick(function (cell) {
            $(cell).attr(ATTR_PLAYER_MARK, _currentPlayer);
            nextPlayer();
        });
    }
}