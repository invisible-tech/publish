'use strict'

const finder = require('find-package-json')
const pacote = require('pacote')
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

const pkg = finder().next().value || {}

// () => Promise[Boolean]
const hasBeenPublished = async () => {
  try {
    const { version: npmPackageVersion } = await pacote.manifest(pkg.name)
    if (npmPackageVersion === pkg.version) return true
    return false
  } catch (err) {
    console.log('assert-version-bump: This package has not been published yet.')
    process.exit(0) // eslint-disable-line unicorn/no-process-exit
  }
}

const currentBranch = () => {
  const { stdout: branch } = spawn.sync(
    'git',
    ['rev-parse', '--abbrev-ref', 'HEAD'],
    { encoding: 'utf8' }
  )
  return trim(branch)
}

const lastMergeHash = () => {
  const { stdout } = spawn.sync(
    'git',
    [
      'log',
      '--merges',
      '-1',
      '--pretty=format:%h',
    ],
    { encoding: 'utf8' }
  )
  return trim(stdout)
}

const splitLines = split('\n')

const getAdditions = flow(
  splitLines,
  filter(overEvery([
    startsWith('+'),
    negate(startsWith('++')),
  ])),
  map(trimCharsStart('+')),
  join('\n')
)

const versionHasChanged = ({ fileName }) => {
  const { stdout } = spawn.sync(
    'git',
    [
      '--no-pager',
      'diff',
      `${lastMergeHash()}..HEAD`,
      '--minimal',
      '--unified=0',
      '--no-color',
      '--',
      fileName,
    ],
    { encoding: 'utf8' }
  )

  return flow(
    getAdditions,
    splitLines,
    map(trim),
    find(startsWith('"version":'))
  )(stdout)
}

module.exports = {
  currentBranch,
  hasBeenPublished,
  lastMergeHash,
  versionHasChanged,
}
