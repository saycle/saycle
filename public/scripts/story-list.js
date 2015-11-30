//This is the js which represents the story-list
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
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.Fusce est.Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Proin pharetra nonummy pede.Mauris et orci. Aenean nec lorem.In porttitor.Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.Mauris eget neque at sem venenatis eleifend.Ut nonummy. Fusce aliquet pede non pede.Suspendisse dapibus lorem pellentesque magna.Integer nulla. Donec blandit feugiat ligula.Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus, in lacinia nulla nisl eget sapien. Donec ut est in lectus consequat consequat.",
            content_start: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
            content_end: "Donec ut est in lectus consequat consequat.",
            isnotlocked: true

        } , 
        {
            name: "story 2",
            title: "Batman",
            id: 2,
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.Fusce est.Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Proin pharetra nonummy pede.Mauris et orci. Aenean nec lorem.In porttitor.Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc.Mauris eget neque at sem venenatis eleifend.Ut nonummy. Fusce aliquet pede non pede.Suspendisse dapibus lorem pellentesque magna.Integer nulla. Donec blandit feugiat ligula.Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus, in lacinia nulla nisl eget sapien. Donec ut est in lectus consequat consequat.",
            content_start: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ",
            content_end: "Donec ut est in lectus consequat consequat.",
            isnotlocked: false

        }
    ];
    
})();



