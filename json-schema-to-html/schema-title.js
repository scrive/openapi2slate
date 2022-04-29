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
		text.push(schema.title)
	}

	var properties = []
	if (schema.type) {
		properties.push(schema.type)
	}
	if (schema.enum) {
		properties.push('enum')
	}
	if (isRequired) {
		properties.push('required')
	}
	if (schema.readOnly) {
		properties.push('read only')
	}

	if (properties.length > 0) {
		text.push('<code>(' + properties.join(', ') + ')</code>')
	} else if (schema['$ref']) {
		text.push('(' + schema['$ref'].substr(14) + ')')
	}

	text.push('</h' + hLevel + '>\n')

	return text.join(' ')
}
