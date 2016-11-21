var Schema = require('./schema.js')

module.exports = function(schema, headerLevel) {

	var text = []
	var hlevel = headerLevel >= 1 ? headerLevel : 1

	text = text.concat(Schema.render(schema, undefined, hlevel, true))

	if (schema.definitions) {
		text.push('<h' + hlevel + '> Sub Schemas</h' + hlevel + '>')
		text.push('<p>The schema defines the following additional types:</p>')
		Object.keys(schema.definitions).forEach(function(subSchemaName) {
			text = text.concat(Schema.render(schema.definitions[subSchemaName], subSchemaName, hlevel + 1))
		})
	}

	return text.filter(function(line) {
		return !!line
	}).join('\n\n')
}
