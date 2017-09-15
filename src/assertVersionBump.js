#!/usr/bin/env node

'use strict'

/* eslint no-console: 0 */

require('dotenv').config()
const spawn = require('cross-spawn')
const logger = require('@invisible/logger')

const {
  filter,
  flow,
  head,
  join,
  last,
  map,
  negate,
  overEvery,
  split,
  startsWith,
  trim,
  trimCharsStart,
} = require('lodash/fp')

if (process.env.CIRCLE_BRANCH === 'master') {
  logger.info('This is master, skipping.')
  process.exit(0)
}

const { stdout: testPackage } = spawn.sync('git', ['diff', '--name-only', 'origin/master...HEAD', '--', 'package.json'])
if (! testPackage) {
  logger.warn('This PR is missing a version bump in package.json')
  process.exit(1)
}

const { stdout: log } = spawn.sync('git', ['--no-pager', 'log', '--merges', '-1', '--minimal', '--unified=0'])
const splitLines = split('\n')
const getLastMergeHash = flow(
  splitLines,
  filter(startsWith('commit')),
  last,
  split(' '),
  last
)
const lastMergeHash = getLastMergeHash(log)

const { stdout: diff } = spawn.sync('git', ['--no-pager', 'diff', `${lastMergeHash}..HEAD`, '--minimal', '--unified=0', '--no-color', '--', 'package.json'])
const getAdditions = flow(
  split('\n'),
  filter(overEvery([
    startsWith('+'),
    negate(startsWith('++')),
  ])),
  map(trimCharsStart('+')),
  join('\n')
)
const additionsText = getAdditions(diff)

const searchVersionChange = flow(
  split('\n'),
  map(trim),
  filter(startsWith('"version":')),
  head,
)
const version = searchVersionChange(additionsText)

if (! version) {
  logger.warn('This PR is missing a version bump in package.json')
  process.exit(1)
} else {
  process.exit(0)
}
