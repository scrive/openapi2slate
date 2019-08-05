var _ = require('lodash');

var parameters = require('./parameters.js');
var responses = require('./responses.js');

module.exports = {
  addEndpointToPaths: function(basePath, paths) {
    return _.map(paths, function(p, ep) {
      p.endpoint = basePath + ep;
      return p;
    });
  },
  groupPathsByTag: function(paths) {
    return _.groupBy(paths, function(p) {
      var pathDetails;
      if(p.post != undefined) {
        pathDetails = p.post;
      }
      else if(p.get != undefined) {
        pathDetails = p.get;
      }
      else if(p.put != undefined) {
        pathDetails = p.put;
      }
      else if(p.delete != undefined) {
        pathDetails = p.delete;
      }
      else if(p.patch != undefined) {
        pathDetails = p.patch;
      }
      return pathDetails.tags[0];
    });
  },
  filterInternalTag: function(paths) {
    return _.filter(paths, function(p, ep) {
      var pathDetails;
      if(p.post != undefined) {
        pathDetails = p.post;
      }
      else if(p.get != undefined) {
        pathDetails = p.get;
      }
      else if(p.put != undefined) {
        pathDetails = p.put;
      }
      else if(p.delete != undefined) {
        pathDetails = p.delete;
      }
      else if(p.patch != undefined) {
        pathDetails = p.patch;
      }
      return ! _.find(pathDetails.tags, function(t) { return t == "Internal"; });
    });
  },
  sectionForGroupedEndpointPaths: function(groupedPaths, includeInternal) {
    var sectionText = '';
    _.forEach(groupedPaths, function(pathGroup, groupTag) {
      sectionText += `# ${groupTag}\n`;
      _.forEach(pathGroup, function(pathTop) {
        sectionText += pathItemObjectWithEndpointText(operationObjectText, pathTop, pathTop.endpoint, includeInternal);
      });
    });
    return sectionText;
  },
  sectionIndexOfGroupedEndpointPaths: function(groupedPaths, includeInternal) {
    var sectionText = '# List of API Calls\n';
    _.forEach(groupedPaths, function(pathGroup, groupTag) {
      sectionText += `\n## ${groupTag}\n\n`;
      _.forEach(pathGroup, function(pathTop) {
        sectionText += pathItemObjectWithEndpointText(operationObjectSnippet, pathTop, pathTop.endpoint, includeInternal);
      });
    });
    return sectionText;
  }
}

function pathItemObjectWithEndpointText(operationFunc, pio, endpoint, includeInternal) {
  var pioText = '';
  if(pio.parameters != undefined) {
    pioText += parameters.parameterSection(pio.parameters, 3, includeInternal);
  }
  if(pio.get != undefined) {
    pioText += operationFunc(pio.get, 'GET', endpoint, includeInternal);
  }
  if(pio.post != undefined) {
    pioText += operationFunc(pio.post, 'POST', endpoint, includeInternal);
  }
  // TODO put, delete, options, head, patch
  return pioText;
};

function operationObjectText(opObj, method, endpoint, includeInternal) {
  var opObjText =
`
<div><a id="${endpoint.replace(/\//g,'')}"></a></div>
## ${opObj.summary}

<p>
<strong>
<code class="operation-method operation-method-${method}">${method}  ${endpoint}</code>
</strong>
</p>

${opObj.description}
`;

  if(opObj.parameters != undefined) {
    opObjText += parameters.parameterSection(opObj.parameters, 3, includeInternal);
  }
  if(opObj.responses != undefined) {
    opObjText += responses.responsesObject(opObj.responses);
  }
  opObjText += '\n\n';

  return opObjText;
};

function operationObjectSnippet(opObj, method, endpoint, includeInternal) {
  var opObjSnippet =
`
<p>
<a href="#${endpoint.replace(/\//g,'')}">
<strong>
<code class="operation-method operation-method-${method}">${method}  ${endpoint}</code>
</strong>
</a>
</p>
`;
  return opObjSnippet;
};
