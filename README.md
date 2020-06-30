# OpenAPI to Slate Markdown

![CI](https://github.com/scrive/openapi2slate/workflows/CI/badge.svg)

An opinionated and Work in Progress converter from
[OpenAPI](https://www.openapis.org/specification/repo) to [Slate
Markdown](https://github.com/lord/slate).

Created for use by [Scrive](https://github.com/scrive/).

## Usage

```
openapi2slate your_api.json
```

Outputs resulting Markdown + HTML to standard output.

Command line options:

```
--validate            Validate the API using Swagger-Parser
--include-internal    By default API paths using an 'Internal' tag will be
                      hidden, this flag includes them too
```

## Our formatting choices

* We use it for http://apidocs.scrive.com/
* Dereferncing is not properly implemented, instead it tries to dereference the
  file for you and use that. YMMV.
* API paths are grouped by tags.
* A list of API paths is generated automatically.
* The 'Internal' tag acts in a special way and those API paths are not included
  by default, use `--include-internal` to include them.
* You can mark parameters with `x-internalOnly` to make them "Internal"
* API Schema works fairly OK, some features may be missing...
* We render things in Slate Markdown that fits **our** needs and
  customisations, so this may not work well for you!
