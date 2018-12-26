#!/usr/bin/env node

'use strict'

const { argv } = require('yargs')
  .boolean(['quiet'])
  .alias('quiet', 'q')

const publish = require('../src/publish')

try {
  const dotenv = require('dotenv')
  dotenv.config()
} catch (err) {
  // dotenv is optional dependency, don't throw if it's not installed
}

const { NPM_TOKEN, NPMRC_DIR } = process.env

try {
  const { pass, msg } = publish({ NPM_TOKEN, NPMRC_DIR })
  if (msg && ! argv.quiet) console.log(`publish: ${msg}`)
  if (pass) process.exit(0)
  process.exit(1)
} catch (err) {
  console.log(err.message)
  process.exit(1)
}
