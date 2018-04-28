import generateMetaGrid from './generateMetaGrid';
import $ from 'jquery';

const META_LEVEL = 2,
      NODE_CONTAINER = 'body';

$(NODE_CONTAINER).append(generateMetaGrid(META_LEVEL));
