(function () {
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
        .when('/imprint', {
            templateUrl : '/public/views/imprint.html'
        })
        .otherwise({ redirectTo: '/' });;
    });
    
})();