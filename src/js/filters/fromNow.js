'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function () {
        return function (date) {
            return moment(date).fromNow();
        }
    });

angular.module('app')
    .filter('kuDate', function () {
        return function (date, format) {
            var d = new Date(date);
            return moment(d).format(format);
        }
    });