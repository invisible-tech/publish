#!/usr/bin/env node

'use strict'

const assert = require('assert')
const { argv } = require('yargs')
  .boolean(['quiet'])
  .alias('quiet', 'q')

const assertVersionBump = require('../src/assertVersionBump.js')

assertVersionBump({ fileName: argv._[0] })
  .then(({ pass, msg } = {}) => {
    assert(pass !== undefined)
    if (msg && ! argv.quiet) console.log(`assert-version-bump: ${msg}`)
    if (pass) return process.exit(0)
    return process.exit(1)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
