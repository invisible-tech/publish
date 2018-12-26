'use strict'

const {
  currentBranch,
  hasBeenPublished,
  lastMergeHash,
  versionHasChanged,
} = require('./helpers')

const run = async ({ fileName = 'package.json' } = {}) => {
  if (currentBranch() === 'master') {
    return {
      pass: true,
      msg: 'This is master, skipping.',
    }
  }

  if (! versionHasChanged({ fileName })) {
    return {
      pass: false,
      msg: `no version bump since ${lastMergeHash()}`,
    }
  }

  // If the filename is not package.json, the asserted version is not from a package and thus,
  // should not be checked on npm.
  if (fileName === 'package.json' && await hasBeenPublished()) {
    return {
      pass: false,
      msg: 'This package version has already been published to npm.',
    }
  }

  return {
    pass: true,
    msg: 'new version found.',
  }
}

module.exports = run
