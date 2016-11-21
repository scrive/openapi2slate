var _ = require('lodash');

module.exports = {
  headerWithInfo : function(api, search) {
    var infoText = mkYamlHeader(api, search);
    infoText += `\n# ${api.info.title}\n\n`;
    infoText += mkInfoText(api);
    return infoText;
  }
};

function mkYamlHeader(api, search) {
  var infoObject = api.info;
  var headerText =
`---
title: ${infoObject.title}
search: ${search}
toc_footers:
  - ${infoObject.title}
  - <em>Version ${infoObject.version}</em>
  - <hr>
  - <strong>${infoObject.contact.name}</strong>
  - <em>${infoObject.license.name}</em>
  - <a href='${infoObject.contact.url}'>${infoObject.contact.url}</a>
  - <a href='mailto:${infoObject.contact.email}'>${infoObject.contact.email}</a>
---
`;
  return headerText;
}

function mkInfoText(api) {
  var infoObject = api.info;
  var infoText = '## General Information\n';
  if(infoObject.version != undefined) {
    infoText += `### Version \`${infoObject.version}\`\n\n`;
  }
  if(api.schemes != undefined) {
    infoText += '### Schemes\n';
    _.forEach(api.schemes, function(v,k) {
      infoText += '`' + v + '`\n\n';
    });
  }
  if(api.host != undefined && api.basePath != undefined) {
    infoText += '\n###Host & base path\n\n';
    infoText += `\`${api.host}${api.basePath}/\`\n\n`;
  }
  if(api.consumes != undefined) {
    infoText += '### Consumes\n';
    _.forEach(api.consumes, function(v,k) {
      infoText += '`' + v + '`\n\n';
    });
  }
  if(api.produces != undefined) {
    infoText += '### Produces\n';
    _.forEach(api.produces, function(v,k) {
      infoText += '`' + v + '`\n\n';
    });
  }
  if(infoObject.termsOfService != undefined) {
    infoText += '### Terms of Service\n\n';
    infoText += `${infoObject.termsOfService}\n\n`;
  }
  if(api.externalDocs != undefined) {
      infoText += '### External resources\n';
      infoText += `[${api.externalDocs.description}](${api.externalDocs.url})\n\n`;
  }
  if(infoObject.description != undefined) {
      infoText += `${infoObject.description}\n`;
  }

  return infoText;
}
