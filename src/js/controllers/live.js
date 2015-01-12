app.controller('LiveTopCtrl', ['$scope', '$http', function ($scope, $http) {
    var getTop = function(){
        $http.get('/fapi/live_top.json').
            success(function (data, status, headers, config) {
                $scope.items = data;
            });
    };
    getTop();
}]);

app.controller('LiveCtrl', ['$scope', '$http', '$interval','$stateParams',
    function ($scope, $http, $interval,$stateParams ) {
        $scope.categories = [];
        $scope.data = [];
        $scope.n = 1;
        $scope.cid = $stateParams.id;
        $scope.promise = '';

        var getOption = function (categories, data) {

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
                    hideDelay: 1000
                },
                grid:{
                    borderColor:'#ccc',
                    borderWidth:0,
                    x:'10',y:'10',y2:'40',x2:'60'
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
                        data:data
                    }
                ]
            };

            if($scope.isXSmallDevice()){
                option.grid.x = 0;
                option.grid.x2 = 0;
            }
            console.log($scope.isXSmallDevice());
            return option;
        };

        var refresh = function(frequency){
            $http.get('/api/ratings_'+ frequency +'?tv_id='+$scope.cid).
                success(function (data, status, headers, config) {
                    var minutes = data.result;
                    var c = [];
                    var d = [];
                    for(var i = 0; i< minutes.length; i++) {
                        var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
                        var dateString = minutes[i].timestamp.replace(pattern, '$1-$2-$3 $4:$5:$6');
                        var date = new Date(dateString);
                        c.push(moment(date).format('HH:mm:ss'));
                        d.push(minutes[i].tv_ratings);
                    }
                    $scope.option = getOption(c,d);
                    $scope.currentDate = moment().format('HH:mm:ss');
                    $scope.currentRating = minutes[minutes.length-1].tv_ratings;
                    $scope.currentShare = minutes[minutes.length-1].market_ratings;
                });
        };

        $scope.setFrequence = function(frequence){

            var cancle = function(){
                if($scope.promise){
                    $interval.cancel($scope.promise);
                };
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
                    $scope.latestTvshows = data.info;
                    $scope.channelName = data.tv_name;
                }).
                error(function(data, status, headers, config){
                    console.log(data);
                });
        }

        $scope.setFrequence('minutes');
        $scope.getLatestTvshows();


    }]);