#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

: '
Examples of usage:
1. Delete single release:
# bash dev-workflow-scripts/delete-release.bash RELEASE_NUMBER SENTRY_AUTH_TOKEN

2. Delete multiple releases with bash script:
declare -a arr=(
"release1"
"release2"
"release3"
)

for item in "${arr[@]}"
do
   bash dev-workflow-scripts/delete-release.bash $item SENTRY_AUTH_TOKEN
done
'

RELEASE=${1}            # Type: string
SENTRY_AUTH_TOKEN=${2}  # Type: string

[ $RELEASE ] && info "RELEASE = ${RELEASE}" || error "RELEASE is not provided"
# TODO: check vars, but hide values in PROD mode
[ $SENTRY_AUTH_TOKEN ] && info_ "SENTRY_AUTH_TOKEN = ${SENTRY_AUTH_TOKEN}" || error "SENTRY_AUTH_TOKEN is not provided"

blockinfo "Deleting release ${RELEASE}" \
  && time curl https://sentry.io/api/0/organizations/foodrazor/releases/${RELEASE}/ \
  -X "DELETE" \
  -H 'Authorization: Bearer '${SENTRY_AUTH_TOKEN} \
  > CURL_FAILED_RESPONSE \
  && success "Release has been deleted" \
  || error "Release deletion has been failed.\n${CURL_FAILED_RESPONSE}"
