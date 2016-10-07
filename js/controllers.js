'use strict';

var wallpapersApp = angular.module('wallpapersApp', ['ngRoute', 'angular-lightbox']);

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
        console.log($scope.images.length);
        $scope.imageUrl = imageUrlArray;
        $scope.newImg = $scope.imageUrl[0];


        /* contrl slide*/
        var index = 0;
        $scope.setImg = function (imgt) {
            index = $scope.imageUrl.indexOf(imgt);
            console.log('previy-'+ index);
            $scope.mySwitch = true;
            $scope.newImg = imgt;
        };
        $(document).keydown(function(e) {
            switch (e.which) {
                case 37: // Left arrow
                    console.log('left');
                    $scope.prevSlide();
                    break;
                case 39: // Right arow
                    console.log('right');
                    $scope.nextSlide();
                    break;
                case 27: // Escape
                    console.log('exit');
                    $scope.closeSlide();
                    break;
            }
        });
        $scope.nextSlide = function (){
            index++;
            $scope.newImg = $scope.imageUrl[index == $scope.images.length ? index=$scope.images.length-1 : index];
            console.log($scope.images.length+':'+index);
        };
        $scope.prevSlide = function (){
            index--;
            $scope.newImg = $scope.imageUrl[index==-1 ? index=0 : index];
            console.log(index);
        };
        $scope.closeSlide = function(){
            $scope.mySwitch = false;
        };
    });
}]);

/*****about controller**********/
wallpapersApp.controller('aboutCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){

}]);

/*****contact controller**********/
wallpapersApp.controller('contactCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){

}]);

wallpapersApp.filter('namefilter', function(){
    return function(check){
      /* console.log(check);*/
       return check;
    }
});