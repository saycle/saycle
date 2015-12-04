//This is the js which represents the detail-view
(function () {
    var app = angular.module('saycle');
    
    
    app.controller('detailController', function ($scope, $routeParams) {
        $scope.id = $routeParams["id"];
        $scope.story = story;
        $scope.isEditMode = false;
        $scope.contribution = {
            text: "",
            started: false
        }
        
        
        
        $scope.editStory = function (e) {
            $("#story-contribution").toggleClass("visible");
            $scope.isEditMode = true;
        }
        
        $scope.saveStory = function (e) {
            $("#story-contribution").toggleClass("visible");
            $scope.isEditMode = false;
        }
        
        $scope.contributionKeypress = function (e) {
            if (!$scope.contribution.started) {
                $("#story-contribution").html("");
            }
            $scope.contribution.started = true;
            $scope.contribution.text = $("#story-contribution").html();
        }

    });
    
    var story = 
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
    };
    
})();



