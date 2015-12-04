//This is the js which represents the detail-view
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('storyDetailCtrl', function ($scope, $route, $routeParams, storyService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.story = null;
        vm.isEditMode = false;
        vm.contribution = {
            text: "",
            started: false
        }
        
        storyService.getStoryById(vm.id).then(function (story) {
            vm.story = story;
        });
        
        vm.editStory = function (e) {
            $("#story-contribution").toggleClass("visible");
            $scope.isEditMode = true;
        }
        
        vm.saveStory = function (e) {
            $("#story-contribution").toggleClass("visible");
            $scope.isEditMode = false;
        }
        
        vm.contributionKeypress = function (e) {
            if (!vm.contribution.started) {
                $("#story-contribution").html("");
            }
            vm.contribution.started = true;
            vm.contribution.text = $("#story-contribution").html();
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



