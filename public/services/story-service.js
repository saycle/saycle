(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http, waitinfo, toastr, $translate) {
        
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
                    toastr.success( $translate.instant('Toastr.CycleAdded'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            addStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/addstory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryAdded'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryAddFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            deleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/deletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryDeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryDeleteFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            undeleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/undeletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryUndeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryUndeleteFailed'), $translate.instant('Toastr.Error'));
                    waitinfo.hide();
                });
            },
            lock: function (story) {
                return $http.post('/api/stories/lock', story);
            },
            cancelEdit: function (story) {
                return $http.post('/api/stories/canceledit', story);
            }
        };

    });
})();