(function () {
    var app = angular.module('saycle');
    
    app.service('socketService', function () {
        var socket = io();
        // socket.emit, socket.on can be called on the socket object
        return socket;
    });
})();
