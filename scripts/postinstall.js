#!/usr/bin/env node

'use strict'

const fs = require('fs')
const yaml = require('js-yaml')
const {
  find,
  includes,
} = require('lodash/fp')

try {
  const {
    deployment: {
      release: {
        commands,
      },
    },
  } = yaml.safeLoad(fs.readFileSync('circle.yml', 'utf8'))

  const hasPublishCommand = find(includes('publish'))(commands)

  if (hasPublishCommand) console.log('publish: circle.yml has publish command.')
  else console.log('publish: circle.yml does not have publish command.')
} catch (err) {
  console.log('publish: you do not have a circle.yml file')
}



