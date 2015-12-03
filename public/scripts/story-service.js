﻿(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http) {
        
        return {
            getStories: function () {
                return $http.get('/api/stories/getstories').then(function (result) {
                    return result.data;
                });
            }
        };

    });
})();