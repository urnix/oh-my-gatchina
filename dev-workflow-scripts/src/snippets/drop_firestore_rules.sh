#!/bin/bash

# -----
# Firebase Support:
# First of all, apologies for the inconvenience, this issue happened because two things: there is a kind of
# "version history" for the security rules, and there is a limit on the number of entries for that. I'm sorry to say
# that it is not yet documented, and the interface lacks an adequate way to clean the history, so I'm attaching
# a script that can help you clean it using a REST API; you can use the script to implement your own version, but
# hopefully it will help you solve this.
# -----

# this command will cause the script to exit immediately in case an error occurs
set -eo pipefail

# NOTES:
# install jq
# in debian / ubuntu:
# sudo apt install jq
# for other platforms, visit: https://stedolan.github.io/jq/

# install and configure gcloud SDK
# https://cloud.google.com/sdk/install
# https://cloud.google.com/sdk/docs/initializing

# login with service account
# * create service account key:
# * https://console.cloud.google.com/apis/credentials/serviceaccountkey
# * notes: choose "App Engine default service account" and JSON format

# gcloud auth application-default login
# gcloud auth activate-service-account --key-file=$PATH_TO_SERVICE_ACCOUNT_FILE
# export GOOGLE_APPLICATION_CREDENTIALS=$PATH_TO_SERVICE_ACCOUNT_FILE

# run script passing the projectId as argument
# bash drop_firestore_rules.sh <projectId>


echo "Deleting existing rules"

SITE=$1
echo "Site: $SITE"

HEADER_AUTH="Authorization: Bearer $(gcloud auth application-default print-access-token)";

echo $HEADER_AUTH

PAGE_TOKEN=
COUNTER=0

while :
do
    echo "Fetching rulesets for $PAGE_TOKEN"

    RULES=$( \
        curl \
            -sS \
            -H "$HEADER_AUTH" \
            "https://firebaserules.googleapis.com/v1/projects/$SITE/rulesets?pageToken=$PAGE_TOKEN" \
        )

    echo $RULES

    for RULE_ID in $(echo $RULES | jq '.rulesets | keys[]')
    do

        COUNTER=$((COUNTER+1))

        # as the REST API returns the whole list from the newer to the older,
        # I'll skip the first entry to keep it
        if [ $COUNTER -lt 2 ]; then
            echo "keeping first entry"
            continue
        fi

        echo "contador: ${COUNTER}"
        RULE_NAME=$(echo $RULES | jq --raw-output ".rulesets[$RULE_ID].name")
    
        echo "getting ruleset $RULE_NAME";
        RULESET=$(curl \
            -sS \
            -X GET \
            -H "$HEADER_AUTH" \
            "https://firebaserules.googleapis.com/v1/$RULE_NAME"\
        )
        if [[ $RULESET =~ "firebase.storage" ]]; then
            echo "skipping STORAGE ruleset"
            continue
        fi

        # the moment of truth
        echo "deleting rulset $RULE_NAME"
        curl \
            -sS \
            -X DELETE \
            -H "$HEADER_AUTH" \
            "https://firebaserules.googleapis.com/v1/$RULE_NAME"
    done

    if [ $(echo $RULES | jq --raw-output '.nextPageToken') == "null" ]; then
        exit 0
    fi

    PAGE_TOKEN=$(echo $RULES | jq --raw-output '.nextPageToken')
    sleep 1s
done
