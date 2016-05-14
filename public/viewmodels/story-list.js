//This is the js which represents the story-list
(function () {
    var app = angular.module('saycle');


    app.controller('storyListCtrl', function ($scope, storyService, $location, $interval, ModalService) {
        var vm = this;
        vm.showStoryOptions = false;
        var refresh = function () {
            storyService.getStories().then(function (stories) {
                vm.stories = stories;
            });
        };

        refresh();

        // Refresh stories every 10 seconds
        var refreshInterval = $interval(refresh, 10000);
        $scope.$on('$destroy', function () {
            $interval.cancel(refreshInterval);
        });

        vm.addStory = function () {
            ModalService.showModal({
                templateUrl: "/public/views/partials/createstory.html",
                controller: "createStoryCtrl",
                    inputs: {
                        title: vm.newStoryTitle
                    }
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    console.log(result);
                });
            });
        };
    });

})();



