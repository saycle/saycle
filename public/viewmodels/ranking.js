﻿//This is the js which represents the imprint
(function () {
    var app = angular.module('saycle');


    app.controller('rankingCtrl', function ($scope, $route, rankingService) {
        var vm = this;
        vm.users = [];
        rankingService.getRankedUsers().then(function (rankedUsers) {
            vm.users = rankedUsers;
        });

    });

})();