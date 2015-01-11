app.controller('ChannelsTopCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        $scope.open = function($event) {
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
        $scope.dt = moment().subtract(1, 'days').format('YYYY-MM-DD');

        $scope.tvTypes = {
            '00': "全部",
            '01': "央视",
            '02': "卫视",
            '03': "其他"
        };
        $scope.tvType = '00';

        $scope.refresh = function () {
            var dt = $scope.dt;
            var dts = moment(dt).format('YYYY-MM-DD');
            $('.butterbar').removeClass('hide').addClass('active');
            $http.get('/api/tv_ratings_rank?type=' + $scope.tvType + '&start_ds=' + dts + '&end_ds=' + dts).
                success(function (data, status, headers, config) {
                    $scope.items = data.result;
                    $timeout(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    }, 500);
                });
        };
        $scope.refresh();

        $scope.$watchGroup(['dt','tvType'], function (newValue, oldValue) {
            $scope.refresh();
        });


    }]);

app.controller('ChannelCtrl', ['$scope', '$http',
    function($scope, $http){


        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker',
            datepicker: false,
            'show-weeks': false
        };
        $scope.format = 'dd-MMMM-yyyy';
        $scope.daterangeCustom = false;

        $scope.today = function(){
            $scope.from = moment().format('YYYY-MM-DD');
            $scope.to = $scope.from;
            $scope.daterangeType = 'today';
        };
        $scope.yesterday = function(){
            $scope.from = moment().subtract(1, 'days').format('YYYY-MM-DD');
            $scope.to = $scope.from;
            $scope.daterangeType = 'yesterday';
        };
        $scope.before7days = function(){
            $scope.from = moment().subtract(8, 'days').format('YYYY-MM-DD');
            $scope.to = moment().subtract(1, 'days').format('YYYY-MM-DD');
            $scope.daterangeType = 'before7days';
        };
        $scope.before30days = function(){
            $scope.from = moment().subtract(31, 'days').format('YYYY-MM-DD');
            $scope.to = moment().subtract(1, 'days').format('YYYY-MM-DD');
            $scope.daterangeType = 'before30days';
        };


        var getOption = function (categories, rating, share) {

            var option = {
                color: ['#23b7e5','#27c24c','#fad733','#7266ba',
                    '#f05050','#e8eff0','#3a3f51','#1c2b36','#40e0d0',
                    '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                    '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
                animation: false,
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100
                },
                legend: {
                    data:['关注度','市占比'],
                    x: 'left'
                },
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    borderColor:'#ccc',
                    borderWidth:0,
                    x:'0',y:'25',y2:'60',x2:'50'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : categories,
                        axisLabel:{textStyle:{color:'#ccc'}},
                        axisTick:{show:false},
                        splitLine:{lineStyle:{color: ['#ccc'], width: 1, type: 'solid'}}
                    }
                ],
                yAxis : [
                    {
                        splitNumber:2,
                        scale: true,
                        position: 'right',
                        type : 'value',
                        axisLabel:{margin:6, textStyle:{color:'#ccc'}},
                        axisTick:{show:false},axisLine:{show:false}
                    }
                ],
                series : [
                    {
                        name:'关注度',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:rating
                    },
                    {
                        name:'市占比',
                        show:false,
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:share
                    }
                ]
            };
            return option;
        };

        $scope.refresh = function(){
            var from = moment($scope.from).format('YYYY-MM-DD');
            var to = moment($scope.to).format('YYYY-MM-DD');
            $http.get('/api/ratings_history?tv_id=24&start_ds='+from+'&end_ds='+to).
                success(function (data, status, headers, config) {
                    if(data.code !== 0) return;
                    $scope.avgRating = data.result.avg_tv_ratings;
                    $scope.avgShare = data.result.avg_market_ratings;
                    var ps = data.result.list;
                    var c = [];
                    var r = [];
                    var s = [];
                    for(var i = 0; i< ps.length; i++) {
                        var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
                        var dateString = ps[i].timestamp.replace(pattern, '$1-$2-$3 $4:$5:$6');
                        var date = new Date(dateString);
                        c.push(moment(date).format('HH:mm:ss'));
                        r.push(ps[i].tv_ratings);
                        s.push(ps[i].market_ratings);

                    }
                    $scope.option = getOption(c,r,s);
                });
        };


        $scope.yesterday();
        $scope.refresh();

        $scope.$watchGroup(['from','to'], function (newValue, oldValue) {
            $scope.refresh();
        });

    }]);