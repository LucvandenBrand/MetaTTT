import MetaGrid from './metaGrid';
import $ from 'jquery';
import Control from "./control";

import '../styles/main.css';

const NODE_CONTAINER = '#grid-container',
      NODE_SLIDER = '#meta-level',
      NODE_LEVEL = '#level-value',
      NODE_NEW_GAME = '#new-game';

let metaSlider = $(NODE_SLIDER);
let metaLevelNode = $(NODE_LEVEL);
metaLevelNode.text(metaSlider.val() - 1);
metaSlider.on('input', function() {
    metaLevelNode.text(metaSlider.val() - 1);
});

$(NODE_NEW_GAME).click(function () {
    let metaGrid = new MetaGrid(metaSlider.val());
    new Control(metaGrid);1
    $(NODE_CONTAINER).empty();
    $(NODE_CONTAINER).append(metaGrid.getContainer());
});