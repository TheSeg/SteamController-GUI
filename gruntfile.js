module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    meta: {
      version: '0.0.0'
    },
    dirs: {
      js_src: "_assets/script",
      images: "_assets/images",
      style: "_assets/style",
      css: "dist/css",
      js_dist: "dist/script",
      img_dist: "dist/images",
      lib: "dist/library",
    },
    // Config Tasks
    init: {
      options: {
        stripBanners: true,
      },
    },
    sass: {
        dist: {
            options: {
                style: 'compressed',
            },
            files: {
              "<%= dirs.css %>/main.css": "<%= dirs.style %>/main.scss",
              "<%= dirs.css %>/syntax.css": "<%= dirs.style %>/syntax.scss",
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
    jekyll: {
        options: {
            bundleExec: true,
            config: '_config.yml',
            raw: 'baseurl: .\n'
        },
        dist: {
            dest:"_site/",
        },
    },
    connect: {
        server: {
            options: {
                port:4000,
                base:"./_site",
                keepalive:true,
            },
        },
    },
    watch: {
      js: {
        files: [
          "<%= dirs.js_src %>/*.js"
        ],
        tasks: [ "concat:custom", "uglify:custom", "jekyll" ],
      },
      sass: {
        files: [
          "<%= dirs.style %>/*.scss",
          "<%= dirs.style %>/*.sass",
        ],
        tasks: [ "sass", "jekyll" ],
      },
      jekyll: {
          files: [
              "*.html",
              "_config.yml",
          ],
          tasks: [ "jekyll" ],
      },
    },
  });
  
  // Load the plugins for tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');
  
  // Inital Setup Task
  grunt.registerTask( 'init', [ 'init' , 'build' ] );
  
  // Build Task
  grunt.registerTask( 'build' , [ 'concat' , 'copy' , 'sass' , 'uglify', 'jekyll' ] );

  // Server Task
  grunt.registerTask( 'server' , [ 'build', 'connect' ] );

  // Default task(s).
  grunt.registerTask( 'default' , ['build'] );
  
};