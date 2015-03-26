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
				files: [ '<%= jshint.files %>' ],
				tasks: [ 'jshint', 'compass', 'requirejs' ]
			}
		};

		grunt.initConfig(initialConfig);
		grunt.loadNpmTasks('grunt-contrib-requirejs');
		// grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');

		grunt.registerTask('default', [ 'jshint', 'compass', 'requirejs', 'watch' ]);
	};
})();
