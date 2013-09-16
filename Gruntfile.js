/**
 * grunt-listfiles
 * https://github.com/psyrendust/grunt-listfiles
 *
 * Copyright (c) 2013 Larry Gordon
 * Licensed under the MIT License
 */

module.exports = function (grunt) {
  'use strict';
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },
    clean: {
      test: ['tmp']
    },
    // Configuration to be run (and then tested).
    listfiles: {
      options: {
        banner: '/**\n' +
                ' * list files banner\n' +
                ' */\n' +
                '{\n' +
                '\t[',
        footer: '\t]\n' +
                '}',
        eol: 'lf',
        prefix: '\t\t\'',
        postfix: '\',',
        postfixLastLine: '\'',
        replacements: [{
          pattern: /\.min/gi,
          replacement: ''
        }, {
          pattern: /(file)(_)([\S]*?)(_)(test)/gi,
          replacement: function (match, p1, p2, p3, p4, p5, offset, string) {
            return [p1, p3, p5].join('-');
          }
        }]
      },
      test1: {
        files: {
          'tmp/output.txt': [
            'test/fixtures/**/*.*',
            '!test/fixtures/{,*/,**/}*.{scss,html,md,rb}',
            '!test/fixtures/{,*/,**/}LICENSE'
          ]
        }
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });
  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  // searchText.replace(/(:dont_touch =>\[\n)([\s\S]*?)(\t+?\])/gi, "$1$3")

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'listfiles', 'nodeunit', 'clean']);

  // For development
  grunt.registerTask('dev', ['clean', 'listfiles']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
