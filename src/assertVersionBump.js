#!/usr/bin/env node

'use strict'

/* eslint no-console: 0 */

const spawn = require('cross-spawn')

const {
  filter,
  find,
  flow,
  join,
  map,
  negate,
  overEvery,
  split,
  startsWith,
  trim,
  trimCharsStart,
} = require('lodash/fp')

const { CIRCLE_BRANCH } = process.env

if (CIRCLE_BRANCH === 'master') {
  console.log('This is master, skipping.')
  process.exit(0)
}

const { stdout: testPackage } = spawn.sync('git', [
  'diff',
  '--name-only',
  'origin/master...HEAD',
  '--',
  'package.json',
])

const { stdout: lastMergeHash } = spawn.sync('git', [
  'log',
  '--merges',
  '-1',
  '--pretty=format:%h',
])
const splitLines = split('\n')

const { stdout: diff } = spawn.sync('git', [
  '--no-pager',
  'diff',
  `${lastMergeHash}..HEAD`,
  '--minimal',
  '--unified=0',
  '--no-color',
  '--',
  'package.json',
])

const getAdditions = flow(
  splitLines,
  filter(overEvery([
    startsWith('+'),
    negate(startsWith('++')),
  ])),
  map(trimCharsStart('+')),
  join('\n')
)
const additionsText = getAdditions(diff)

const searchVersionChange = flow(
  splitLines,
  map(trim),
  find(startsWith('"version":'))
)
const version = searchVersionChange(additionsText)

if (! version || ! testPackage) {
  console.log('This PR is missing a version bump in package.json')
  process.exit(1)
} else {
  process.exit(0)
}
