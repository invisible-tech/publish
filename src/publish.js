'use strict'

const assert = require('assert')
const fileExists = require('file-exists')
const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')

const { currentBranch } = require('./helpers/index')

const run = ({ NPM_TOKEN, NPMRC_DIR = process.env.HOME } = {}) => {
  if (currentBranch() !== 'master') return undefined

  const filePath = path.resolve(NPMRC_DIR, '.npmrc')

  // Check if .npmrc file exists on given path.
  const exists = fileExists.sync(filePath)

  if (exists) {
    spawn.sync('npm', ['publish', '--access=public'], { stdio: 'inherit' })
    return true
  }

  assert(NPM_TOKEN, 'publish: NPM_TOKEN is required')
  fs.writeFileSync(filePath, `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, 'utf8')

  spawn.sync('npm', ['publish', '--access=public'], { stdio: 'inherit' })
  return true
}

module.exports = run
