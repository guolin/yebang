app.controller('TvShowsTopCtrl', ['$scope','$http', '$timeout','kuTVShows',
    function ($scope, $http, $timeout, kuTVShows) {


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
        {id:'1', name:'黄金时段电视剧排行(19:30~22:00)'},
        {id:'2', name:'晚间电视剧排行(22:00~24:00)'},
        {id:'3', name:'卫视晚间时段综艺排行(19:30~24:00)'},
        {id:'4', name:'卫视晚间时段节目排行(19:30~24:00)'}
    ];
    $scope.reportType = $scope.reportTypes[0];

    var refresh = function(){
        $scope.promise = kuTVShows.getTopTVShows($scope.dt, $scope.reportType.id.toString());
        $scope.promise.then(function(p) {
                var data = p.data;
                var items = data.list;
                var i;
                for (i = 0; i < items.length; i++) {
                    items[i].date = moment(items[i].start_time).format("MM-DD");
                    items[i].start = moment(items[i].start_time).format("HH:mm");
                    items[i].end = moment(items[i].end_time).format("HH:mm");
                }
                $scope.items = items;
                $timeout(function () {
                    $('.table').trigger('footable_initialize');
                }, 500);
            });
    };
    refresh();
    $scope.$watchGroup(['dt', 'reportType'], function () {
        refresh();
    });



}]);

app.controller('TvshowsCtrl', ['$scope', '$http','$stateParams','kuTVShows',
    function ($scope, $http, $stateParams,kuTVShows) {
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
                    stack: '关注度',
                    data: d[i].values
                }
                option.series.push(s);
                option.legend.data.push(d[i].name);
            }
            return option;

        };

        $scope.refresh = function () {
            var p = kuTVShows.getRating(typeid, showid);
            p.then(function (p) {
                var data = p.data
                var c = data.result.date;
                var v = data.result.values;
                $scope.name = data.result.name;
                $scope.option = getOption(c, v);
            });
        };


        $scope.getItems = function(){
            var p = kuTVShows.getEPG(typeid, showid);
            p.then(function (p) {
                    var data = p.data;
                    $scope.items = data.result.list;
                    setTimeout(function () {
                        $('.table').trigger('footable_initialize');
                    }, 500);
                }
            )
        };

        $scope.refresh();
        $scope.getItems();



    }]);

app.controller('TvShowRatingCtrl', ['$scope', '$http','$stateParams','kuTVShows',
    function ($scope, $http, $stateParams,kuTVShows) {
        var showid = $stateParams.showid;

        $scope.getItems = function(){
            $scope.ioPromise = kuTVShows.getGeo(showid);
            $scope.ioPromise.then(function (p) {
                var data = p;
                var items = [];
                var i;
                var keys =  Object.keys(data);
                for(i = 0;i < keys.length; i++){
                    var k = keys[i];
                    var v = data[k];
                    items.push({name:k,rating:v});
                }
                $scope.items = items;
                setTimeout(function () {
                    $('.table').trigger('footable_initialize');
                }, 500);
            }
            )
        };
        $scope.getItems();

    }]);