#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

ENVIRONMENT_TYPE=$1 # could be "prod" or "qa" or "e2e"
[ -z $ENVIRONMENT_TYPE ] && error "ENVIRONMENT_TYPE is not provided"

ENVIRONMENT_TYPE_UPP=$(echo $ENVIRONMENT_TYPE | tr a-z A-Z) # UPPER CASE
INST="INST_QA"
if [ "$ENVIRONMENT_TYPE_UPP" = "PROD" ]; then
  INST="INST_PROD"
fi

WEBSITE_BASEURL=${ENVIRONMENT_TYPE_UPP}_WEBSITE_BASEURL
SENTRY_AUTH_TOKEN=${ENVIRONMENT_TYPE_UPP}_SENTRY_AUTH_TOKEN
SENTRY_PROJECT=${ENVIRONMENT_TYPE_UPP}_SENTRY_PROJECT
SENTRY_DSN=${ENVIRONMENT_TYPE_UPP}_SENTRY_DSN
EATERY_BASEURL=${ENVIRONMENT_TYPE_UPP}_EATERY_BASEURL
CLEARING_BASEURL=${ENVIRONMENT_TYPE_UPP}_CLEARING_BASEURL
FIREBASE_TOKEN=${ENVIRONMENT_TYPE_UPP}_FIREBASE_TOKEN
FIREBASE_PROJECT_NAME=${ENVIRONMENT_TYPE_UPP}_FIREBASE_PROJECT_NAME
CRON_KEY=${ENVIRONMENT_TYPE_UPP}_CRON_KEY
WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL=${ENVIRONMENT_TYPE_UPP}_WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL
HOSTING_ALIAS_EATERY=${ENVIRONMENT_TYPE_UPP}_HOSTING_ALIAS_EATERY
HOSTING_ALIAS_CLEARING=${ENVIRONMENT_TYPE_UPP}_HOSTING_ALIAS_CLEARING
HOSTING_ALIAS_WEBSITE=${ENVIRONMENT_TYPE_UPP}_HOSTING_ALIAS_WEBSITE
SQL_MICROSERVICE_URL=${ENVIRONMENT_TYPE_UPP}_SQL_MICROSERVICE_SERVICE_URL
SQL_MICROSERVICE_SERVICE_SECRETKEY=${ENVIRONMENT_TYPE_UPP}_SQL_MICROSERVICE_SERVICE_SECRETKEY
GAE_INSTANCE_NAME=${INST}_GAE_INSTANCE_NAME
SENDGRID_SECRETKEY=${ENVIRONMENT_TYPE_UPP}_SENDGRID_SECRETKEY
XERO_APP_TYPE=${ENVIRONMENT_TYPE_UPP}_XERO_APP_TYPE
XERO_CONSUMER_KEY=${ENVIRONMENT_TYPE_UPP}_XERO_CONSUMER_KEY
XERO_CONSUMER_SECRET=${ENVIRONMENT_TYPE_UPP}_XERO_CONSUMER_SECRET
XERO_PRIVATE_KEY_STRING=${ENVIRONMENT_TYPE_UPP}_XERO_PRIVATE_KEY_STRING

blockinfo "------ Release ${RELEASE} ------"

RELEASE=$(bash dev-workflow-scripts/+utils/generateReleaseNumber.bash)


# --- DEPENDENCIES ---

time bash dev-workflow-scripts/+utils/install-deps.bash \
    --dws \
    --eatery \
    --clearing \
    --website \
    --firebaseFirestore \
    --firebaseFunctions \
    --firebaseFunctionsAdditional \
    --firebaseTools \
    --microservices \
  || error "Installing dependencies has been failed"

blockinfo "Deploying to ${ENVIRONMENT_TYPE_UPP}"

blockinfo "Creating Firebase Functions '.runtimeconfig.json' file" \
  && ts-node dev-workflow-scripts/src/configs/generate-functions-configs-runner.ts ${ENVIRONMENT_TYPE} ${RELEASE} \
  && success "Creation of Firebase Functions '.runtimeconfig.json' file has been completed" \
  || error "Creation of Firebase Functions '.runtimeconfig.json' file has been failed"

