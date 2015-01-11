app.controller('TvShowsTopCtrl', ['$scope','$http', function ($scope, $http) {


    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker',
        datepicker: false,
        'show-weeks': false
    };
    $scope.format = 'dd-MMMM-yyyy';
    $scope.dt = moment().subtract(1, 'days').format('YYYY-MM-DD');
    $scope.reportType = 'whj';
    $scope.reportTypeDict = {
        'whj':'卫视黄金时段电视剧排行',
        'wwj':'卫视晚间时段电视剧排行',
        'wwz':'卫视晚间时段综艺排行',
        'wwjm':'卫视晚间时段节目排行'

    };

    $http.get('/fapi/tvshows_top1.json').
        success(function(data, status, headers, config) {
            $scope.items = data.results;
        });

}]);