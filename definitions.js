var _ = require('lodash');
var schema2html = require('./json-schema-to-html/index.js');

module.exports = {
  definitionsObject: function(definitions) {
    var definitionsText = '# Definitions\n\n';
    _.forEach(definitions, function(schema, name) {
      definitionsText += schema2html(schema, 2) + '\n\n';
    });
    return definitionsText;
  }
};
