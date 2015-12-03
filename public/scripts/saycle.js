(function () {
    var app = angular.module('saycle', ['ngRoute', 'ui.bootstrap']);
    
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
        .when('/story-detail/:id', {
            templateUrl : '/public/views/story-detail.html',
            controller  : 'detailController'
        })
        .otherwise({ redirectTo: '/' });;
    });
    
    app.controller('saycleCtrl', function () {
        
        var vm = this;
        vm.currentUser = { name: "Beni" };

    });

})();