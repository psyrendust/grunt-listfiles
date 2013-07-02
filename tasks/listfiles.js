/**
 * grunt-listfiles
 * https://github.com/psyrendust/grunt-listfiles
 *
 * Copyright (c) 2013 Larry Gordon
 * Licensed under the MIT License
 */

module.exports = function (grunt) {
  'use strict';

  function lineEnding(file, eol) {
    var linefeed = '\n';
    if (eol === 'cr') {
      linefeed = '\r';
    }
    else if (eol === 'crlf') {
      linefeed = '\r\n';
    }
    return file.replace(/\r\n|\n|\r/gi, linefeed);
  }

  // Create a list of files and perform an action on each file in the list then write the results to a file
  grunt.registerMultiTask('listfiles', 'Create a list of files and perform an action on each file in the list then write the results to a file', function () {
    // Tell Grunt this task is asynchronous.
    var done = this.async();
    var list = [];
    var options = this.options({
      banner: '',
      footer: '',
      eol: 'lf',
      prefix: '\'',
      postfix: '\'',
      postfixLastLine: '\''
    });

    grunt.verbose.writeflags(options, 'Options');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // Add prefix and postfix to each line
      var i,
          l = src.length,
          last = l-1,
          output = '';
      for (i=0; i<l; i++) {
        src[i] = options.prefix + src[i] + ((i === last) ? options.postfixLastLine : options.postfix + '\n');
      }
      if (options.banner.length > 0) {
        src.unshift(options.banner + '\n');
      }
      if (options.footer.length > 0) {
        src.push('\n' + options.footer);
      }
      output = lineEnding(src.join(''), options.eol);
      grunt.file.write(f.dest, output);
      grunt.log.ok(l + ' file' + (l === 1 ? '' : 's') + ' processed.');
      grunt.log.ok('Created file ' + f.dest);
    });

    // Tell grunt the async task is complete
    done();
  });

};