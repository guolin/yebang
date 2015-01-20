app.controller('ChannelsTopCtrl', ['$scope', '$http', '$timeout', 'kuChannels',
    function ($scope, $http, $timeout,kuChannels) {

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

        $scope.tvTypes = {
            '00': "全部",
            '01': "央视",
            '02': "卫视",
            '03': "其他"
        };
        $scope.tvType = '00';

        var refresh = function(){
            $scope.promise = kuChannels.getTopChannels($scope.dt, $scope.tvType);
            $scope.promise.then(function(p){
                $scope.items = p.data.result;
            });
        };


        refresh();
        $scope.$watchGroup(['dt', 'tvType'], function (newValue, oldValue) {
            refresh();
        });


    }]);

app.controller('ChannelCtrl', ['$scope', '$http', '$stateParams', "$timeout","$rootScope",'kuChannels',
    function ($scope, $http, $stateParams, $timeout, $rootScope,kuChannels) {

        $scope.cid = $stateParams.id;
        cs = $rootScope.channelIDs;
        c = $rootScope.channels;
        $scope.cName = $rootScope.channelIDs[$scope.cid].name;

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker',
            datepicker: false,
            'show-weeks': false,
            'min-date': moment("2014-10-01"),
            'max-date': moment().subtract(1, 'days')
        };
        $scope.daterangeCustom = false;

        $scope.today = function () {
            $scope.from = moment().format('YYYY-MM-DD');
            $scope.to = $scope.from;
        };
        $scope.yesterday = function () {
            $scope.from = moment().subtract(1, 'days').format('YYYY-MM-DD');
            $scope.to = $scope.from;
        };
        $scope.before7days = function () {
            $scope.from = moment().subtract(8, 'days').format('YYYY-MM-DD');
            $scope.to = moment().subtract(1, 'days').format('YYYY-MM-DD');
        };
        $scope.before30days = function () {
            $scope.from = moment().subtract(31, 'days').format('YYYY-MM-DD');
            $scope.to = moment().subtract(1, 'days').format('YYYY-MM-DD');
        };

        $scope.dataFormat = 'hh:mm:ss';

        var getOption = function (categories, rating, share, vsRating) {

            var option = {
                color: ['#23b7e5', '#27c24c', '#fad733', '#7266ba',
                    '#f05050', '#e8eff0', '#3a3f51', '#1c2b36', '#40e0d0',
                    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
                animation: false,
                dataZoom: {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100
                },
                legend: {
                    data: ['关注度', '市占比'],
                    x: 'left'
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
                    x: '2', y: '30', y2: '60', x2: '2'
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

            var shareData = {
                name: '市占比',
                type: 'line',
                smooth: true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: share
            };
            if (!vsRating) {
                option.series.push(ratingData);
                option.series.push(shareData);
            } else {
                var vsRatingData = {
                    name: $scope.vsName,
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: vsRating
                };
                ratingData.name = $scope.cName;
                option.series.push(ratingData);
                option.series.push(vsRatingData);
                option.legend.data = [$scope.cName,$scope.vsName]
            }
            o = option;

            return option;
        };

        var getVSData = function (callback) {
            var from = moment($scope.from).format('YYYY-MM-DD');
            var to = moment($scope.to).format('YYYY-MM-DD');
            vv = $scope.vsid;

            var vsid = $scope.vsid.id;

            var p = kuChannels.getRating($scope.from, $scope.to, $scope.vsid.id);
            p.then(function (p) {
                var data = p.data;

                if (data.code !== 0) return;
                var ps = data.result.list;
                var r = [];
                for (var i = 0; i < ps.length; i++) {
                    r.push(ps[i].tv_ratings);
                }
                $scope.vsName = $rootScope.channelIDs[vsid].name;
                callback(r);
            });
        };

        $scope.refresh = function () {
            var p = kuChannels.getRating($scope.from,$scope.to,$scope.cid);
            p.then(function (f) {
                var data = f.data;

                if (data.code !== 0) return;
                $scope.avgRating = data.result.avg_tv_ratings;
                $scope.avgShare = data.result.avg_market_ratings;
                var ps = data.result.list;
                var c = [];
                var r = [];
                var s = [];
                for (var i = 0; i < ps.length; i++) {
                    c.push(ps[i].timestamp);
                    r.push(ps[i].tv_ratings);
                    s.push(ps[i].market_ratings);
                }
                if (data.result.unit === '分钟') {
                    $scope.dataFormat = 'HH:mm';
                } else if (data.result.unit === '小时') {
                    $scope.dataFormat = 'MM-DD HH:mm';
                } else {
                    $scope.dataFormat = 'MM-DD';
                }


                if ($scope.vsid !== '') {
                    getVSData(function (vs) {
                        $scope.option = getOption(c, r, s, vs);
                    })
                } else {
                    $scope.option = getOption(c, r, s);
                }


            });
        };

        $scope.getEpgItems = function () {
            var p = kuChannels.getEPG($scope.from, $scope.to, $scope.cid);
            p.then(function (f) {
                    //@TODO 修改API后去掉这部分
                    var items = f.data.result.list;
                    var i;
                    for (i = 0; i < items.length; i++) {
                        items[i].date = moment(items[i].start_time).format("MM-DD");
                        items[i].start = moment(items[i].start_time).format("HH:mm");
                        items[i].end = moment(items[i].end_time).format("HH:mm");
                    }
                    $scope.items = items;
                    setTimeout(function(){
                        $('.table').trigger('footable_initialize');
                    },500);

                });
        }

        $scope.updateDateRange = function () {
            var from = moment($scope.from);
            var to = moment($scope.to);

            var today = moment();
            var yesterday = moment().subtract(1, 'days');
            var before7 = moment().subtract(8, 'days');
            var before30 = moment().subtract(31, 'days');

            if (from.isSame(to, 'day')) {
                if (from.isSame(today, 'day')) {
                    $scope.daterangeType = 'today';
                    return;
                }
                if (from.isSame(yesterday, 'day')) {
                    $scope.daterangeType = 'yesterday';
                    return;
                }
            }
            if (to.isSame(yesterday, 'day')) {
                if (from.isSame(before7, 'day')) {
                    $scope.daterangeType = 'before7days';
                    return;
                }
                if (from.isSame(before30, 'day')) {
                    $scope.daterangeType = 'before30days';
                    return;
                }
            }

            $scope.daterangeType = '';
            $scope.daterangeCustom = true;
            console.log($scope.daterangeType);

        };

        $scope.yesterday();
        $scope.refresh();
        $scope.getEpgItems();
        $scope.updateDateRange();

        $scope.$watchGroup(['from', 'to', 'vsid'], function (newValue, oldValue) {
            $scope.refresh();
            $scope.getEpgItems();
            $scope.updateDateRange();

        });

    }]);