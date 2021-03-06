(function () {
    var app = angular.module('saycle', ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'toastr', 'pascalprecht.translate', 'monospaced.elastic', 'btford.markdown', 'angularMoment', 'angularModalService', 'ngCookies']);
})();
function dropdownToggle(e) {
    $(e).parent().toggleClass("open");
    $(".dropdown-toggle-custom").each(function() {
        if (!$(this).is(e)) {
            $(this).parent().removeClass("open");
        }
    });
}

$(document).on('click', function (e) {
    if (!$(".dropdown-menu-custom").is(e.target)
            && $(".dropdown-menu-custom").has(e.target).length === 0
            && $(".open").has(e.target).length === 0
    ) {
        $(".dropdown-toggle-custom").parent().removeClass("open");
    }
    if ($(e.target).data("closeaction") || (!$("#navigation").is(e.target)
            && $("#navigation").has(e.target).length === 0
            && $(".in").has(e.target).length === 0
)) {
        hideNavigation();
    }
});

$('.btn-toggle').click(function () {
    $(this).find('.btn').toggleClass('active');
});

function htmlKeypress(e, func) {
    if (e.keyCode == 2 && e.ctrlKey) {
        $("#easteregg-ctrlb").modal();
    }
}

function hideNavigation() {
    $("#navigation").removeClass("in");
}

function openNavigation() {
    $("#navigation").addClass("in");
}

