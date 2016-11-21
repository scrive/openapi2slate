var _ = require('lodash');
var RefParser = require('json-schema-ref-parser');

var info = require('./info.js');
var responses = require('./responses.js');
var definitions = require('./definitions.js');
var paths = require('./paths.js');

module.exports = {
  printSlateMarkdown: function(api, includeInternal) {
    RefParser.dereference(api)
      .then(function(deRefApi) {
        // Info Section
        console.log(info.headerWithInfo(api, false));
        // Paths from dereferenced API
        var epPaths = paths.addEndpointToPaths(deRefApi.basePath, deRefApi.paths);
        if(!includeInternal) {
          epPaths = paths.filterInternalTag(epPaths);
        }
        var groupedEpPaths = paths.groupPathsByTag(epPaths);
        console.log(paths.sectionIndexOfGroupedEndpointPaths(groupedEpPaths, includeInternal));
        console.log(paths.sectionForGroupedEndpointPaths(groupedEpPaths, includeInternal));
        // Responses + Definitions
        console.log(responses.responsesSection(api.responses, 1));
        console.log(definitions.definitionsObject(api.definitions));
      })
      .catch(function(err) {
        console.error('API dereference failed: ' + err);
      });
  }
};
