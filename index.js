'use strict'

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

const lastVersionChange = () => {
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
      'package.json',
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
  lastVersionChange,
  lastMergeHash,
}