function openLogin() {
    openNavigation();
    $("#login").parent().addClass("open");
}
//This is the js which represents the contact
(function () {
    var app = angular.module('saycle');


    app.controller('contactCtrl', function ($scope, contactService, $route, $translate) {
        var vm = this;
        vm.result = {
            class: 'hidden',
            message: ''
        };
        vm.formData = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.submit = function () {
            vm.submitted = true;
            vm.submitDisabled = true;
            contactService.send(vm.formData).then(function () {
                vm.submitDisabled = false;
                vm.formData = {};
            });
            return false;
        }

    });

})();
//This is the js which represents the imprint
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('imprintCtrl', function ($scope, $route) {
        var vm = this;
        var today = new Date();
        vm.year = today.getFullYear();
    });

})();
(function () {
    var app = angular.module('saycle');

    app.controller('loginCtrl', function (loginService) {
        var vm = this;
        vm.user = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.login = function () {
            vm.submitDisabled = true;
            vm.submitted = true;
            loginService.login(vm.formData).then(function() {
                vm.submitDisabled = false;
            });
            vm.submitDisabled = false;
        };

        vm.logout = function () {
            loginService.logout();
        };
        
        return vm;
    });
})();
//This is the js which represents the imprint
(function () {
    var app = angular.module('saycle');


    app.controller('rankingCtrl', function ($scope, $route, rankingService) {
        var vm = this;
        vm.users = [];
        rankingService.getRankedUsers().then(function (rankedUsers) {
            vm.users = rankedUsers;
        });

    });

})();
(function () {
    var app = angular.module('saycle');

    app.controller('registerCtrl', function (registerService) {
        var vm = this;
        vm.formData = {};
        vm.submitDisabled = false;
        vm.submitted = false;
        vm.register = function () {
            vm.submitted = true;
            if (vm.formData.password == vm.formData.passwordConfirm) {
                registerService.register(vm.formData).then(function () {
                    vm.submitted = false;
                    vm.formData = {};
                    hideNavigation();
                });
            }
            vm.submitDisabled = false;
        }
    });
})();
(function () {
    var app = angular.module('saycle');
    
    // configure routes
    app.config(function ($locationProvider, $routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
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
        var $cookies;
        angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
                $cookies = _$cookies_;
            }]);
        
        var lang = false;
        var langFileConvention = {
            prefix: '/public/content/translations/locale_',
            suffix: '.json'
        };
        if (window.location.href.indexOf('?lang') != -1) {
            lang = (new RegExp('lang=([^&]+)')).exec(window.location.href)[1];
            setLangCookie($cookies, lang);
        } else {
            lang = $cookies.get('lang');
        }
        if (lang) {
            $translateProvider
                .useStaticFilesLoader(langFileConvention)
                .preferredLanguage(lang)
                .useSanitizeValueStrategy('escaped');
        } else {
            $translateProvider
                .useStaticFilesLoader(langFileConvention)
                .registerAvailableLanguageKeys(['en', 'de-ch', 'de-de'], {
                'en_*': 'en',
                'de-ch*': 'de-ch',
                'de_ch': 'de-ch',
                'de-*': 'de-de',
                'de_*': 'de-de',
                '*': 'en'
            })
                .determinePreferredLanguage()
                .fallbackLanguage(['en-gb'])
                .useSanitizeValueStrategy('escaped');
        }
        

    });
    
    var globalToastr = null;
    var globalTranslate = null;
    app.controller('saycleCtrl', function (loginService, $scope, $translate, toastr, amMoment, $cookies) {
        var vm = this;
        vm.authInfo = loginService.getAuthInfo();
        vm.changeLanguage = function (key) {
            $translate.use(key);
            amMoment.changeLocale(key.split(['-'][0]));
            setLangCookie($cookies, key);
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
        amMoment.changeLocale($translate.proposedLanguage());
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
            if (showWait <= 0 && toast != null && toast.isOpened) {
                toastr.clear(toast);
            }
            if (showWait > 0 && (!toast || !toast.isOpened)) {
                toast = toastr.info(globalTranslate.instant('Toastr.PleaseWait'),
                    globalTranslate.instant('Toastr.Working'),
                    { timeOut: 2000, extendedTimeOut: 2000, autoDismiss: true });
                showWait--;
                setInterval(function () { refresh(); }, 1500);
            }
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
    
    
    function setLangCookie($cookies, lang) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 31536000000);
        $cookies.put('lang', lang, { 'expires': expires.toUTCString() });
    }

})();
//This is the js which represents the detail-view
(function () {
    var app = angular.module('saycle');


    app.controller('storyDetailCtrl', function ($scope, $route, $routeParams, $sce, $translate, $location, $cookies, storyService, socketService, loginService, toastr) {
        var vm = this;
        vm.currentAbsUrl = $location.absUrl();
        vm.currentPath = $location.path();
        vm.id = $routeParams["id"];
        vm.authInfo = loginService.getAuthInfo();
        vm.story = null;
        vm.contribution = "";
        vm.editor = { inEdit: false };

        var setStoryCookie = function () {
            var expires = new Date();
            expires.setTime(expires.getTime() + 31536000000);
            var visit = {
                numcycles: vm.story.cycles.length,
                date: new Date(),
                username: vm.authInfo.currentUser.name
            }
            $cookies.put('storyvisit_' + vm.id, JSON.stringify(visit), { 'expires': expires.toUTCString() });
        };

        var refreshStory = function () {
            storyService.getStoryById(vm.id).then(function (story) {
                vm.story = story;
                setStoryCookie();
            }, function () {
            });
        };

        refreshStory();

        socketService.on('refreshStory', function (data) {
            if (vm.id == data.id) {
                refreshStory();
            }
        });

        socketService.on('updateDraft', function (data) {
            if (!vm.isEditing() && vm.id == data.id) {
                $scope.$apply(function() {
                     vm.contribution = data.text;
                });
            }
        });

        $scope.$watch('vm.contribution', function () {
            if (vm.isEditing()) {
                socketService.emit('draftChanged', { id: vm.id, text: vm.contribution });
            }
        });

        vm.editStory = function (contribution) {
            storyService.lock(vm.story).then(function () {
                vm.contribution = contribution;
            }, function (err) {
                switch (err.status) {
                    case 401:
                        break;
                    case 500:
                        toastr.warning($translate.instant('Toastr.StoryError.StoryLockedText'), $translate.instant('Toastr.StoryError.StoryLockedTitle'));
                        break;
                }
            });
        };

        vm.cancelEdit = function () {
            storyService.cancelEdit(vm.story).then(function () {
                vm.cancelContribution();
            });
        };

        vm.editCycle = function (cycle) {
            vm.editStory(cycle.text);
            vm.editor = {
                index: cycle.index,
                story: cycle.story,
                inEdit: true
            };
        }

        vm.deleteCycle = function () {
            if (vm.editor.inEdit) {
                storyService.deleteCycle({
                    story: vm.editor.story,
                    index: vm.editor.index
                }).then(function () {
                    vm.cancelContribution();
                });
            }
        }

        vm.isEditing = function () {
            return vm.authInfo.currentUser != null && vm.story != null && vm.story.isLockedBy == vm.authInfo.currentUser.name;
        };

        vm.saveStory = function (e) {
            if (vm.story.active) {
                if (vm.editor.inEdit) {
                    storyService.changeCycle({
                        story: vm.editor.story,
                        index: vm.editor.index,
                        text: vm.contribution
                    }).then(function () {
                        vm.cancelContribution();
                    });
                } else {
                    storyService.addCycle({
                        story: vm.id,
                        text: vm.contribution
                    }).then(function () {
                        vm.cancelContribution();
                    });
                }
            };
        }

        vm.isAdmin = function () {
            return vm.authInfo.currentUser != null && vm.authInfo.currentUser.isAdmin;
        };

        vm.cancelContribution = function () {
            vm.contribution = "";
            vm.editor = { inEdit: false };
            
        }
    });

    app.filter('breakFilter', function () {
        return function (text) {
            if (text) {
                return text.replace(/\n/g, "<br>");
            }
        };
    });


})();




