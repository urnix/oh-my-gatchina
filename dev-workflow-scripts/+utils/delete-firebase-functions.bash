#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

ENVIRONMENT_TYPE=$1 # could be "prod" or "qa" or "e2e"
if [ ! -z $ENVIRONMENT_TYPE ]; then
  ENVIRONMENT_TYPE_UPP=$(echo $ENVIRONMENT_TYPE | tr a-z A-Z) # UPPER CASE
  FIREBASE_TOKEN=${ENVIRONMENT_TYPE_UPP}_FIREBASE_TOKEN
  FIREBASE_PROJECT_NAME=${ENVIRONMENT_TYPE_UPP}_FIREBASE_PROJECT_NAME
fi

FIREBASE_FUNCTIONS=( \
  "authOnCreate" \
  "fsFilesOnDelete" \
  "fsInvoiceClearingFinalResultOnUpdate" \
  "fsInvoiceClearingWorkerJobOnCreate" \
  "fsInvoiceClearingWorkerJobOnUpdate" \
  "fsInvoicesOnCreate" \
  "fsInvoicesOnUpdate" \
  "fsLocationsOnCreate" \
  "fsLocationsOnUpdate" \
  "fsOrdersOnCreate" \
  "fsOrdersOnUpdate" \
  "fsOrganizationsOnCreate" \
  "fsPermissionsOnUpdate" \
  "fsProductPriceChangesOnCreate" \
  "fsProductPriceChangesOnUpdate" \
  "fsProductsOnCreate" \
  "fsProductsOnUpdate" \
  "fsUsersOnUpdate" \
  "httpsOnRequest" \
  "stOnFinalize" \
  "fsSuppliersOnUpdate" \
  "fsProductCategoriesOnUpdate" \
  "fsAdjustmentsMatchOnUpdate" \
  "fsTaxRatesOnUpdate" \
)
FUNCTIONS_ROW=$( IFS=$' '; echo "${FIREBASE_FUNCTIONS[*]}" )

success "Functions for delete: ${FUNCTIONS_ROW} "
info "Deleting all functions from firebase" \
&& (
  if [ ! -z $ENVIRONMENT_TYPE ]; then
    yarn build:functions;
    firebase deploy --only functions:authOnCreate --project ${!FIREBASE_PROJECT_NAME} \
      --token ${!FIREBASE_TOKEN};
    time firebase functions:delete ${FUNCTIONS_ROW} --force --project ${!FIREBASE_PROJECT_NAME} \
      --token ${!FIREBASE_TOKEN};
  else
    yarn build:functions;
    firebase deploy --only functions:authOnCreate;
    time firebase functions:delete ${FUNCTIONS_ROW} --force;
  fi;
) \
&& success "Deleting all functions has been completed" \
|| error "Deleting all functions failed"
