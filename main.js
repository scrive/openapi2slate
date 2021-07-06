#!/usr/bin/env node

var program = require('commander');
var SwaggerParser = require('swagger-parser');

var openapi2slate = require('./openapi2slate.js');

program
  .arguments('<file>')
  .option('--validate', 'Validate the API')
  .option('--include-internal', 'Include Internal API calls')
  .option('--search-filter', 'Add the search filter')
  .action(function(file) {
    apiFilePath = file;
  });
program.parse(process.argv);

if(typeof apiFilePath === 'undefined') {
  console.error('No file given!');
  process.exit(1);
}

if(program.validate) {
  SwaggerParser.validate(apiFilePath)
    .then(function(api) {
      console.log(api.info.title);
    })
    .catch(function(err) {
      console.error('The API is invalid: ' + err.message);
    });
}

SwaggerParser.bundle(apiFilePath)
  .then(function(api) {
    openapi2slate.printSlateMarkdown(api, program.includeInternal, Boolean(program.searchFilter));
  })
  .catch(function(err) {
    if (typeof err === 'object') {
      if (err.message) {
        console.error('\nMessage: ' + err.message)
      }
      if (err.stack) {
        console.error('\nStacktrace:')
        console.error('====================')
        console.error(err.stack);
      }
    } else {
      console.error('dumpError :: argument is not an object');
    }
  });
