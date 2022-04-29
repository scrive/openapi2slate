/*
 * Renders JSON schemas into Markdown
 * These can be top-level schema or definitions inside a top-level schema
 *
 * Currently the `name` and `octothorpes` are passed around.
 *
 * Generally a schema has a `name` when it is inside another definition and
 * therefore will not define a `title`.
 *
 * Ideas for improvement:
 *
 * * Don't pass `octothorpes` around but instead a number
 *   This would mean we can do something about > level 6 headings
 *   Currently this just leads to 7 '#'s which is invalid Markdown
 *
 * * Allow greater control over rendering
 *   e.g. You might want all examples rendered "inline", or different number of
 *   spaces
 *   We should have a top-level options passed to the renderSchema function
 *
 */
var SchemaTitle = require('./schema-title.js')
var MarkdownTitle = require('./markdown-title.js')
var Example = require('./example.js')
var Validation = require('./validation.js')
var Markdown = require('markdown-it')();

module.exports = {
	render: function(schema, name, octothorpes, isTopLevel) {
		return renderSchema(schema, name, octothorpes, isTopLevel)
	}
}

function renderValue(value) {
	if (typeof value == "object" && value !== null) {
		return '<br/><code class="code-block">' + JSON.stringify(value, null, 2) + '</code>'
	} else if (Array.isArray(value) == "array") {
		return '<br /><code class="code-block">' + JSON.stringify(value, null, 1) + '</code>'
	} else {
		return '<code>' + JSON.stringify(value) + '</code>'
	}
}

function renderSchema(schema, name, octothorpes, isTopLevel, isRequired) {
  var titleText = ''
  if(isTopLevel) {
    titleText = MarkdownTitle.render(schema, name, octothorpes, isRequired)
  }
  else {
    titleText = SchemaTitle.render(schema, name, octothorpes, isRequired)
  }
  var exampleText = ''
  if(isTopLevel) {
    exampleText = Example.renderExample(schema)
  }
	var text = [
    titleText,
    exampleText,
		//SchemaTitle.render(schema, name, octothorpes, isRequired),
		['\n<div class="json-schema">'],
	]
	if (schema.description) {
		text.push( Markdown.render(schema.description) )
	}

	if (schema.const !== undefined) {
		text.push('<p>Value: ' + renderValue(schema.const) + '</p>')
	}

	if (schema.default !== undefined) {
		text.push('<p>Default: ' + renderValue(schema.default) + '</p>')
	}

	if (schema.type == 'object') {
		text = text.concat(renderObjectSchema(schema, name, 1 + octothorpes))
	} else if (schema.type == 'array') {
		text = text.concat(renderArraySchema(schema, name, 1 + octothorpes))
	} else if (schema.enum) {
		text.push('<p>The value of this property must be one of the following enum values:</p>')
		text.push('<ul>')
		text.push(schema.enum.map(function(enumItem) {
			return '<li>' + renderValue(enumItem) + '</li>'
		}).join('\n'))
		text.push('</ul>')
	} else {
		text = text.concat(renderItemsValidation(schema, 'property', 1 + octothorpes))
	}

	var restrictions = Validation.render(schema)
	if (restrictions) {
		text.push('<p>Additional restrictions:</p>')
		text.push(restrictions)
	}

	text.push(['</div>'])
	return text
}

function renderObjectSchema(schema, name, octothorpes) {
	var text = []
	if (schema.properties) {
		if (name) {
			text.push('<p>The <code>' + name + '</code> object has the following properties:</p>')
		} else {
			text.push('<p>This object has the following properties:</p>')
		}
		Object.keys(schema.properties).map(function(propertyKey) {
			var propertyIsRequired = schema.required && schema.required.indexOf(propertyKey) >= 0
			text = text.concat(renderSchema(schema.properties[propertyKey], propertyKey, octothorpes, false, propertyIsRequired))
		})
	}
	return text
}

function renderArraySchema(schema, name, octothorpes) {
	var text = []

	if (schema.items['$ref']) {
		text.push('<p>All array elements must be of the type defined by <code>' + schema.items['$ref'].substr(14) +'</code></p>')
	} else if (schema.items && schema.items.type) {
		text.push('<p>All array elements must be of type:</p>')
		text = text.concat(renderSchema(schema.items, undefined, octothorpes, false))
	} else if (schema.items) {
		text = text.concat(renderItemsValidation(schema.items, 'array', octothorpes))
	}
	return text
}

function renderItemsValidation(schema, type, octothorpes) {
	var text = []
	var validationItems = []

	var content = schema.type == "array" ? "elements" : "value";

	if (schema.allOf) {
		text.push(Markdown.render('The ' + content + ' of this ' + type + ' must match *all* of the following schemas:'))
		validationItems = schema.allOf
	} else if (schema.anyOf) {
		text.push(Markdown.render('The ' + content + ' of this ' + type + ' must match *at least one* of the following schemas:'))
		validationItems = schema.anyOf
	} else if (schema.oneOf) {
		text.push(Markdown.render('The ' + content + ' of this ' + type + ' must match *exactly one* of the following schemas:'))
		validationItems = schema.oneOf
	} else if (schema.not) {
		text.push(Markdown.render('The ' + content + ' of this ' + type + ' must *not* match the following schemas:'))
		validationItems = schema.not
	}
	if (validationItems.length > 0) {
		validationItems.forEach(function(item) {
			text = text.concat(renderSchema(item, undefined, octothorpes, false))
		})
	}
	return text
}
