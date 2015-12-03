//This is the js which represents the story-list
(function () {
    var app = angular.module('saycle');
    

    app.controller('listController', function ($scope) {
        $scope.stories = stories;
    });

    var stories = [
        {
            id: 1,
            title: "story 1",
            username: "Lucky Hans",
            isLocked: true,
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
        },
        {
            id: 2,
            title: "story 2",
            username: "Lucky Hans",
            date: "2015-12-03",
            isLocked: true,
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
        } 
    ];
    
})();



