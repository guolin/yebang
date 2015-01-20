'use strict';

angular.module('app').
    service('kuChannels', ['$http', '$cacheFactory', '$q', '$timeout', 'cache',
        function ($http, $cacheFactory, $q, $timeout, cache) {

            //从cache中获取channels
            this.getChannels = function (callback) {
                var getDict = function (channelIDs, channels) {
                    return {'channelIDs': channelIDs, 'channels': channels};
                };
                if (cache.get('channels')) {
                    callback(getDict(cache.get('channelIDs'), cache.get('channels')));
                } else {
                    $http.get('/fapi/channels.json').
                        success(function (data) {
                            var i;
                            var channels = {};
                            for (i = 0; i < data.length; i++) {
                                channels[data[i].id] = {
                                    id: data[i].id,
                                    name: data[i].name,
                                    type: data[i].type
                                }
                            }
                            callback(getDict(channels, data));
                        });
                }
            };

            this.getLiveTopChannels = function(){
                var p = $http.get('/api/channel_list');
                return p
            };

            // 日期＋电视台类型
            this.getTopChannels = function(date, tvType){
                var dts = moment(date).format('YYYY-MM-DD');
                var url = '/api/tv_ratings_rank?type=' + tvType + '&start_ds=' + dts + '&end_ds=' + dts
                var promise = $http.get(url);
                return promise;
            };

            // 最近1小时 or 最近1分钟 某一个电视台
            this.getLiveRating = function(frequency, id){
                var url = '/api/ratings_'+ frequency +'?tv_id='+id;
                var p = $http.get(url);
                return p;
            };

            //某一电视台，某一个时段
            this.getRating = function(from, to , tvid){
                var fromString = moment(from).format('YYYY-MM-DD');
                var toString = moment(to).format('YYYY-MM-DD');
                var url = '/api/ratings_history?tv_id=' + tvid + '&start_ds=' + fromString + '&end_ds=' + toString;
                return $http.get(url);
            };

            //某一电视台，某一个时段内的所有节目，包括节目的收视信息
            this.getEPG = function(from, to, tvid){
                var fromString = moment(from).format("YYYY-MM-DD");
                var toString = moment(to).format("YYYY-MM-DD");
                var url = "api/ratings_epg_history?tv_id=" + tvid + "&start_ds=" + fromString + "&end_ds=" + toString + "&page_no=1&page_size=65";
                return $http.get(url);
            };

            //获取某一电视台某一时段的流入流出
            this.getIO = function(date, start, end, tvid){
                var date = moment(date).format('YYYY-MM-DD ');
                var start = date + moment(start).format('HH:mm:ss');
                var end = date + moment(end).format('HH:mm:ss');
                var url = '/labapi/tv_io?tv_id='+tvid+'&start_time='+start+'&end_time='+end;
                return $http.get(url);
            };
    }]);

angular.module('app')
    .service('kuTVShows', ['$http', '$timeout', function ($http, $timeout) {

        // 获取电视节目的排行：时间＋排行类型
        this.getTopTVShows = function(date, type){
            var dateString = moment(date).format('YYYY-MM-DD');
            var url = 'labapi/epg_sort?type='+type+'&date='+dateString;
            return $http.get(url);
        };

        //某一电视台，某一个时段
        this.getRating = function(typeid, showid){
            var url = '/labapi/epg_detail_ratings?type='+typeid+'&ca_id='+showid;
            return $http.get(url);
        };

        //某个抽象栏目下的具体栏目
        this.getEPG = function(typeid, showid){
            var url = '/labapi/epg_detail?ca_id='+showid+'&page_size=150&type='+typeid;
            return $http.get(url);
        };

        //获取某个节目的地理位置分布
        this.getGeo = function(showid){
            return $http.get('/api/rating_province?epg_id='+showid);
        };

    }]);

//angular.module('app', [])
//    .service('kuAD', ['$q', '$timeout', function ($q, $timeout) {
//
//        // 获取实时广告
//        this.getLiveADs = function(){
//            return [];
//        };
//
//        //某一电视台，某一周的品类分布
//        this.getCategories = function(){
//            return;
//        };
//
//        //某一电视台，某一周的品类分布
//        this.getBrands = function(){
//            return;
//        };
//
//    }]);
//
