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
            return moment(date).format(format);
        }
    });

angular.module('app')
    .filter('dateFormat', function () {
        return function (date, format) {
            if(" ".indexOf(date)){
                return moment(date).format(format);
            }else{
                return moment(date,'YYYYMMDDHHmmss').format(format);
            }
        }
    });