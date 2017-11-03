'use strict'

const assert = require('assert')

const {
  currentBranch,
  lastVersionChange,
  lastMergeHash,
} = require('./helpers/index.js')

const run = ({ fileName = 'package.json' }) => {
  if (currentBranch() === 'master') return undefined
  const newVersion = lastVersionChange({ fileName })
  assert(newVersion, `assert-version-bump: no version bump since ${lastMergeHash()}`)
  return newVersion
}

module.exports = run
