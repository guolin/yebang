app.controller('LiveAdsCtrl', ['$scope', '$http','$timeout', 'kuAds',
    function ($scope, $http, $timeout, kuAds) {

        $scope.promise = kuAds.getLiveADs();
        $scope.promise.then(function(p){
            $scope.items = p.data.result.list;
        });

    }]);