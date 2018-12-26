'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const fileExists = require('file-exists')
const spawn = require('cross-spawn')

const {
  currentBranch,
} = require('./helpers')

const run = ({ NPM_TOKEN, NPMRC_DIR = process.env.HOME } = {}) => {
  if (currentBranch() !== 'master') {
    return {
      pass: true,
      msg: 'Not on master branch, skipping.',
    }
  }

  const filePath = path.resolve(NPMRC_DIR, '.npmrc')

  // Check if .npmrc file exists on given path.
  const exists = fileExists.sync(filePath)

  if (! exists) {
    assert(NPM_TOKEN, 'publish: NPM_TOKEN is required')
    fs.writeFileSync(filePath, `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, 'utf8')
  }

  const { error } = spawn.sync('npm', ['publish', '--access=public'], { stdio: 'inherit' })
  if (error) {
    return {
      pass: false,
      msg: error.message,
    }
  }

  return {
    pass: true,
    msg: 'new version published to npm.',
  }
}

module.exports = run
