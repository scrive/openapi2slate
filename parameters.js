var _ = require('lodash');
var Markdown = require('markdown-it')();

module.exports = {
  parameterSection: function(parameters, hNum, includeInternal) {
    var text = _.repeat('#', hNum) + ' Parameters\n';
    text += parametersListAsTable(parameters, includeInternal);
    return text;
  }
}

function parametersListAsTable(parameters, includeInternal) {
  var htmlText = '<table class="table-left-col-25">\n';

  htmlText += '<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>\n';
  _.forEach(parameters, function(p) {
    if(p['x-internalOnly'] && !includeInternal) {
      // Skip interalOnly when not including internal only details
    }
    else {
      if(p.name != undefined) {
        htmlText += parameterObjectAsRow(p);
      }
      else {
        htmlText += referenceObjectAsRow(p);
      }
    }
  });

  htmlText += '</table>\n';
  return htmlText;
};

function referenceObjectAsRow(ref) {
  // TODO render REFs properly
  return `<tr> <td>[REF](${ref['$ref']})</td> <td></td> <td></td> <td></td> </tr>\n`;
};

/* Renders a ParameterObject inside a <tr>
 * http://swagger.io/specification/#parameterObject
 *
 * name (required) :: string
 * in (required) :: string, enum ["query", "header", "path", "formData", "body]
 * description :: string
 * required :: boolean (default = false)
 *
 * if (in == "body")
 *  schema :: SchemaObject
 * else
 *  type (required) :: string
 *  format :: string
 *  ... more things, see link above
 */
function parameterObjectAsRow(parameter) {
  var rowText = '<tr>';

  var required = 'optional';
  if(parameter.required) {
    required = 'required';
  }
  rowText += '<td>';
  rowText += `<p><code>${parameter.name}</code><br/>`;
  rowText += `<em>${required}</em></p>`;
  if(parameter.default != undefined) {
    rowText += `<p><em>default:</em> <code>${parameter.default}</code></p>`;
  }
  rowText += '</td>';

  var description = '';
  if(parameter.description != undefined) {
    description = `<div class="description">${Markdown.render(parameter.description)}</div>`;
  }

  var enumeration = '';
  if(parameter.enum) {
    enumeration += '<div class="enumeration"><strong>Enum:</strong> ';
    enumeration += parameter.enum.map(function(enumItem) {
      return `<code>${enumItem}</code>`;
    }).join(', ');
    enumeration += '</div>';
  }

  rowText += '<td>';
  rowText += description;
  rowText += enumeration;
  rowText += '</td>';

  var type = '';
  if(parameter.type != undefined) {
    type += `<p>${parameter.type}`;
    if(parameter.format != undefined) {
      type += `<br><em>${parameter.format}</em>`;
    }
    type += '</p>';
  }
  rowText += `<td>${type}</td>`;

  rowText += `<td>${parameter.in}</td>`;

  rowText += '</tr>\n';
  return rowText;
};
