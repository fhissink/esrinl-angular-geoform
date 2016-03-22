module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      main: {
        options: {
          archive: "archive.zip"
        },
        files: [{
          src: "*",
          cwd: "dist/"
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['compress']);
};
