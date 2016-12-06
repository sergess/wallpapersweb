'use strict';

var wallpapersApp = angular.module('wallpapersApp', ['ngRoute']);

wallpapersApp.config(['$routeProvider', function ($routeProvide){
    $routeProvide
        .when('/',
            {
            templateUrl: 'template/home.html',
            controller: 'homeCtrl'
            })
        .when('/about',
            {
                templateUrl: 'template/about.html',
                controller: 'aboutCtrl'
            })
        .when('/app',
            {
                templateUrl: 'template/app.html',
                controller: 'pageCtrl'
            })
        .when('/contact',
            {
                templateUrl: 'template/contact.html',
                controller: 'contactCtrl'
            })
        .otherwise
        ({
            redirectTo:'/'
        });
}]);

/*****home controller**********/
wallpapersApp.controller('homeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){
    
}]);

/*****page controller**********/
wallpapersApp.controller('pageCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){
    $http.get('json/picks.json').success(function(data, status, headers, config) {

        $scope.images = data;
        var i =0;
        var imageUrlArray = [];
        for (i=0; i<$scope.images.length; i++){
            imageUrlArray.push($scope.images[i].imageUrl);
        }
        $scope.imageUrl = imageUrlArray;
        $scope.newImg = $scope.imageUrl[0];

        /*****paginator*****/
        
    });
}]);

/*****about controller**********/
wallpapersApp.controller('aboutCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){

}]);

/*****contact controller**********/
wallpapersApp.controller('contactCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){
}]);


