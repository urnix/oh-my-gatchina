#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

eatery=false
clearing=false
website=false
firestore=false
functions=false
storage=false
microservices=false
envtype=false
firebaseToken=false
firebaseProject=false

optspec=":ecwfusm-:"
while getopts "$optspec" param; do
  case "${param}" in
    e)
      eatery=true
      ;;
    c)
      clearing=true
      ;;
    w)
      website=true
      ;;
    f)
      firestore=true
      ;;
    u)
      functions=true
      ;;
    s)
      storage=true
      ;;
    m)
      microservices=true
      ;;
    -)
      case "${OPTARG}" in
        envtype=*)
          envtype=${OPTARG#*=}
          ;;
        firebaseToken=*)
          firebaseToken=${OPTARG#*=}
          ;;
        firebaseProject=*)
          firebaseProject=${OPTARG#*=}
          ;;
        help)
          normal "Options:
            [-e] Deploy Eatery application.
            [-c] Deploy Clearing application.
            [-w] Deploy Website.
            [-f] Deploy Firestore Rules & Indexes
            [-u] Deploy Functions. Use together with next required params:
                  [--envtype]
                  [--firebaseToken]
                  [--firebaseProject]
            [-s] Deploy Storage Rules
            [-m] Deploy microservices
            \n\nExample: \"$ bash deploy.bash -ef"
          exit 2
          ;;
      esac
      ;;
  esac
done


blockinfo "Check if all variables are provided"

# TODO: check vars, but hide values in PROD mode
if [ $functions = true ]; then
  [ $envtype ] && info_ "envtype = ${envtype}" || error "envtype is not provided"
  [ $firebaseToken ] && info_ "firebaseToken = ${firebaseToken}" || error "firebaseToken is not provided"
  [ $firebaseProject ] && info_ "firebaseProject = ${firebaseProject}" || error "firebaseProject is not provided"
fi

blockinfo "Executing main thing"

DEPLOY_ONLY="--only "

info "Creating Microservices configuration files" \
  && time ts-node dev-workflow-scripts/src/apply-environment.ts $envtype \
  && success "Microservices configuration files has been created" \
  || error "Creation of Microservices configuration files has been failed"

[ $storage = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"storage,"

[ $firestore = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"firestore,"

[ $functions = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"functions,"

[ $eatery = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"hosting:eatery,"

[ $clearing = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"hosting:clearing,"

[ $website = true ] && DEPLOY_ONLY=${DEPLOY_ONLY}"hosting:website,"

echo DEPLOY_ONLY == ${DEPLOY_ONLY}

info "Start deploying release to Firebase"

time firebase deploy -f --token ${firebaseToken} --project ${firebaseProject} ${DEPLOY_ONLY} \
  && success "Release has been successfully deployed to Firebase" \
  || error "Deploying to Firebase failed"

info "Start deploying Microservices"
if [ $microservices = true ]; then
  info "Deploying Microservices" \
    && time yarn ts-node dev-workflow-scripts/src/deploy/deploy-microservices.ts $envtype \
    && success "Microservices have been successfully deployed" \
    || error "Deploying Microservices failed"
fi
