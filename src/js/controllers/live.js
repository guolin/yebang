app.controller('LiveTopCtrl', ['$scope', '$http','$timeout', 'kuChannels',
    function ($scope, $http, $timeout, kuChannels) {

        $scope.promise = kuChannels.getLiveTopChannels();
        $scope.promise.then(function(p){
            $scope.items = p.data
        });

}]);

app.controller('LiveCtrl', ['$scope', '$http', '$interval','$stateParams','$timeout','kuChannels',
    function ($scope, $http, $interval,$stateParams,$timeout,kuChannels) {
        $scope.n = 1;
        $scope.cid = $stateParams.id;
        $scope.promise = '';
        $scope.currentDate = moment().format('HH:mm:ss');

        var getOption = function (categories, ratings , shares, tvshows) {

            var option = {
                color: ['#23b7e5','#27c24c','#fad733','#7266ba',
                    '#f05050','#e8eff0','#3a3f51','#1c2b36','#40e0d0',
                    '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                    '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
                animation: false,
                tooltip : {
                    trigger: 'axis',
                    showDelay : 0,
                    transitionDuration: 0,
                    formatter: function (params,ticket,callback) {
                        var rating = params[0][2];
                        var time = moment(params[0][1], "YYYYMMDDhhmmss");
                        var share = shares[params[0].dataIndex];
                        var tvshow = tvshows[params[0].dataIndex];
                        var detail = time.format("hh:mm:ss")+"<br />" + tvshow;
                        detail += "<br />关注度: " + rating + "%";
                        detail += "<br />市占比: " + share + "%";

                        setTimeout(function(){
                            var timeString = time.format('YYYYMMDDHHmm');
                            var url = 'http://img1.kyimg.com/media/tv_rating_img/'+$scope.cid+'/'+timeString+'.jpg';
                            var res = '<img width="120px" src="'+url+'" >';
                            res += '<br />';
                            res += detail;
                            callback(ticket, res);
                        }, 500);


                        return detail;
                    },
                    position : function(p) {
                        return [p[0] + 10, 5];
                    }
                },
                grid:{
                    borderColor:'#ccc',
                    borderWidth:0,
                    x:'2',y:'15',y2:'30',x2:'2'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : categories,
                        axisTick:{show:false},
                        splitLine:{lineStyle:{color: ['#ccc'], width: 1, type: 'solid'}},
                        axisLabel: {
                            textStyle: {color: '#ccc'},
                            formatter: function (value) {
                                var result = moment(value, 'YYYYMMDDhhmmss').format("hh:mm:ss");
                                return result;
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        splitNumber:2,
                        scale: true,
                        position: 'right',
                        type : 'value',
                        axisLabel:{
                            margin:-45, textStyle:{color:'#ccc'},
                            formatter:'{value}%'
                        },
                        axisTick:{show:false},axisLine:{show:false}

                    }
                ],
                series : [
                    {
                        name:'关注度',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:ratings
                    }
                ]
            };

            if($scope.isXSmallDevice()){
                option.grid.x = -1;
                option.grid.x2 = -1;
            }

            return option;
        };

        var refresh = function(frequency){
            var chartPromise =
                kuChannels.getLiveRating(frequency, $scope.cid);

            chartPromise.then(function (p) {
                    var data = p.data;
                    var result = data.result;
                    var c = [];
                    var ratings = [];
                    var shares = [];
                    var tvshows = [];
                    for(var i = 0; i< result.length; i++) {
                        var t = result[i].timestamp;
                        c.push(t);
                        ratings.push(result[i].tv_ratings);
                        shares.push(result[i].market_ratings);
                        tvshows.push(result[i][t]);
                    }
                    $scope.option = getOption(c , ratings , shares , tvshows);
                    $scope.currentDate = moment().format('HH:mm:ss');
                    $scope.currentRating = result[result.length-1].tv_ratings;
                    $scope.currentShare = result[result.length-1].market_ratings;
                    $scope.currentTvshow = result[result.length-1][result[result.length-1].timestamp];
                });
            return chartPromise;
        };

        $scope.setFrequence = function(frequence){

            var cancle = function(){
                if($scope.promise){
                    $interval.cancel($scope.promise);
                }
            };

            $scope.frequence = frequence;
            cancle();

            if(frequence === 'seconds'){
                refresh('seconds');
                $scope.promise =  $interval(function () {
                    refresh('seconds');
                }, 1000);
            }else if(frequence === 'minutes'){
                refresh('minutes');
                $scope.promise =  $interval(function () {
                    refresh('minutes');
                }, 1000*60);
            }else{
                cancle();
            };

            $scope.$on('$destroy', function () {
                cancle();
            });
        };

        $scope.getLatestTvshows = function(){
            $http.get('/api/tv_lates_info?tvID='+$scope.cid+'&size=10').
                success(function(data, status, headers, config){
                    $scope.channelName = data.tv_name;
                    $scope.latestTvshows = data.info.splice(0,5);
                }).
                error(function(data, status, headers, config){
                    console.log(data);
                });
        }

        $scope.setFrequence('minutes');

        $scope.getLatestTvshows();

    }]);