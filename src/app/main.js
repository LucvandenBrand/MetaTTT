import generateMetaGrid from './generateMetaGrid';
import {CLASS_TABLE,
        CLASS_CELL,
        CLASS_DISABLED,
        ATTR_LOCATION} from './generateMetaGrid';
import $ from 'jquery';

const META_LEVEL = 2,
      NODE_CONTAINER = 'body';

let mainTable = generateMetaGrid(META_LEVEL);
$(NODE_CONTAINER).append(mainTable);

function getClickStack(cell) {
    let locations = [$(cell).attr(ATTR_LOCATION)];
    $(cell).parents('.' + CLASS_TABLE).each(function () {
        let location = $(this).attr(ATTR_LOCATION);
        if (location != null)
            locations.push($(this).attr(ATTR_LOCATION));
    });
    return locations;
}

function disableWithStack(currentTable, locations) {
    while (locations.length > 1) {
        let location = locations.shift();
        currentTable.children().closest('.row').children().each(function () {
            if ($(this).attr(ATTR_LOCATION) === location)
                currentTable = $(this);
            else
                $(this).addClass(CLASS_DISABLED);
        });
    }
}

function isDisabled(cell) {
    $(cell).parents('.' + CLASS_TABLE).hasClass(CLASS_DISABLED)
}

$('.' + CLASS_CELL).click(function () {
    if (!isDisabled(this)) {
        $('.' + CLASS_DISABLED).removeClass(CLASS_DISABLED);
        disableWithStack(mainTable, getClickStack(this));
    }
});