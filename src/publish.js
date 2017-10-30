'use strict'

const fs = require('fs')
const spawn = require('cross-spawn')

const { currentBranch } = require('./helpers/index')

const run = ({ NPM_TOKEN, NPMRC_DIR = process.env.HOME }) => {
  if (currentBranch() !== 'master') return undefined

  fs.writeFileSync(`${NPMRC_DIR}/.npmrc`, `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`, 'utf8')

  spawn.sync('npm', ['publish', '--access=public'], { stdio: 'inherit' })
  return true
}

module.exports = run
