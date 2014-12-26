app.controller('RatingCtrl', ['$scope', function($scope) {
$scope.option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      x: 5,
      x2: 5,
      y: 5,
      borderWidth: 0,
      borderColor: '#dce5ec'
    },
    calculable: true,
    axis: {
      splitLine: {
        color: '#fff'
      }
    },
    dataZoom: {
      show: true,
      realtime: true,
      start: 0,
      end: 100
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3','1','2','3',]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'关注度',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[10, 12, 21, 54, 260, 830, 710,10, 12, 21, 54, 260, 830, 710,10, 12, 21, 54, 260, 830, 710,10, 12, 21, 54, 260,10, 12, 21, 54, 260, 830, 710,10, 12, 21, 54, 260, 830, 710, 830, 710]
        },
        
    ]
};
}]);

app.controller('Rating24Ctrl', ['$scope', function($scope) {
	$scope.option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      x: 20,
      x2: 20,
      y: 5,
      borderWidth: 0,
      borderColor: '#dce5ec'
    },
    calculable: true,
    axis: {
      splitLine: {
        color: '#fff'
      }
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6',]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'关注度',
            type:'bar',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[10, 12, 21, 54, 260, 830, 10, 12, 111, 54, 260, 430,110, 12, 21, 54, 260, 830,10, 12, 431, 54, 260, 830,]
        },
        
    ]
};
}]);

app.controller('ShowRatingCtrl', ['$scope', function($scope) {
  $scope.option = {

    tooltip : {         
        trigger: 'axis',
        showDelay: 0,
        hideDelay: 50,
        transitionDuration:0,
        backgroundColor : 'rgba(255,0,255,0.7)',
        borderColor : '#f50',
        borderRadius : 8,
        borderWidth: 2,
        padding: 10,    // [5, 10, 15, 20]
        position : function(p) {
            // 位置回调
            console.log && console.log(p);
            return [p[0] + 10, p[1] - 10];
        },
        textStyle : {
            color: 'yellow',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: 'bold'
        },
        formatter: function (params,ticket,callback) {
            var res = params[0][1];
            for (var i = 0, l = params.length; i < l; i++) {
              res += '<br/>' + params[i][0] + ' : ' + params[i][2] + '%';
                
            }
            setTimeout(function (){
                // 仅为了模拟异步回调
                callback(ticket, res);
            }, 500)
            return 'loading';
        }
    },
    grid: {
      x: 50,
      x2: 10,
      y: 5,
      y2: 20,
      borderWidth: 0,
      borderColor: '#dce5ec'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : [
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
    yAxis : [
        {
            type : 'value',
            precision : 4,
            axisLabel : {  
                formatter : '{value} %'  
            }
        }
    ],
    series : [
  
        {
            name:'收视率',
            type:'bar',
            data:[
              0.0362 
              ,
              0.1248 
              ,
              0.0841 
              ,
              0.3377 
              ,
              0.165 
              ,
              0.0412 
              ,
              0.0242 
              ,
              0.0386 
              ,
              0.1411 
              ,
              0.0804 
              ,
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
              ,
              0.1463 
              
            ]
        }
    ]
};

}]);