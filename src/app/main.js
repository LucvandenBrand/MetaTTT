import MetaGrid from './metaGrid';
import $ from 'jquery';
import Control from "./control";

const META_LEVEL = 2,
      NODE_CONTAINER = 'body';

let metaGrid = new MetaGrid(META_LEVEL);
new Control(metaGrid);

$(NODE_CONTAINER).append(metaGrid.getContainer());