(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http) {
        
        return {
            getStories: function () {
                return $http.get('/api/stories/getstories').then(function (result) {
                    return result.data;
                });
            },
            getStoryById: function (id) {
                return $http.get('/api/stories/getstorybyid?id=' + id).then(function (result) {
                    return result.data;
                });
            },
            addCycle: function (cycle) {
                return $http.post('/api/stories/addcycle', cycle);
            },
            addStory: function (story) {
                return $http.post('/api/stories/addstory', story);
            }
        };

    });
})();