#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

APP=$1 # could be "eatery" or "clearing"
[ -z $APP ] && error "APP is not provided"

APP_UPP=`echo ${APP:0:1} | tr '[a-z]' '[A-Z]'`${APP:1} # CAPITALIZE FIRST LETTER

CONFIG_ENVIRONMENT=$2 # could be "prod" or "qa" or "e2e"
[ -z $CONFIG_ENVIRONMENT ] && error "CONFIG_ENVIRONMENT is not provided"

  info "Creating Angular ${APP_UPP} 'environment.prod.ts' file" \
    && time ts-node dev-workflow-scripts/src/configs/generate-angular-configs-runner.ts $APP $CONFIG_ENVIRONMENT \
    && success "Angular ${APP_UPP} file 'environment.prod.ts' has been created" \
    || error "Creation of Angular ${APP_UPP}  'environment.prod.ts' file has been failed"

info "Building Angular ${APP_UPP}"
yarn build:$APP --source-map

[ $? = 0 ] && success "Angular ${APP_UPP} has been built" || error "Angular ${APP_UPP} build has been
failed"
