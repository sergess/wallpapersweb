'use strict';
wallpapersApp.filter('startFrom', function() {
    return function(input, start) {
        if (!input) { return; }
        start = +start;
        return input.slice(start);
    }
});
