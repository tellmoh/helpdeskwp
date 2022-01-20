module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/assets/dist/css/login.css': 'src/assets/src/css/login.scss',
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'src/assets/dist/js/login.js': ['src/assets/src/js/login.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'uglify']);
};