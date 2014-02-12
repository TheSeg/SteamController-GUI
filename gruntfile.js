module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    meta: {
      version: '0.0.0'
    },
    dirs: {
      js_dist: "dist/script",
      js_src: "_assets/script",
      less: "_assets/less",
      css: "dist/css",
    },
    // Config Tasks
    init: {
      options: {
        stripBanners: true,
      },
    },
    less: {
        custom: {
            options: {
                stripBanners:true,
                compress:true,
                cleancss:true,
                sourceMap:true,
                yuicompress:true,
                paths: [
                    "<%= dirs.less %>",
                ],
            },
            files: {
              "<%= dirs.css %>/main.css": "<%= dirs.less %>/main.less",
              "<%= dirs.css %>/syntax.css": "<%= dirs.less %>/syntax.less",
            },
        },
    },
    concat: {
      options: {
        stripBanners: true,
      },
    },
    copy: {
      options: {
        stripBanners:true,
      },
    },
    uglify: {
      options: {
        stripBanners: true,
      },
    },
    watch: {
      js: {
        files: [
          "<%= dirs.js_src %>/*.js"
        ],
        tasks: [ "concat:custom", "uglify:custom" ],
      },
      less: {
        files: [
          "<%= dirs.less %>/*.less",
        ],
        tasks: [ "less" ],
      },
    },
  });
  
  // Load the plugins for tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Inital Setup Task
  grunt.registerTask( 'init', [ 'init' , 'build' ] );
  
  // Build Task
  grunt.registerTask( 'build' , [ 'concat' , 'copy' , 'less' , 'uglify' ] );

  // Default task(s).
  grunt.registerTask( 'default' , ['build'] );
  
};