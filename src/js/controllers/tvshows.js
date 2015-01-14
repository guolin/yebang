app.controller('TvShowsTopCtrl', ['$scope','$http', '$timeout',
    function ($scope, $http, $timeout) {


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
        'show-weeks': false,
        'min-date':moment("2014-10-01"),
        'max-date':moment().subtract(1, 'days')
    };
    $scope.format = 'dd-MMMM-yyyy';
    $scope.dt = moment().subtract(1, 'days').format('YYYY-MM-DD');
    $scope.reportTypes = [
        {id:'1', name:'卫视黄金时段电视剧排行'},
        {id:'2', name:'卫视晚间时段电视剧排行'},
        {id:'3', name:'卫视晚间时段综艺排行'},
        {id:'4', name:'卫视晚间时段节目排行'}
    ];
    $scope.reportType = $scope.reportTypes[0];

    var refresh = function(){
        var type = $scope.reportType.id.toString();
        var dateString = moment($scope.dt).format('YYYY-MM-DD')
        var url = 'labapi/epg_sort?type='+type+'&date='+dateString;
        $('.butterbar').removeClass('hide').addClass('active');
        $http.get(url).
            success(function(data, status, headers, config) {
                //@TODO 改API后删除这部分
                var items = data.list;
                var i;
                for (i = 0; i < items.length; i++) {
                    items[i].date = moment(items[i].start_time).format("MM-DD");
                    items[i].start = moment(items[i].start_time).format("HH:mm");
                    items[i].end = moment(items[i].end_time).format("HH:mm");
                }
                $scope.items = items;
                $timeout(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                    $('.table').trigger('footable_initialize');
                }, 500);
            });
    };
    refresh();
    $scope.$watchGroup(['dt', 'reportType'], function () {
        refresh();
    });



}]);

app.controller('TvshowsCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {
        var typeid = $stateParams.typeid;
        var showid = $stateParams.showid;

        var reportTypes = {
            '1':'黄金时段电视剧',
            '2':'晚间时段电视剧',
            '3':'晚间时段综艺',
            '4':'晚间时段节目'
        };
        $scope.typeString = reportTypes[typeid];

        var getOption = function (c,d ) {
            var option = {
                color: ['#23b7e5', '#27c24c', '#fad733', '#7266ba',
                    '#f05050', '#e8eff0', '#3a3f51', '#1c2b36', '#40e0d0',
                    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    position : function(p) {
                        return [p[0] + 40, p[1] - 40];
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        saveAsImage: {show: true}
                    }
                },
                grid: {
                    x: 2, x2: 2, y: 30, y2: 20
                },
                legend: {
                    data: [],
                    x: 'left'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: c
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        precision: 4,
                        axisLabel: {formatter: '{value} %'}
                    }
                ],
                series: []
            };
            var i;
            for(i=0;i< d.length;i++){
                var s = {
                    name: d[i].name,
                    type: 'bar',
                    data: d[i].values
                }
                option.series.push(s);
                option.legend.data.push(d[i].name);
            }
            return option;

        };

        $scope.refresh = function () {

            $('.butterbar').removeClass('hide').addClass('active');
            $http.get('/labapi/epg_detail_ratings?type='+typeid+'&ca_id='+showid).
                success(function (data, status, headers, config) {


                    var c = data.result.date;
                    var v = data.result.values;
                    $scope.name = data.result.name;


                    $scope.option = getOption(c, v);
                    // butterbar
                    $timeout(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    }, 500);
                });
        };


        $scope.getItems = function(){
            $('.butterbar').removeClass('hide').addClass('avtive');
            $http.get('/labapi/epg_detail?ca_id='+showid+'&page_size=150&type='+typeid).success(function (data) {
                    $scope.items = data.result.list;
                    setTimeout(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                        $('.table').trigger('footable_initialize');
                    }, 500);
                }
            )
        };

        $scope.refresh();
        $scope.getItems();



    }]);