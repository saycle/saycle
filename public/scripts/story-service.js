(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http, waitinfo, toastr) {
        
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
                waitinfo.show();
                return $http.post('/api/stories/addcycle', cycle).then(function () {
                    toastr.success('Cycle has been added', 'Done');
                    waitinfo.hide();
                });
            },
            addStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/addstory', story).then(function () {
                    toastr.success('Your story has been added.', 'Done');
                    waitinfo.hide();
                });
            },
            lock: function (story) {
                return $http.post('/api/stories/lock', story);
            }
        };

    });
})();