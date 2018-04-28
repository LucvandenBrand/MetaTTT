import generateMetaGrid from './generateMetaGrid';
import {CLASS_TABLE,
        CLASS_CELL,
        CLASS_DISABLED,
        ATTR_LOCATION} from './generateMetaGrid';
import $ from 'jquery';

const META_LEVEL = 3,
      NODE_CONTAINER = 'body';

$(NODE_CONTAINER).append(generateMetaGrid(META_LEVEL));

$('.' + CLASS_CELL).click(function (e) {
    $('.' + CLASS_DISABLED).removeClass(CLASS_DISABLED);

    let location = $(this).attr(ATTR_LOCATION);
    let table = $(this).parents('.' + CLASS_TABLE)[1];
    $(table).find('.' + CLASS_TABLE).each(function () {
        if ($(this).attr(ATTR_LOCATION) !== location)
            $(this).addClass(CLASS_DISABLED);
    });
});