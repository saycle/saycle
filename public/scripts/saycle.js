(function () {
    var app = angular.module('saycle', ['ngRoute', 'ui.bootstrap']);
    
    // configure routes
    app.config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/', {
            templateUrl: '/public/views/story-list.html',
            activetab: 'home'
        })
        .when('/contact', {
            templateUrl : '/public/views/contact.html',
            activetab: 'contact'
        })
        .when('/imprint', {
            templateUrl : '/public/views/imprint.html',
            activetab: 'imprint'
        })
        .when('/story-detail/:id', {
            templateUrl : '/public/views/story-detail.html',
            activetab: 'home'
        })
        .otherwise({ redirectTo: '/' });;
    });
    
    app.controller('saycleCtrl', function (loginService, $scope) {
        var vm = this;
        vm.authInfo = loginService.getAuthInfo();

        $scope.$on('$routeChangeStart', function (current, next) {
            if(next.$$route)
            {
                vm.activetab = next.$$route.activetab;
            }
        });
    });
    

})();