# build Eatery application here, because it is use it in two places - registerReleaseInSentry and deploy
time bash dev-workflow-scripts/+utils/build.bash -e --environmentType=${ENVIRONMENT_TYPE} \
  || error "Eatery app build has been failed"

# build Clearing application here, because it is use it in two places - registerReleaseInSentry and deploy
time bash dev-workflow-scripts/+utils/build.bash -c --environmentType=${ENVIRONMENT_TYPE} \
  || error "Clearing app build has been failed"

# build Functions here, because it is use it in two places - registerReleaseInSentry and deploy
time bash dev-workflow-scripts/+utils/build.bash -u --environmentType=${ENVIRONMENT_TYPE} \
  || error "Functions build has been failed"

time bash dev-workflow-scripts/+utils/registerReleaseInSentry.bash \
    ${!SENTRY_AUTH_TOKEN} \
    ${SENTRY_ORGANIZATION} \
    ${!SENTRY_PROJECT} \
    ${RELEASE} \
  || error "Release registration in Sentry has been failed"

blockinfo "Building project" \
  && time bash dev-workflow-scripts/+utils/build.bash -fw \
    --websiteBaseUrl=${!WEBSITE_BASEURL} \
    --environmentType=${ENVIRONMENT_TYPE} \
  && success "Project build has been completed" \
  || error "Project build has been failed"

time firebase use ${!FIREBASE_PROJECT_NAME} --token ${!FIREBASE_TOKEN} || error "'$ firebase use' failed"

#if [ "$ENVIRONMENT_TYPE" = "qa" ]; then
#  blockinfo "Fill ${ENVIRONMENT_TYPE} with demo data" \
#    && time yarn deploy:delete-functions ${ENVIRONMENT_TYPE} && time yarn data:fill-demo --${ENVIRONMENT_TYPE} \
#    && success "Fill ${ENVIRONMENT_TYPE} with demo data has been completed" \
#    || error "Fill ${ENVIRONMENT_TYPE} with demo data has been failed"
#else
  blockinfo "No need feel ${ENVIRONMENT_TYPE} with demo data"
#fi

blockinfo "Deploying project" \
  && time bash dev-workflow-scripts/+utils/deploy.bash -fuecwsm \
    --envtype=${ENVIRONMENT_TYPE} \
    --release=${RELEASE} \
    --eateryfrontendurl=${!EATERY_BASEURL} \
    --clearingfrontendurl=${!CLEARING_BASEURL} \
    --sentrydsn=${!SENTRY_DSN} \
    --firebaseToken=${!FIREBASE_TOKEN} \
    --firebaseProject=${!FIREBASE_PROJECT_NAME} \
    --sendgridSecret=${!SENDGRID_SECRETKEY} \
    --cronKey=${!CRON_KEY} \
    --twilioSid=${TWILIO_SID} \
    --twilioToken=${TWILIO_TOKEN} \
    --twilioFrom=${TWILIO_FROM} \
    --hoiioAppId=${HOIIO_APPID} \
    --hoiioToken=${HOIIO_ACCESSTOKEN} \
    --websiteScheduleADemoDestinationEmail=${!WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL} \
    --mailchimpKey=${MAILCHIMP_KEY} \
    --xeroAppType=${!XERO_APP_TYPE} \
    --xeroConsumerKey=${!XERO_CONSUMER_KEY} \
    --xeroConsumerSecret=${!XERO_CONSUMER_SECRET} \
    --xeroPrivateKeyString=${!XERO_PRIVATE_KEY_STRING} \
    --sqlMicroserviceUrl=${!SQL_MICROSERVICE_URL} \
    --sqlMicroserviceSecretkey=${!SQL_MICROSERVICE_SERVICE_SECRETKEY} \
    --gaeInstanceName=${!GAE_INSTANCE_NAME} \
    --hostingAliasEatery=${!HOSTING_ALIAS_EATERY} \
    --hostingAliasClearing=${!HOSTING_ALIAS_CLEARING} \
    --hostingAliasWebsite=${!HOSTING_ALIAS_WEBSITE} \
  && success "Project deploy has been completed" \
  || error "Project deploy has been failed"
