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
	var text = octothorpes > 5 ? [ '#####', ' ' ] : [ _.repeat('#', octothorpes), ' ' ]
	if (name) {
		text.push('`' + name + '` ')
	} else if (schema.title) {
		text.push(schema.title + '\n')
	}
	if (schema.type) {
		if (schema.title) {
			text.push('`')
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
			text.push('`')
		}
	} else if (schema['$ref']) {
		text.push('(' + schema['$ref'].substr(14) + ')')
	}
	return text.join('')
}
