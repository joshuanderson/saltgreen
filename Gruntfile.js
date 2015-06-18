(function () {
	'use strict';


	module.exports = function (grunt) {
		require('load-grunt-tasks')(grunt);

		var initialConfig = {
			pkg: grunt.file.readJSON('package.json'),
			browserify: {
				dist: {
					options: {
						transform: [ [ "babelify", { "stage": 0 } ] ]
					},
					files: {
						"static-assets/js/app.js": "development/js/app.js"
					}
				}
			},
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
					esnext: true,
					globals: {
						console: true,
						module: true,
						document: true
					}
				}
			},
			watch: {
				files: [ 'Gruntfile.js', 'development/js/**/*.js', 'development/css/*.scss' ],
				tasks: [ 'browserify' ]
			}
		};

		grunt.initConfig(initialConfig);

		grunt.registerTask('default', [ 'browserify', 'watch' ]);
		grunt.registerTask('continuous', [ 'jshint', 'compass:dev', 'autoprefixer', 'browserify', 'watch' ]);
	};
})();
