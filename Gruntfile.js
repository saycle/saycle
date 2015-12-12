/// <binding ProjectOpened='default' />
module.exports = function (grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat_sourcemap: {
            js: {
                src: ['public/scripts/*.js'],
                dest: 'public/dist/js/saycle.js'
            }
        },
        watch: {
            scripts: {
                files: 'public/scripts/**/*.js',
                tasks: ['concat_sourcemap'],
                options: {
                    interrupt: true,
                },
            },
        }
    });
    
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s)
    grunt.registerTask('default', ['concat_sourcemap', 'watch']);

};