#!/usr/bin/env node

'use strict'

/* eslint no-console: 0 */

const spawn = require('cross-spawn')

const { CIRCLE_BRANCH, NPM_TOKEN } = process.env

if (! NPM_TOKEN) {
  console.log('Required env var NPM_TOKEN is missing.')
  process.exit(1)
}

if (CIRCLE_BRANCH === 'master') {
  spawn('echo', [`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, '>', '~/.npmrc'])
  spawn('npm', ['publish', '--access=public'])
} else {
  console.log('This is not master, skipping...')
  process.exit(0)
}

