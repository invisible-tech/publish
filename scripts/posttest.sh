#!/bin/sh

bin/assert-version-bump.js --quiet
status=$?

assert-changelog-update --quiet
status=$(( $status + $? ))

npm audit
status=$(( $status + $? ))

if [ $status -eq 0 ]
then
  exit 0
else
  exit 1
fi
