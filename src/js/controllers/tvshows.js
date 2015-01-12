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
    $scope.reportTypes = {
        'whj':'卫视黄金时段电视剧排行',
        'wwj':'卫视晚间时段电视剧排行',
        'wwzy': '卫视晚间时段综艺排行',
        'wwjm':'卫视晚间时段节目排行'

    };

    $http.get('/fapi/tvshows_top1.json').
        success(function(data, status, headers, config) {
            $scope.items = data.results;
        });

}]);

app.controller('TvshowsCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.option = {
            color: ['#23b7e5', '#27c24c', '#fad733', '#7266ba',
                '#f05050', '#e8eff0', '#3a3f51', '#1c2b36', '#40e0d0',
                '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
            tooltip: {
                show: true
            },

            toolbox: {
                show: true,
                feature: {
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    saveAsImage: {show: true}
                }
            },
            grid: {
                x: 50, x2: 10, y: 30, y2: 20
            },

            legend: {
                data: ['湖南卫视', '江苏卫视'], x: 'left'
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
                        '2014-11-26'
                        ,
                        '2014-11-27'
                        ,
                        '2014-11-28'
                        ,
                        '2014-11-29'
                        ,
                        '2014-11-30'
                        ,
                        '2014-12-01'
                        ,
                        '2014-12-02'
                        ,
                        '2014-12-03'
                        ,
                        '2014-12-04'
                        ,
                        '2014-12-05'
                        ,
                        '2014-12-06'
                        ,
                        '2014-12-07'
                        ,
                        '2014-12-08'
                        ,
                        '2014-12-09'
                        ,
                        '2014-12-10'
                        ,
                        '2014-12-11'
                        ,
                        '2014-12-12'
                        ,
                        '2014-12-13'
                        ,
                        '2014-12-14'
                        ,
                        '2014-12-15'
                        ,
                        '2014-12-16'
                        ,
                        '2014-12-17'
                        ,
                        '2014-12-18'
                        ,
                        '2014-12-19'
                        ,
                        '2014-12-20'
                        ,
                        '2014-12-21'
                        ,
                        '2014-12-22'
                        ,
                        '2014-12-23'
                        ,
                        '2014-12-24'
                        ,
                        '2014-12-25'

                    ]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    precision: 4,
                    axisLabel: {formatter: '{value} %'}
                }
            ],
            series: [

                {
                    name: '江苏卫视',
                    type: 'bar',
                    data: [

                        0.1248, 0.0841, 0.3377, 0.165, 0.0412, 0.0242, 0.0386, 0.1411, 0.0804,
                        0.3614
                        ,
                        0.1571
                        ,
                        0.0251
                        ,
                        0.0084
                        ,
                        0.0358
                        ,
                        0.1429
                        ,
                        0.0787
                        ,
                        0.3517
                        ,
                        0.1573
                        ,
                        0.0218
                        ,
                        0.0379
                        ,
                        0.0293
                        ,
                        0.0417
                        ,
                        0.1076
                        ,
                        0.2981
                        ,
                        0.1665
                        ,
                        0.0434
                        ,
                        0.0258
                        ,
                        0.0332
                        , 0.1463, 0.0362

                    ]
                },
                {
                    name: '湖南卫视',
                    type: 'bar',
                    data: [
                        0.1463, 0.0362,
                        0.1248, 0.0841, 0.3377, 0.165, 0.0412, 0.0242, 0.0386, 0.1411, 0.0804,
                        0.3614
                        ,

                        0.0787
                        ,
                        0.3517
                        ,
                        0.1573
                        ,
                        0.0218
                        ,
                        0.0379,
                        0.1571
                        ,
                        0.0251
                        ,
                        0.0084
                        ,
                        0.0358
                        ,
                        0.1429

                        ,
                        0.0293
                        ,
                        0.0417
                        ,
                        0.1076
                        ,
                        0.2981
                        ,
                        0.1665
                        ,
                        0.0434
                        ,
                        0.0258
                        ,
                        0.0332


                    ]
                }

            ]
        };

        $scope.getItems = function(){
            $http.get('/fapi/tvshows.json').success(function (data) {
                    $scope.items = data.results;
                }
            )
        };
        $scope.getItems();

    }]);