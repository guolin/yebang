app.controller('LiveAdsCtrl', ['$scope', '$http','$timeout', 'kuAds',
    function ($scope, $http, $timeout, kuAds) {

        $scope.promise = kuAds.getLiveADs();
        $scope.promise.then(function(p){
            $scope.items = p.data.result.list;
        });

    }]);

app.controller('ChannelAdsCtrl', ['$scope', '$http','$timeout', 'kuAds',
    function ($scope, $http, $timeout, kuAds) {

        $scope.promise = kuAds.getChannelADs();
        $scope.promise.then(function(p){
            $scope.items = p.data.result.list;
        });

    }]);

app.controller('CategoryAdsCtrl', ['$scope', '$http','$timeout', 'kuAds',
    function ($scope, $http, $timeout, kuAds) {
        $scope.promise = kuAds.getCategoryADs();
        $scope.promise.then(function(p){
            $scope.items = p.data.result.list;
        });
    }]);

app.controller('BrandAdsCtrl', ['$scope', '$http','$timeout', 'kuAds',
    function ($scope, $http, $timeout, kuAds) {

        $scope.promise = kuAds.getBrandADs();
        $scope.promise.then(function(p){
            $scope.items = p.data.result.list;
        });

    }]);