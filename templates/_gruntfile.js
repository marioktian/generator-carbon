module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: ['app/assets/sass/*.scss'],
            tasks: ['sass']
        },
        sass: {
            dev: {
                options:{
                    style: 'compressed'
                },
                files: {
                    'app/assets/css/main.min.css': 'app/assets/sass/main.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'app/assets/css/*.css',
                        '**/*.html',
                        'app/assets/js/*.js'
                    ]
                },
                options: {
                    watchTask: true
                }
            }
        },
        surge: {
            '<%= surge %>': {
                options: {
                    project: '',
                    domain: '<%= surge %>.surge.sh'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-surge'); 

    // define default task
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass']);
    grunt.registerTask('deploy', ['build', 'surge']);

};