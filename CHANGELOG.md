# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1]
- Change description of arrays, so that instead of saying:

  > The value of this array must match *at least one* of the following schemas

  the description will say:

  > Each element of this array must match *at least one* of the following
  > schemas

## [1.3.0] - 2020-05-02
- Add support for `const` schema attribute
- Fixed inconsistent schema titles

## [1.2.0] - 2021-07-07
- Add the search filter parameter

## [1.1.0] - unreleased
- Add enumeration values to parameter description.

## [1.0.1] - 2019-08-05
### Fixed
- Fix TypeError when a path only has methods other than POST and GET.

## [1.0.0] - Approx. 2016-12-21
- Initial version
