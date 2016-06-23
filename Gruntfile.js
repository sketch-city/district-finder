module.exports = function(grunt) {



  grunt.initConfig({

    proj: {
      styles: 'app/assets/stylesheets'
    },

    bowercopy: {
  		options: { clean: true },
  		cutestrap: {
  			options: { destPrefix: '<%= proj.styles %>' },
        files: {
          'scss/cutestrap': 'cutestrap/dist/scss'
        }
  		}
  	},

    sass: {
      dist: {
        files: {
          '<%= proj.styles %>/app.css': '<%= proj.styles %>/scss/main.scss'
        }
      }
    },

    watch: {
      sass: {
        files: ['<%= proj.styles %>/scss/*.scss'],
        tasks: ['sass'],
      },
      livereload: {
        options: { livereload: true },
        files: ['app/assets/**/*', 'app/views/**/*']
      }
    }

  });


  // Enable tasks
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['bowercopy', 'sass']);
  grunt.registerTask('compile', ['sass']);
};
