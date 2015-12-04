//This is the js which represents the detail-view
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('storyDetailCtrl', function ($scope, $route, $routeParams, storyService, socketService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.story = null;
        vm.isEditMode = false;
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
        
        vm.editStory = function (e) {
            storyService.lock(vm.story).then(function () {
                vm.isEditMode = true;
            }, function () {
                alert('Sorry, another user was faster...');
            });
        }
        
        vm.saveStory = function (e) {
            storyService.addCycle({
                story: vm.id,
                index: vm.story.cycles.length,
                text: vm.contribution.text
            }).then(function () {
                vm.isEditMode = false;
            });
        }
        

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



