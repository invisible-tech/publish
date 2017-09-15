#!/usr/bin/env node

'use strict'

/* eslint no-console: 0 */

require('dotenv').config()
const logger = require('@invisible/logger')
const spawn = require('cross-spawn')

const { NPM_TOKEN } = process.env

if (! NPM_TOKEN) {
  logger.warn('Required env var NPM_TOKEN is missing. Skipping for now.')
  process.exit(1)
}

if (process.env.CIRCLE_BRANCH === 'master') {
  spawn('echo', [`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, '>', '~/.npmrc'])
  spawn('npm', ['publish'])
} else {
  logger.info('This is not master, skipping...')
  process.exit(0)
}

