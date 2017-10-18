# @invisible/publish

[![CircleCI](https://circleci.com/gh/invisible-tech/publish/tree/master.svg?style=svg)](https://circleci.com/gh/invisible-tech/publish/tree/master)

Asserts a version bump and publishes your package to npm automatically.

# Install

```
yarn add -D @invisible/publish
# or
npm install -D @invisible/publish
```

# Setup

1. Add `assert-version-bump` to your package `posttest` script in `package.json`:
```json
// It would look something like:
  "scripts": {
    "posttest": "assert-version-bump"
  }
```

2. Add `NPM_TOKEN` environmental variable to your package on circleCI.

    To do this you will have to:
    
    - Go to `https://circleci.com/gh/invisible-tech/<your-package-name>/edit#env-vars` (replace \<your-package-name\>, e.g. merge-parsers)
    - Click on `Import Variable(s)`.
    - Select `NPM_TOKEN`.
      - If you don't have permission to do that, ask your superior to do it!


3. Add `publish` to the `commands` on `deployment` section of your package `circle.yml`:
```yml
# It would look something like:
deployment:
  release:
    branch: master
    commands:
      - publish
```

4. OPTIONAL: you can pass the filename as argument to assert version bump. Defaults to `package.json`
```json
"scripts": {
    "posttest": "assert-version-bump manifest.json"
  }
```

# Troubleshooting

If you are having problems, it probably is because you don't have your package `.bin` folder set on `PATH`.

```yml
machine:
  environment:
    # For yarn
    PATH: "${PATH}:${HOME}/${CIRCLE_PROJECT_REPONAME}/node_modules/.bin"
```