module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
  				mangle: false
			},
			dist: {
				files: {
					'tagalizer.min.js': ['tagalizer.js'],
				}
			}
		},
		cssmin: { //https://github.com/gruntjs/grunt-contrib-cssmin
			default: {
				files: {
					'tagalizer.min.css': ['tagalizer.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify', 'cssmin']);
};
