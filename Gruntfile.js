module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/assets/dist/css/login.css': 'src/assets/src/css/login.scss',
                    'src/assets/dist/css/archive.css': 'src/assets/src/css/archive.scss',
                    'src/assets/dist/css/single.css': 'src/assets/src/css/single.scss',
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'src/assets/dist/js/login.js': ['src/assets/src/js/login.js'],
                    'src/assets/dist/js/docs.js': ['src/assets/src/js/docs.js']
                }
            }
        },
        watch: {
            css: {
                files: 'src/assets/src/css/*.scss',
                tasks: ['sass'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify']);
};