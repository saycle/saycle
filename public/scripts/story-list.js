//This is the js which represents the story-list
(function () {
    var app = angular.module('saycle');
    

    app.controller('storyListCtrl', function ($scope, storyService, $location) {
        var vm = this;
        var refresh = function () {
            storyService.getStories().then(function (stories) {
                vm.stories = stories;
            });
        };
        
        refresh();

        vm.addStory = function () {
            storyService.addStory({ title: vm.newStoryTitle }).then(function () {
                refresh();
            });;
        };
    });

    //var stories = [
    //    {
    //        id: 1,
    //        title: "story 1",
    //        username: "Lucky Hans",
    //        isLocked: true,
    //        cycles: [
    //            {
    //                index: 1,
    //                text: "Hallo Welt",
    //                username: "User",
    //                date: "2015-12-03"
    //            },
    //            {
    //                index: 2,
    //                text: " wie geht es dir heute?",
    //                username: "User",
    //                date: "2015-12-03"
    //            }
    //        ]
    //    },
    //    {
    //        id: 2,
    //        title: "story 2",
    //        username: "Lucky Hans",
    //        date: "2015-12-03",
    //        isLocked: true,
    //        cycles: [
    //            {
    //                index: 1,
    //                text: "Hallo Welt",
    //                username: "User",
    //                date: "2015-12-03"
    //            },
    //            {
    //                index: 2,
    //                text: " wie geht es dir heute?",
    //                username: "User",
    //                date: "2015-12-03"
    //            }
    //        ]
    //    } 
    //];
    
})();



