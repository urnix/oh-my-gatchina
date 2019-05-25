#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

SENTRY_AUTH_TOKEN=$1
SENTRY_ORGANIZATION=$2
SENTRY_PROJECT=$3
RELEASE=$4

# TODO: check vars, but hide values in PROD mode
[ $SENTRY_AUTH_TOKEN ] && info_ "SENTRY_AUTH_TOKEN = ${SENTRY_AUTH_TOKEN}" || error "SENTRY_AUTH_TOKEN is not provided"
[ $SENTRY_ORGANIZATION ] && info_ "SENTRY_ORGANIZATION = ${SENTRY_ORGANIZATION}" || error "SENTRY_ORGANIZATION is not provided"
[ $SENTRY_PROJECT ] && info_ "SENTRY_PROJECT = ${SENTRY_PROJECT}" || error "SENTRY_PROJECT is not provided"
[ $RELEASE ] && info_ "RELEASE = ${RELEASE}" || error "RELEASE is not provided"

info "Create release in Sentry"
curl https://sentry.io/api/0/organizations/${SENTRY_ORGANIZATION}/releases/ \
  -X POST \
  -H 'Authorization: Bearer '${SENTRY_AUTH_TOKEN} \
  -H 'Content-Type: application/json' \
  -d '{"version": "'${RELEASE}'", "projects":["'${SENTRY_PROJECT}'"]}' \
  > CREATE_RELEASE_RESPONSE \
  && success "Release in Sentry has been created" \
  || error "Creation of release in Sentry has been failed. Details:\n${CREATE_RELEASE_RESPONSE}"

info "Start uploading source maps to Sentry"
info "Angular apps source maps"
FILES_ANGULAR=./firebase/hosting/**/*.map
for f in ${FILES_ANGULAR}
do
	info "Uploading angular file '$f' to Sentry"
  curl https://sentry.io/api/0/projects/${SENTRY_ORGANIZATION}/${SENTRY_PROJECT}/releases/${RELEASE}/files/ \
    -X POST \
    -H 'Authorization: Bearer '${SENTRY_AUTH_TOKEN} \
    -F file=@"$f" \
    -F name="~/${f##*/}" \
    > CREATE_RELEASE_RESPONSE \
    || error "Upload of '$f' has been failed. Details:\n${CREATE_RELEASE_RESPONSE}"
done
success "All angular source maps have been uploaded to Sentry"

info "Firebase functions source maps"
#FILES_FIREBASE=./firebase/functions/dist/firebase/functions/src/**/*.map
for f in $(find ./firebase/functions/dist/firebase/functions -name '*.map')
do
	info "Uploading firebase file '$f' to Sentry"
  curl https://sentry.io/api/0/projects/${SENTRY_ORGANIZATION}/${SENTRY_PROJECT}/releases/${RELEASE}/files/ \
    -X POST \
    -H 'Authorization: Bearer '${SENTRY_AUTH_TOKEN} \
    -F file=@"$f" \
    -F name="~/${f##*/}" \
    > CREATE_RELEASE_RESPONSE \
    || error "Upload of '$f' has been failed. Details:\n${CREATE_RELEASE_RESPONSE}"
done
success "All firebase source maps have been uploaded to Sentry"

