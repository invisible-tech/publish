# Announcements
> All notable changes to this project will be documented in this file.

## [2.0.2] - 2018-07-09
### Internal
  - Update CircleCI to version 2

## [2.0.1] - 2018-02-20
### Internal
  - Update pacote dependency.
  - Add Known Issues to README

[2.0.1]: https://github.com/invisible-tech/merge-parsers/compare/v2.0.0...v2.0.1

## [2.0.0] - 2017-10-24
### Feat
  - Make assertVersionBump check current version on npm.
  - Refact: programatically usage.

### Breaking Changes
  - Programatically `assertVersionBump` does not throw anymore, otherwise it returns a promise of an object with `pass` and `msg` as keys.
  - Programatically `publish` does not return a boolean anymore, otherwise it returns an object with `pass` and `msg` as keys.

[2.0.0]: https://github.com/invisible-tech/merge-parsers/compare/v1.3.0...v2.0.0

## [1.3.1] - 2017-11-02
### Chore
  - Check if `.npmrc` is present and if true, do not overwrite.

[1.3.1]: https://github.com/invisible-tech/merge-parsers/compare/v1.3.0...v1.3.1

## [1.3.0] - 2017-10-26
### Feat
  - Export assertVersionBump and publish for programatically usage.
  - Optionally loads dotenv if it is present.

[1.3.0]: https://github.com/invisible-tech/merge-parsers/compare/v1.2.0...v1.3.0

## [1.2.0] - 2017-10-25
### Feat
  - Add currentBranch method.
  - Removed unused file.

[1.2.0]: https://github.com/invisible-tech/merge-parsers/compare/v1.1.9...v1.2.0

## [1.1.9] - 2017-10-18
### Refact
  - Removed unused dependencies
  - Use `changelog-update` package.

[1.1.9]: https://github.com/invisible-tech/merge-parsers/compare/v1.1.8...v1.1.9
