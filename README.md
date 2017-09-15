# @invisible/publish

# Install

```
yarn add -D @invisible/publish
# or
npm install -D @invisible/publish
```

# Setup

1. Add `assert-version-bump && publish` to your project `posttest` script in `package.json`:
```json
// It would look something like:
  "posttest": "assert-version-bump && publish",
```

2. Add `NPM_TOKEN` environmental variable to your project `.env`
```
NPM_TOKEN=dummy
```

3. Add `NPM_TOKEN` environmental variable to your project on circleCI.

    To do this you will have to:
    
    - Go to `https://circleci.com/gh/invisible-tech/<your-project-name>/edit#env-vars` (replace \<your-project-name\>, e.g. gear)
    - Click on `Import Variable(s)`.
    - Select `NPM_TOKEN`.
      - If you don't have permission to do that, ask your superior to do it!
