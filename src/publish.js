#!/usr/bin/env node

'use strict'

/* eslint no-console: 0 */

const spawn = require('cross-spawn')
const {
  isNull,
} = require('lodash/fp')

const { CIRCLE_BRANCH, NPM_TOKEN } = process.env

if (! NPM_TOKEN) {
  console.log('Required env var NPM_TOKEN is missing.')
  process.exit(1)
}

const logErrorAndExit = err => {
  console.log(err)
  process.exit(1)
}
if (CIRCLE_BRANCH === 'master') {
  const { error: npmrcError } = spawn.sync('echo', [`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, '>', '~/.npmrc'])
  if (! isNull(npmrcError)) logErrorAndExit(npmrcError)

  const { stdout, error: publishError } = spawn.sync('npm', ['publish', '--access=public'])
  if (! isNull(publishError)) logErrorAndExit(publishError)
  console.log(stdout)
} else {
  console.log('This is not master, skipping...')
  process.exit(0)
}

