(function () {
	'use strict';
	module.exports = function (grunt) {
		var rjsConfig = {
			appDir: 'development',
			baseUrl: './',
			dir: 'static-assets',
			optimize: 'uglify2',
			optimizeCss: 'none',
			preserveLicenseComments: false,
			skipDirOptimize: false,
		};
		var initialConfig = {
			pkg: grunt.file.readJSON('package.json'),

			requirejs: {
				compile: {
					options: rjsConfig
				}
			},

			copy: {
				manifestFiles: {
					expand: true,
					cwd: 'development',
					src: [
						'require.json',
						'component.json'
					],
					dest: 'static-assets'
				}
			},

			compass: {
				options: {
					basePath: '',
					outputStyle: 'expanded',
					trace: true,
					sassDir: 'development/css',
					cssDir: 'static-assets/css',
					specify: 'development/css/*.scss'
				},
				dev: {},
				dist: {
					options: {
						trace: false
					}
				}
			},
			concat: {
				options: {
					separator: ';'
				},
				dist: {
					src: [ 'development/js/**/*.js' ],
					dest: 'static-assets/js/'
				}
			},
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				dist: {
					files: {
						'static-assets/js/<%= pkg.name %>.min.js': [ '<%= concat.dist.dest %>' ]
					}
				}
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
				tasks: [ 'jshint' ]
			}
		};
		grunt.initConfig(initialConfig);
		grunt.loadNpmTasks('grunt-contrib-requirejs');
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');

		grunt.registerTask('default', [ 'jshint', 'compass', 'requirejs' ]);
	};
})();
