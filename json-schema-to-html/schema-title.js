var _ = require('lodash');
/*
 * Renders the titles for each schema
 */
module.exports = {
	render: function(schema, name, octothorpes, isRequired) {
		return renderTitle(schema, name, octothorpes, isRequired)
	}
}

function renderTitle(schema, name, octothorpes, isRequired) {
	// TODO either split this for HTML / Markdown, or make it work
	// Problem is Slate wants <h2> outside our <div> to have proper sidebar
	// but we want to generate titles consistently
  var hLevel = octothorpes > 6 ? 6 : octothorpes
	//var text = octothorpes > 6 ? [ '<h6>' ] : [ '<h' + octothorpes + '>' ]
	var text = [ '<h' + hLevel + '>' ]
	if (name) {
		text.push('<code>' + name + '</code> ')
	} else if (schema.title) {
		text.push(schema.title + '</h' + hLevel + '>\n')
	}
	if (schema.type) {
		if (schema.title) {
			text.push('<code>')
		}
		text.push('(')
		text.push(schema.type)
		if (schema.enum) {
			text.push(', enum')
		}
		if (isRequired) {
			text.push(', required')
		}
		if (schema.readOnly) {
			text.push(', read only')
		}
		text.push(')')
		if (schema.title) {
			text.push('</code>')
		}
	} else if (schema['$ref']) {
		text.push('(' + schema['$ref'].substr(14) + ')')
	}
  if (name || !schema.title) {
    text.push('</h' + hLevel + '>')
  }
	return text.join('')
}
