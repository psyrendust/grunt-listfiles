# grunt-listfiles [![Build Status](https://travis-ci.org/psyrendust/grunt-listfiles.png?branch=master)](https://travis-ci.org/psyrendust/grunt-listfiles)

> Create a list of files and perform an action on each file in the list then write the results to a file.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-listfiles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-listfiles');
```

*This plugin was designed to work with Grunt 0.4.x.*


## Listfiles task
_Run this task with the `grunt listfiles` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### banner
Type: `String`
Default: `null`

Prefix the destination file with the given banner, with a linebreak inbetween.

#### footer
Type: `String`
Default: `null`

Postfix the destination file with the given footer, with a prepended linebreak.

#### eol
Type: `String`
Choices: `'lf'`, `'cr'`, `'crlf'`
Default: `'lf'`

The linefeed character you would like to use for the destination file.

#### prefix
Type: `String`
Default: `null`

A prefix string to prepend to each file that is found.

#### postfix
Type: `String`
Default: `null`

A postfix string to append to each file that is found.

#### postfixLastLine
Type: `String`
Default: `null`

A postfix string to append to the last file that is found.

### Usage Examples

#### Example Config

```javascript
grunt.initConfig({
  listfiles: {
    options: {
      banner: '/**\n' +
              ' * list files banner\n' +
              ' */\n' +
              '{\n' +
              '\t[',
      footer: '\t]\n' +
              '}',
      eol: 'crlf',
      prefix: '\t\t\'',
      postfix: '\',',
      postfixLastLine: '\''
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
  }
});

grunt.loadNpmTasks('grunt-listfiles');

grunt.registerTask('default', ['listfiles']);
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2013-06-28   v0.1.0   Initial release.
