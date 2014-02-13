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
      bower: "bower_components",
      bootstrap: "<%= dirs.bower %>/twbs-bootstrap-sass/vendor/assets",
      bootstrap_js: "<%= dirs.bootstrap %>/javascripts/bootstrap",
    },
    // Config Tasks
    init: {
      options: {
        stripBanners: true,
      },
    },
    sass: {
        options: {
            style: 'compressed',
            precision: 10,
            loadPath: "<%= dirs.bootstrap %>/stylesheets/",
        },
        dist: {
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
      bootstrap: {
        src: [
          '<%= dirs.bootstrap_js %>/transition.js',
          '<%= dirs.bootstrap_js %>/alert.js',
          '<%= dirs.bootstrap_js %>/button.js',
          '<%= dirs.bootstrap_js %>/carousel.js',
          '<%= dirs.bootstrap_js %>/collapse.js',
          '<%= dirs.bootstrap_js %>/dropdown.js',
          '<%= dirs.bootstrap_js %>/modal.js',
          '<%= dirs.bootstrap_js %>/tooltip.js',
          '<%= dirs.bootstrap_js %>/popover.js',
          '<%= dirs.bootstrap_js %>/scrollspy.js',
          '<%= dirs.bootstrap_js %>/tab.js',
          '<%= dirs.bootstrap_js %>/affix.js'
        ],
        dest:"<%= dirs.js_dist %>/bootstrap.js",
        nonull: true,
      },
    },
    copy: {
      options: {
        stripBanners:true,
      },
      holderjs: {
          src: "<%= dirs.bower %>/holderjs/holder.js",
          dest: "<%= dirs.lib %>/holderjs/holder.js",
      },
      jquery: {
          files: [{
              expand: true,
              src: "<%= dirs.bower %>/jquery/jquery*.{js,map}",
              dest: "<%= dirs.lib %>/jquery/",
              flatten:true,
              filter: "isFile",
          }],
      },
      respond: {
          files: [{
              expand: true,
              src: "<%= dirs.bower %>/respond/dest/respond.{min,src}.js",
              dest: "<%= dirs.lib %>/respond/",
              flatten:true,
              filter: "isFile",
          }],
      },
      bootstrap: {
          files: [{
              expand: true,
              src: "<%= dirs.bower %>/twbs-bootstrap-sass/vendor/assets/fonts/bootstrap/*",
              dest: "<%= dirs.lib %>/bootstrap/fonts/bootstrap/",
              flatten:true,
              filter: "isFile",
          }],
      },
    },
    uglify: {
      options: {
        stripBanners: true,
      },
      holderjs: {
          src: "<%= dirs.lib %>/holderjs/holder.js",
          dest: "<%= dirs.lib %>/holderjs/holder.min.js",
      },
      bootstrap: {
          src: "<%= dirs.js_dist %>/bootstrap.js",
          dest: "<%= dirs.js_dist %>/bootstrap.min.js",
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