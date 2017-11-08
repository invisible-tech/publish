# @invisible/publish

[![CircleCI](https://circleci.com/gh/invisible-tech/publish/tree/master.svg?style=svg)](https://circleci.com/gh/invisible-tech/publish/tree/master)

Asserts a version bump and publishes your package to npm automatically.

## Install

```
yarn add -D @invisible/publish
# or
npm install -D @invisible/publish
```

## Usage

### Programmatically

```javascript
'use strict'

const {
  assertVersionBump,
  publish
} = require('@invisible/publish')

// fileName defaults to 'package.json' if no argument given.
// This method will throw if no addition has been made to 'fileName' since
// the last merge commit
assertVersionBump({ fileName: 'package.json' })

// NPMRC_DIR defaults to 'process.env.HOME' if no argument given.
const { NPM_TOKEN, NPMRC_DIR } = process.env

publish({ NPM_TOKEN, NPMRC_DIR })
```

### Hook Scripts
#### assert-version-bump

Add `assert-version-bump` to your package `posttest` script in `package.json`:
```json
// It would look something like:
  "scripts": {
    "posttest": "assert-version-bump"
  }
```

You can also run it at any time from your CLI.
```bash
$ assert-version-bump # will output the change if found
$ assert-version-bump --quiet # will silently succeed, but output error if not found
```

- OPTIONAL: you can pass the filename as argument to assert version bump. Defaults to `package.json`
```json
"scripts": {
    "posttest": "assert-version-bump manifest.json"
  }
```

#### publish
- Add `publish` to the `commands` on `deployment` section of your package `circle.yml`:
```yaml
# It would look something like:
deployment:
  release:
    branch: master
    commands:
      - publish
```
`NPM_TOKEN` environmental variable is required for publishing. See [Miscellaneous Information](#miscellaneous-information) to know options on how to add it.

You can also run it at any time from your CLI. Just make sure you are on `master` branch and have a `~/.npmrc` file with a valid token.
```bash
$ publish
$ publish --quiet # will silently succeed, but output error.
```

# Miscellaneous Information

- Add `NPM_TOKEN` environmental variable to your package on circleCI.

    To do this you will have to:
    
    - Go to `https://circleci.com/gh/invisible-tech/<your-package-name>/edit#env-vars` (replace \<your-package-name\>, e.g. merge-parsers)
    - Click on `Import Variable(s)`.
    - Select `NPM_TOKEN`.
      - If you don't have permission to do that, ask your superior to do it!

- You can add `NPM_TOKEN` to your `.env` file and install `dotenv` as dependency/devDependency.

# Troubleshooting

If you are having problems, it probably is because you don't have your package `.bin` folder set on `PATH`.

```yml
machine:
  environment:
    # For yarn
    PATH: "${PATH}:${HOME}/${CIRCLE_PROJECT_REPONAME}/node_modules/.bin"
```

# LICENSE
MIT
