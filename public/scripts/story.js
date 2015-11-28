//This is the js which represents the story-overview, and the detail-view
(function () {
    var app = angular.module('saycle');
    

    app.controller('listController', function ($scope) {
        $scope.message = 'This is the story-view!';
        $scope.stories = stories;
    });

var stories = [
{
name: "story 1",
title: "Lucky Hans",
id: 1,
iscommentator: false


} , 
 {
name: "story 2",
title: "Batman",
id: 2,
iscommentator: true
        }
    ];
    
})();



