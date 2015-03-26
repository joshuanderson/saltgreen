(function () {
	'use strict';

	module.exports = function (grunt) {
		var initialConfig = {
			pkg: grunt.file.readJSON('package.json'),
			requirejs: {
				compile: {
					options: {
						appDir: 'development/js',
						baseUrl: './',
						dir: 'static-assets/js',
						optimize: 'uglify2',
						preserveLicenseComments: false,
						skipDirOptimize: false,
					}
				}
			},
			autoprefixer: {
				dist: {
					files: {
						'static-assets/css/animation.css': 'static-assets/css/animation.css',
						'static-assets/css/responsive.css': 'static-assets/css/responsive.css',
						'static-assets/css/style.css': 'static-assets/css/style.css'
					}
				}
			},
			compass: {
				options: {
					basePath: '',
					force: true,
					noLineComments: true,
					outputStyle: 'compressed',
					trace: true,
					sassDir: 'development/css',
					cssDir: 'static-assets/css',
					specify: 'development/css/*.scss'
				},
				dev: {}
			},
			jshint: {
				files: [ 'Gruntfile.js', 'development/js/**/*.js' ],
				options: {
					globals: {
						console: true,
						module: true,
						document: true
					}
				}
			},
			watch: {
				files: [ 'Gruntfile.js', 'development/js/**/*.js', 'development/css/*.scss' ],
				tasks: [ 'jshint', 'compass:dev', 'requirejs', 'autoprefixer' ]
			}
		};

		grunt.initConfig(initialConfig);
		grunt.loadNpmTasks('grunt-contrib-requirejs');
		// grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-autoprefixer');

		grunt.registerTask('default', [ 'jshint', 'compass:dev', 'requirejs', 'autoprefixer', 'watch' ]);
	};
})();
