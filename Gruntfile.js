/// <binding ProjectOpened='default' />
module.exports = function (grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: 'pubic/scripts/*.js',
                dest: 'public/dist/js/saycle.js'
            }
        },
        watch: {
            scripts: {
                files: 'public/scripts/**/*.js',
                tasks: ['concat'],
                options: {
                    interrupt: true,
                },
            },
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s)
    grunt.registerTask('default', ['concat', 'watch']);

};