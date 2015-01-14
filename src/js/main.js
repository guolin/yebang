'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$http', '$window',
        function ($scope, $rootScope, $http, $window) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: '酷云EYE',
                version: '0.3.3',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

            $scope.isXSmallDevice = function(){
                if( $('#xs-test').css('display') == 'none' ){
                    return false;
                }else{
                    return true;
                }
            };

            $rootScope.getChannels = function(){
                $http.get('/fapi/channels.json').
                    success(function(data){
                        var i;
                        var channels = {};
                        for(i=0 ; i < data.length; i++){
                            channels[data[i].id] = {
                                id : data[i].id,
                                name : data[i].name,
                                type : data[i].type
                            }
                        }
                        $rootScope.channelIDs = channels;
                        $rootScope.channels = data;
                    });
            };
            $rootScope.getChannels();
        }]);

