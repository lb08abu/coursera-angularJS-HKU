'use strict';  // throws more errors

module.exports = function(grunt) {
  
  // time how long grunt tasks take
  require('time-grunt')(grunt);

  // automatically load required grunt tasks (just-in-time grunt)
  require('jit-grunt')(grunt, {
    useminPrepare: "grunt-usemin"  // useminPrepare task depends on the usemin package
  });
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // use js hint to chech our code
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")  // using better formatting
      },
      
      all: {
        src: [
          "Gruntfile.js",
          "app/scripts/{,*/}*.js"
        ]
      }
    },

    useminPrepare: { // this will insert attributes into the rest of
                     // the tasks based on what it finds in app/main.html
      html: "app/menu.html",
      options: {
        dest: "dist"
      }
    },

    concat: {
      options: {
        separator: ";"
      },
      dist: {}  // dist configuration is provided by useminPrepare
    },

    uglify: {
      dist: {} // dist configuration is provided by useminPrepare
    },

    cssmin: {
      dist: {} // dist configuration is provided by useminPrepare
    },

    filerev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 20
      },
      release: { // filerev:release hashes all assets
        files: [{
          src: [
            "dist/scripts/*.js",
            "dist/styles/*.css"
          ]
        }]
      }
    },

    usemin: {
      html: ["dist/*.html"],
      css: ["dist/styles/*.css"],
      options: {
        assetsDirs: ["dist", "dist/styles"]
      }
    },

    copy: {
      dist: {
        cwd: "app",
        src: ["**", "!styles/**/*.css", "!scripts/**/*.js"],
        dest: "dist",
        expand: "true"
      },
      fonts: {
        files: [
          {  // bootstrap
            expand: true,
            dot: true,
            cwd: "bower_components/bootstrap/dist",
            src: ["fonts/*.*"],
            dest: "dist"
          },
          {  // font-awesome
            expand: true,
            dot: true,
            cwd: "bower_components/font-awesome",
            src: ["fonts/*.*"],
            dest: "dist"
          }
        ]
      }
    },

    clean: {
      build: {
        src: ["dist/"]
      }
    },

    watch: {
      copy: {
        files: ["app/**", "!app/**/*.css", "!app/**/*.js"],
        tasks: ["build"]
      },
      scripts: {
        files: ["app/scripts/app.js"],
        tasks: ["build"]
      },
      styles: {
        files: ["app/styles/mystyles.css"],
        tasks: ["build"],
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "app/{,*/}*.html",
          ".tmp/styles/{,*/}*.css",
          "app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: "localhost", // change to 0.0.0.0 to access from outside
        livereload: 35729,
      },
      dist: {
        options: {
          open: true,
          base: {
            path: "dist",
            options: {
              index: "menu.html",
              maxAge: 300000
            }
          }
        }
      }
    }

  });

  // what happens when we type `grunt build`
  grunt.registerTask('build', [
    "clean",
    "jshint",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "copy",
    "filerev",
    "usemin"
  ]);
  
  grunt.registerTask('serve', ["build", "connect:dist", "watch"]);

  grunt.registerTask('default', ["build"]);
};