//This is the js which represents the story-list
(function () {
    var app = angular.module('saycle');


    app.controller('storyListCtrl', function ($scope, storyService, loginService, $location, $interval, $cookies) {
        var vm = this;
        vm.showStoryOptions = false;
        vm.authInfo = loginService.getAuthInfo();

        var setUserStories = function () {
            debugger;
            vm.stories.forEach((story) => {
                if (story.usercontributed) {
                    var cookie = $cookies.get('storyvisit_' + story.id);
                    if (cookie) {
                        var visit = JSON.parse(cookie);
                        debugger;
                        story.newcycles = (story.cyclecount - visit.numcycles > 0 ? story.cyclecount - visit.numcycles : 0);
                        story.notvisited = story.modified > visit.date;
                        if (story.newcycles > 0 || story.notvisited) {
                            story.userupdated = true;
                        } else {
                            story.userupdated = false;
                        }
                        debugger;
                    }
                }
            });
        }

        var refresh = function () {
            storyService.getStories().then(function (stories) {
                vm.stories = stories;
                setUserStories();
            });
        };
        refresh();

        // Refresh stories every 10 seconds
        var refreshInterval = $interval(refresh, 10000);
        $scope.$on('$destroy', function () {
            $interval.cancel(refreshInterval);
        });

        vm.addStory = function () {
            storyService.addStory({ title: vm.newStoryTitle }).then(function () {
                vm.newStoryTitle = "";
                refresh();
            });;
        };

        vm.deleteStory = function (storyId) {
            storyService.deleteStory({ id: storyId }).then(function () {
                refresh();
            });;
        };

        vm.undeleteStory = function (storyId) {
            storyService.undeleteStory({ id: storyId }).then(function () {
                refresh();
            });;
        };

        vm.finalDeleteStory = function (storyId) {
            storyService.finalDeleteStory({ id: storyId }).then(function () {
                refresh();
            });;
        };

        vm.isAdmin = function () {
            return vm.authInfo.currentUser != null && vm.authInfo.currentUser.isAdmin;
        };

    });

})();

