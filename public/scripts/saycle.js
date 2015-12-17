﻿(function () {
    var app = angular.module('saycle');

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
            templateUrl: '/public/views/ranking.html',
            activetab: 'ranking'
        })
        .when('/contact', {
            templateUrl: '/public/views/contact.html',
            activetab: 'contact'
        })
        .when('/imprint', {
            templateUrl: '/public/views/imprint.html',
            activetab: 'imprint'
        })
        .when('/story-detail/:id', {
            templateUrl: '/public/views/story-detail.html',
            activetab: 'home'
        })
        .otherwise({ redirectTo: '/' });;
    });



    app.config(function ($translateProvider) {

        var defaultLanguage = 'en-gb';
        if (window.location.href.indexOf('?lang') != -1) {
            defaultLanguage = (new RegExp('lang=([^&]+)')).exec(window.location.href)[1];
            console.log("hier bin ich");
            console.log(defaultLanguage);
        }

        $translateProvider
        .useStaticFilesLoader({
            prefix: '/public/translations/locale_',
            suffix: '.json'
        })
        .preferredLanguage(defaultLanguage);
    });

    var globalToastr = null;
    var globalTranslate = null;
    app.controller('saycleCtrl', function (loginService, $scope, $translate, toastr) {
        var vm = this;
        vm.authInfo = loginService.getAuthInfo();
        vm.changeLanguage = function (key) {
            $translate.use(key);
        };
        vm.isCurrentLanguage = function (key) {
            return $translate.use() == key
        };

        globalToastr = toastr;
        globalTranslate = $translate;
        $scope.$on('$routeChangeStart', function (current, next) {
            if (next.$$route) {
                vm.activetab = next.$$route.activetab;
            }
        });
    });

    // register the interceptor as a service
    app.factory('loginInterceptor', function ($q) {
        return {
            // optional method
            'responseError': function (rejection) {
                if (rejection.status == 401) {
                    switch (rejection.data) {
                        case "Unauthorized":
                            break;
                        case "LoginFirst":
                            globalToastr.warning(globalTranslate.instant('Toastr.LoginError.LoginFirst'));
                            openLogin();
                            break;
                        case "LoginAdmin":
                            globalToastr.warning(globalTranslate.instant('Toastr.LoginError.LoginDefault'));
                            openLogin();
                            break;
                        default:
                            globalToastr.warning(globalTranslate.instant('Toastr.LoginError.Login'));
                            break;
                    }
                }
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
            if (showWait > 0 && (!toast || !toast.isOpened))
                toast = toastr.info('Please wait...', 'Working', { timeOut: 0, extendedTimeOut: 1, autoDismiss: true });
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