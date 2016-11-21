var _ = require('lodash');
var Markdown = require('markdown-it')();
var schema2html = require('./json-schema-to-html/index.js');

module.exports = {
  responsesObject: function(responses) {
    var text = responsesHeader();
    _.forEach(responses, function(resp, code) {
      text += eachResponseWithCode(resp, code);
    });
    text += responsesFooter();
    return text;
  },
  responsesSection: function(responses, hNum) {
    var responsesText = _.repeat('#', hNum) + ' Responses\n';
    _.forEach(responses, function(resp, code) {
      responsesText += _.repeat('#', hNum+1) + ' ' + code + '\n';
      responsesText += resp.description + '\n\n';
      if(resp.schema != undefined) {
        responsesText += schema2html(resp.schema, hNum + 2) + '\n\n';
      }
    });
    return responsesText;
  }
};

function responsesHeader() {
  var headerText =
`
### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
`;
  return headerText;
};

function eachResponseWithCode(response, code) {
  var responseText = '';
  // if response is a Response Object
  if(response.description != undefined) {
    var description = Markdown.render(response.description);
    responseText += `<tr> <td>${code}</td> <td>${description}</td> </tr>\n`;
  }
  // else response is a $ref
  // FIXME render $ref properly, not using them currently!
  else {
    responseText += `<tr> <td>${code}</td> <td>[REF](${response['$ref']})</td> </tr>\n`;
  }
  return responseText;
};

function responsesFooter() {
  return '</table>\n';
}
