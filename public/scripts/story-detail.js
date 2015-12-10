//This is the js which represents the detail-view
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('storyDetailCtrl', function ($scope, $route, $routeParams, storyService, socketService, loginService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.auth = loginService.getAuthInfo();
        vm.story = null;
        vm.contribution = {
            text: "",
            started: false
        }
        
        var refreshStory = function () {
            storyService.getStoryById(vm.id).then(function (story) {
                vm.story = story;
            });
        };
        
        refreshStory();
        
        socketService.on('refreshStory', function (data) {
            if(vm.id == data.id)
                refreshStory();
        });
        socketService.on('updateDraft', function (data) {
            if (!vm.isEditing() && vm.id == data.id)
                $scope.$apply(function () { vm.contribution.text = data.text; });
        });
        $scope.$watch('vm.contribution.text', function () {
            if (vm.isEditing()) {
                console.log('sending draft...');
                socketService.emit('draftChanged', { id: vm.id, text: vm.contribution.text });
            }
        });
        
        vm.editStory = function (e) {
            storyService.lock(vm.story).then(function () {
                
            }, function () {
                alert('Sorry, another user was faster...');
            });
        }

        vm.isEditing = function () {
            return vm.auth.currentUser != null && vm.story != null && vm.story.isLockedBy == vm.auth.currentUser.name;
        };
        
        vm.saveStory = function (e) {
            storyService.addCycle({
                story: vm.id,
                index: vm.story.cycles.length,
                text: vm.contribution.text
            });
        };
        
    });
    
    /*var story = 
    {
        id: 1,
        title: "story 1",
        username: "Lucky Hans",
        date: "2015-12-03",
        isLocked: false,
        cycles: [
            {
                index: 1,
                text: "Hallo Welt",
                username: "User",
                date: "2015-12-03"
            },
            {
                index: 2,
                text: " wie geht es dir heute?",
                username: "User",
                date: "2015-12-03"
            }
        ]
    };*/
    
})();



