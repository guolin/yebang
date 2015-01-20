
app.controller('IOCtrl', ['$scope', '$http','$stateParams','$timeout','kuChannels',
    function ($scope, $http, $stateParams, $timeout, kuChannels) {

        $scope.start = moment().subtract(30,'minutes');
        $scope.end = moment();

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
            'show-weeks': false,
            'min-date': moment("2014-10-01"),
            'max-date': moment().subtract(1, 'days')
        };

        $scope.dt = moment().subtract(1, 'days').format('YYYY-MM-DD')

        var getOption = function (categories, rating) {

            var option = {
                color: ['#23b7e5', '#27c24c'],
                tooltip: {
                    trigger: 'axis'
                },
                animation:false,
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100
                },
                grid: {
                    borderColor: '#ccc',
                    borderWidth: 1,
                    x: '2', y: '10', y2: '60', x2: '2'
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: categories,
                        axisTick: {show: false},
                        splitLine: {lineStyle: {color: ['#ccc'], width: 1, type: 'solid'}},
                        axisLabel: {textStyle: {color: '#ccc'}}
                    }
                ],
                yAxis: [
                    {
                        splitNumber: 2,
                        scale: true,
                        position: 'left',
                        type: 'value',
                        axisLabel: {
                            margin: -40, textStyle: {color: '#bbb'},
                            formatter: '{value}%'
                        },
                        axisTick: {show: false}, axisLine: {show: false}

                    }
                ],
                series: []
            };
            var ratingData = {
                name: '关注度',
                type: 'line',
                smooth: true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: rating
            };
            option.series.push(ratingData);
            return option;
        };

        $scope.refresh = function () {

            $scope.myPromise = kuChannels.getRating($scope.dt, $scope.dt, $scope.tvid.id);
            $scope.myPromise.then(function (p) {
                var data = p.data;

                var ps = data.result.list;
                var c = [];
                var r = [];
                var s = [];
                for (var i = 0; i < ps.length; i++) {
                    c.push(moment(ps[i].timestamp, 'YYYYMMDDHHmmss').format('HH:mm'));
                    r.push(ps[i].tv_ratings);
                }
                $scope.option = getOption(c, r);
            });
        };

        $scope.getItems = function(){
            $scope.ioPromise = kuChannels.getIO($scope.dt ,$scope.start, $scope.end, $scope.tvid.id);
            $scope.ioPromise.then(function (f) {
                    var data = f.data;
                    $scope.items = data.result.list;
                    $scope.total = data.result.total;
                    $scope.total.abs = $scope.total.in - $scope.total.out;
                    $scope.startRating = data.result.start_ssl;
                    $scope.endRating = data.result.end_ssl;

                    $timeout(function () {
                        $('.table').trigger('footable_initialize');
                    }, 500);
                }
            )
        };

        $scope.$watchGroup(['dt', 'tvid'], function () {
            if($scope.tvid != ''){
                $scope.refresh();
            }

        });
    }
]);