(function () {
    var app = angular.module('saycle');

    app.service('contactService', function ($http, $translate, waitinfo, toastr) {

        return {
            send: function (formData) {
                waitinfo.show();
                return $http.post('/api/contact/send', formData).then(function (result) {
                    waitinfo.hide();
                    toastr.success($translate.instant('Toastr.Sent'), $translate.instant('Toastr.Success'));
                    
                    return result.data;
                }, function () {
                    toastr.error($translate.instant('Toastr.SentError'), $translate.instant('Toastr.Error'));
                });
            }
        };

    });
})();
(function () {
    var app = angular.module('saycle');

    app.service('loginService', function ($http, $translate, toastr, waitinfo) {
        var authInfo = {
            currentUser: null
        };

        var refreshAuthInfo = function () {
            $http.get('/api/getcurrentuser').then(function (result) {
                authInfo.currentUser = result.data === "" ? null : result.data;
            });
        };

        refreshAuthInfo();

        return {
            login: function (loginInfo) {
                waitinfo.show();
                return $http.post('/login', loginInfo).success(function () {
                    waitinfo.hide();
                    refreshAuthInfo();
                    toastr.success($translate.instant('Toastr.LoginSuccess'), $translate.instant('Toastr.Welcome'));
                    hideNavigation();
                }, function (result) {
                    waitinfo.hide();
                    toastr.error($translate.instant('Toastr.LoginError.Fail'), $translate.instant('Toastr.Error'));
                });
            },
            getAuthInfo: function () {
                refreshAuthInfo();
                return authInfo;
            },
            isAdmin: function () {
                return $http.get('/isAdmin').then(function () {
                    refreshAuthInfo();
                    return authInfo.isAdmin;
                });
            },
            logout: function () {
                return $http.get('/logout').then(function () {
                    location.reload();
                });
            }
        };
    });
})();
(function () {
    var app = angular.module('saycle');

    app.service('rankingService', function ($http) {

        return {
            getRankedUsers: function () {
                return $http.get('/api/getrankedusers').then(function (result) {
                    return result.data;
                });
            }
        };

    });
})();
(function () {
    var app = angular.module('saycle');

    app.service('registerService', function ($http, toastr, waitinfo) {

        return {
            register: function (registerInfo) {
                waitinfo.show();
                return $http.post('/api/register', registerInfo).success(function () {
                    waitinfo.hide();
                    toastr.success('Your user has been registered. You can login now.', 'Success');
                }).error(function (result) {
                    waitinfo.hide();
                    toastr.error('Registering failed', 'Error');
                });
            }
        };
    });
})();
(function () {
    var app = angular.module('saycle');
    
    app.service('socketService', function () {
        var socket = io();
        // socket.emit, socket.on can be called on the socket object
        return socket;
    });
})();

(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http, waitinfo, toastr, $translate, $location) {
        
        return {
            getStories: function () {
                return $http.get('/api/stories/getstories').then(function (result) {
                    return result.data;
                }, function () {
                    return false;
                });
            },
            getStoryById: function (id) {
                return $http.get('/api/stories/getstorybyid?id=' + id).then(function (result) {
                    return result.data;
                }, function () {
                    toastr.info($translate.instant('Toastr.StoryNotAvailable'), $translate.instant('Toastr.Error'));
                    $location.path('/?back')

                });
            },
            addCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/addcycle', cycle).then(function () {
                    toastr.success( $translate.instant('Toastr.CycleAdded'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            changeCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/changecycle', cycle).then(function () {
                    toastr.success($translate.instant('Toastr.CycleChanged'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            deleteCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/deletecycle', cycle).then(function () {
                    toastr.success($translate.instant('Toastr.CycleDeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            addStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/addstory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryAdded'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryAddFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },

            deleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/deletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryDeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryDeleteFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            undeleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/undeletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryUndeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryUndeleteFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            finalDeleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/finaldeletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryDeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryDeleteFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            lock: function (story) {
                return $http.post('/api/stories/lock', story);
            },
            cancelEdit: function (story) {
                return $http.post('/api/stories/canceledit', story);
            }
        };

    });
})();
//# sourceMappingURL=saycle.js.map