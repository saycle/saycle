﻿(function () {
    var app = angular.module('saycle', ['ngRoute']);
    

    // configure routes
    app.config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
        .when('/', {
            templateUrl : '/public/views/story-list.html',
            controller  : 'listController'
        })
        .when('/contact', {
            templateUrl : '/public/views/contact.html'
        })
        .otherwise({ redirectTo: '/' });;
    });

    app.controller('listController', function ($scope) {
        $scope.message = 'Everyone come and see how good I look!';
    });
    
})();