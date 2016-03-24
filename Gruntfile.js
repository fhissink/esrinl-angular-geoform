module.exports = function(grunt) {
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['compress']);
};
