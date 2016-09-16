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



