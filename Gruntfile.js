module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [{
                    src: '*',
                    cwd: 'dist/'
                }]
            }
        },
        jshint: {
            src: 'src/js/**',
            options: {
                ignores: ['src/js/ng/*.js']
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            files: ['src/**'],
            tasks: ['jshint'],
        },
        connect: {
            server: {
                options: {
                    port: 8081,
                    base: "src/",
                    livereload: true
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['compress']);
    grunt.registerTask('start-server', ['connect:server', 'watch'])
};
