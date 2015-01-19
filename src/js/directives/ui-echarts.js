'use strict';

angular.module('ui.echarts', ['ui.load'])
    .directive('uiEcharts', ['uiLoad', function (uiLoad) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            replace: true,
            scope: {
                option: '=option'
            },
            link: function (scope, element, attrs) {

                scope.$watch('option', function () {
                    var getChart = function () {
                        var myChart = echarts.init(element[0]);
                        myChart.setOption(scope.option);
                        window.onresize = myChart.resize;
                    };
                    if (!window.echarts) {
                        uiLoad.load(['vendor/echarts/echarts-all.js']).then(function () {
                            getChart();
                        }).catch(function () {});
                    } else {
                        getChart();
                    }
                })
            }
        }
    }]);

