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
        .when('/story-detail', {
            templateUrl : '/public/views/story-detail.html',
            controller  : 'listController'
        })
        .when('/story-list', {
            templateUrl : '/public/views/story-list.html',
            controller  : 'listController'
        })
        .otherwise({ redirectTo: '/' });;
    });
    
    app.controller('saycleCtrl', function (loginService) {
        
        var vm = this;
        vm.authInfo = loginService.getAuthInfo();

    });

})();