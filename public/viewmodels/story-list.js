//This is the js which represents the story-list
(function () {
    var app = angular.module('saycle');


    app.controller('storyListCtrl', function ($scope, storyService, loginService, $location, $interval, $cookies) {
        var vm = this;
        vm.showStoryOptions = false;
        vm.authInfo = loginService.getAuthInfo();

        var setUserStories = function () {
            vm.stories.forEach((story) => {
                if (story.usercontributed) {
                    var cookie = $cookies.get('storyvisit_' + story.id);
                    if (cookie) {
                        var visit = JSON.parse(cookie);
                        story.newcycles = (story.cyclecount - visit.numcycles > 0 ? story.cyclecount - visit.numcycles : 0);
                        story.notvisited = story.modified > visit.date;
                        if (story.newcycles > 0 || story.notvisited) {
                            story.userupdated = true;
                        } else {
                            story.userupdated = false;
                        }
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
