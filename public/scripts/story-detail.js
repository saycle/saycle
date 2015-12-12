//This is the js which represents the detail-view
(function() {
    var app = angular.module('saycle');


    app.controller('storyDetailCtrl', function($scope, $route, $routeParams, storyService, socketService, loginService, toastr) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.auth = loginService.getAuthInfo();
        vm.story = null;
        vm.contribution = "";

        var refreshStory = function() {
            storyService.getStoryById(vm.id).then(function(story) {
                vm.story = story;
            });
        };

        refreshStory();

        socketService.on('refreshStory', function(data) {
            if (vm.id == data.id)
                refreshStory();
        });
        socketService.on('updateDraft', function(data) {
            if (!vm.isEditing() && vm.id == data.id)
                $scope.$apply(function() { vm.contribution = data.text; });
        });

        $scope.$watch('vm.contribution.text', function() {
            if (vm.isEditing()) {
                console.log('sending draft...');
                socketService.emit('draftChanged', { id: vm.id, text: vm.contribution });
            }
        });

        vm.editStory = function(e) {
            storyService.lock(vm.story).then(function() {
                vm.contribution = "";
            }, function(err) {
                switch (err.status) {
                case 401:
                    break;
                case 500:
                    toastr.warning('Sorry, another user was faster...', 'Locked');
                    break;
                }
            });
        }

        vm.isEditing = function() {
            return vm.auth.currentUser != null && vm.story != null && vm.story.isLockedBy == vm.auth.currentUser.name;
        };

        vm.saveStory = function(e) {
            storyService.addCycle({
                story: vm.id,
                index: vm.story.cycles.length,
                text: vm.contribution
            });
            vm.contribution = "";
        };

    });

    app.filter('breakFilter', function() {
        return function (text) {
            return text.replace(/\n/g, "<br>");
        };
    });


})();



