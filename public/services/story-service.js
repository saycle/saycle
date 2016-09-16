(function () {
    var app = angular.module('saycle');
    
    app.service('storyService', function ($http, waitinfo, toastr, $translate, $location) {
        
        return {
            getStories: function () {
                return $http.get('/api/stories/getstories').then(function (result) {
                    return result.data;
                }, function () {
                    return false;
                });
            },
            getStoryById: function (id) {
                return $http.get('/api/stories/getstorybyid?id=' + id).then(function (result) {
                    return result.data;
                }, function () {
                    toastr.info($translate.instant('Toastr.StoryNotAvailable'), $translate.instant('Toastr.Error'));
                    $location.path('/?back')

                });
            },
            addCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/addcycle', cycle).then(function () {
                    toastr.success( $translate.instant('Toastr.CycleAdded'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            changeCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/changecycle', cycle).then(function () {
                    toastr.success($translate.instant('Toastr.CycleChanged'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                });
            },
            deleteCycle: function (cycle) {
                waitinfo.show();
                return $http.post('/api/stories/deletecycle', cycle).then(function () {
                    toastr.success($translate.instant('Toastr.CycleDeleted'), $translate.instant('Toastr.Done'));
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
            finalDeleteStory: function (story) {
                waitinfo.show();
                return $http.post('/api/stories/finaldeletestory', story).then(function () {
                    toastr.success($translate.instant('Toastr.StoryDeleted'), $translate.instant('Toastr.Done'));
                    waitinfo.hide();
                }, function () {
                    toastr.error($translate.instant('Toastr.StoryDeleteFailed'), $translate.instant('Toastr.Error'));
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