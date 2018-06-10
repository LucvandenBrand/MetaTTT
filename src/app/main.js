import { MetaGrid } from './metaGrid';
import { Control } from './control';

import '../styles/main.css';

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
    const metaGrid = new MetaGrid(GRID_SIZE, metaSlider.value);
    gridContainer.appendChild(metaGrid.getElement());
    new Control(metaGrid);
};