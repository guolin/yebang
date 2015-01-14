
app.controller('IOCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {
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

        $scope.dt = moment().subtract(1, 'days').format('YYYY-MM-DD');

        var getOption = function (categories, rating) {

            var option = {
                color: ['#23b7e5', '#27c24c'],
                dataZoom: {
                    show: true,
                    realtime: true,
                    height:60,
                    start: 0,
                    end: 100
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (p) {
                        return [p[0] + 10, 20];
                    },
                    formatter:function (params, ticket, callback) {
                        p = params;
                        var date = moment(params[0][1], 'YYYYMMDDhhmmss').format($scope.dataFormat);
                        var p1 = params[0][0]+": "+params[0][2]+"%";
                        var res = [date, p1];
                        if(params.length > 1){
                            var p2 = params[1][0]+": "+params[1][2]+"%";
                            res.push(p2)
                        }
                        return res.join("<br />");
                    }
                },
                grid: {
                    borderColor: '#ccc',
                    borderWidth: 1,
                    x: '2', y: '0', y2: '60', x2: '2'
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: categories,
                        axisTick: {show: false},
                        splitLine: {lineStyle: {color: ['#ccc'], width: 1, type: 'solid'}},
                        axisLabel: {
                            textStyle: {color: '#ccc'},
                            formatter: function (value) {
                                var result = moment(value, 'YYYYMMDDhhmmss').format($scope.dataFormat);
                                return result;
                            }
                        }
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
            var dtString = moment($scope.dt).format('YYYY-MM-DD');
            var tvidString = $scope.tvid.id;

            $('.butterbar').removeClass('hide').addClass('active');
            $http.get('/api/ratings_history?tv_id=' + tvidString + '&start_ds=' + dtString + '&end_ds=' + dtString).
                success(function (data, status, headers, config) {

                    var ps = data.result.list;
                    var c = [];
                    var r = [];
                    var s = [];
                    for (var i = 0; i < ps.length; i++) {
                        c.push(ps[i].timestamp);
                        r.push(ps[i].tv_ratings);
                        s.push(ps[i].market_ratings);
                    }
                    $scope.option = getOption(c, r, s);
                    // butterbar
                    setTimeout(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    }, 500);
                });
        };

        $scope.getItems = function(){
            var date = moment($scope.dt).format('YYYY-MM-DD ');
            start = date+moment($scope.start).format('HH:mm:ss');
            end = date+moment($scope.end).format('HH:mm:ss');
            var tvidString = $scope.tvid.id;


            $('.butterbar').removeClass('hide').addClass('avtive');
            $http.get('/labapi/tv_io2?tv_id='+tvidString+'&start_time='+start+'&end_time='+end).
                success(function (data) {
                    $scope.items = data.result.list;
                    $scope.total = data.result.total;

                    setTimeout(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
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



