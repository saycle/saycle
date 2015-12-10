﻿(function () {
    var app = angular.module('saycle', ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'toastr', 'pascalprecht.translate']);
    
    // configure routes
    app.config(function ($locationProvider, $routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('loginInterceptor');

        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/', {
            templateUrl: '/public/views/story-list.html',
            activetab: 'home'
        })
        .when('/ranking', {
            templateUrl : '/public/views/ranking.html',
            activetab: 'ranking'
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
    
    app.config(function ($translateProvider) {
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/public/translations/locale-',
            suffix: '.json'
        })
        .preferredLanguage('en');
    });

    app.controller('saycleCtrl', function (loginService, $scope, $translate) {
        var vm = this;
        vm.authInfo = loginService.getAuthInfo();
        vm.changeLanguage = function (key) {
            $translate.use(key);
        };
        $scope.$on('$routeChangeStart', function (current, next) {
            if(next.$$route)
            {
                vm.activetab = next.$$route.activetab;
            }
        });
    });
    
    // register the interceptor as a service
    app.factory('loginInterceptor', function ($q) {
        return {
            // optional method
            'responseError': function (rejection) {
                if (rejection.status == 401)
                    alert("Please log in before writing something.")
                return $q.reject(rejection);
            }
        };
    });

    app.service('waitinfo', function (toastr) {
        var showWait = 0;
        var toast = null;
        var refresh = function () {
            if (showWait <= 0 && toast != null && toast.isOpened)
                toastr.clear(toast);
            if(showWait > 0 && (!toast || !toast.isOpened))
                toast = toastr.info('Please wait...', 'Working', { timeOut: 0, extendedTimeOut: 0, autoDismiss: false });
        };
        return {
            show: function () {
                showWait++;
                refresh();
            },
            hide: function () {
                showWait--;
                refresh();
            }
        };
    });

    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right'
        });
    });

})();