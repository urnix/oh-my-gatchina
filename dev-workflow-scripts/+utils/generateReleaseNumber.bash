#!/bin/sh

echo ${CI_BUILD_NUMBER}_${CI_COMMIT_ID:0:6}
