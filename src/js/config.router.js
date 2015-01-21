'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/app/livechannels');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.default', {
                    url: '/default',
                    templateUrl: 'tpl/default.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/rating.js']);
                            }
                        ]
                    }
                })

                //电视台实时排行
                .state('app.liveChannels', {
                    url: '/livechannels',
                    templateUrl: 'tpl/live_channels.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/live.js']);
                            }
                        ]
                    }
                })
                //电视台实时数据
                .state('app.liveChannelDetail', {
                    url: '/livechannels/:id',
                    templateUrl: 'tpl/live_channels_detail.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/live.js']);
                            }
                        ]
                    }
                })

                //电视台历史排行
                .state('app.channels', {
                    url: '/channels',
                    templateUrl: 'tpl/channels.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/channels.js']);
                            }
                        ]
                    }
                })
                //电视台详情
                .state('app.channelDetail', {
                    url: '/channels/:id',
                    templateUrl: 'tpl/channels_detail.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/channels.js']);
                            }
                        ]
                    }
                })

                //电视台节目排行
                .state('app.tvshows', {
                    url: '/tvshows',
                    templateUrl: 'tpl/tvshows.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/tvshows.js']);
                            }
                        ]
                    }
                })
                //电视台节目详情
                .state('app.tvshowDetail', {
                    url: '/tvshows/{typeid}/{showid}',
                    templateUrl: 'tpl/tvshows_detail.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/tvshows.js']);
                            }
                        ]
                    }
                })
                .state('app.tvshowRating', {
                    url: '/tvshow/:showid',
                    templateUrl: 'tpl/tvshow_rating.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/tvshows.js']);
                            }
                        ]
                    }
                })

                //流入流出
                .state('app.io', {
                    url: '/io',
                    templateUrl: 'tpl/io.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/io.js']);
                            }
                        ]
                    }
                })

                //在线终端
                .state('app.liveClients', {
                    url: '/liveclients',
                    templateUrl: 'tpl/live_clients.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/map.js']);
                            }
                        ]
                    }
                })
                //激活终端
                .state('app.totleClients', {
                    url: '/totalclients',
                    templateUrl: 'tpl/total_clients.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/map.js']);
                            }
                        ]
                    }
                })
                //受众分析
                .state('app.audiences', {
                    url: '/audiences',
                    templateUrl: 'tpl/audiences.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/rating.js']);
                            }
                        ]
                    }
                })
                //房价
                .state('app.housingPrice', {
                    url: '/housingprice',
                    templateUrl: 'tpl/housing_price.html'
                })
                //受众标签
                .state('app.audiencesTag', {
                    url: '/audiences/tag',
                    templateUrl: 'tpl/audiences_tag.html'
                })

                .state('app.adCategories', {
                    url: '/adcategories',
                    templateUrl: 'tpl/ad_categories.html'
                })
                .state('app.adCategories2rd', {
                    url: '/adcategories/:id',
                    templateUrl: 'tpl/ad_categories_2rd.html'
                })
                .state('app.adBrands', {
                    url: '/adbrands',
                    templateUrl: 'tpl/ad_brands.html'
                })
                .state('app.adBrands2rd', {
                    url: '/adbrands/:id',
                    templateUrl: 'tpl/ad_brands_2rd.html'
                })
                .state('app.liveAd', {
                    url: '/livead',
                    templateUrl: 'tpl/livead.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/ad.js']);
                            }
                        ]
                    }
                })

                //帮助
                .state('app.help', {
                    url: '/help',
                    templateUrl: 'tpl/help.html'
                })
                //关于我们
                .state('app.about', {
                    url: '/about',
                    templateUrl: 'tpl/about.html'
                })

        }
    ]
);
