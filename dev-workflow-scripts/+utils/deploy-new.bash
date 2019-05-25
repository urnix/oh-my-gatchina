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
        help)
          normal "Options:
            [-e] Deploy Eatery application.
            [-c] Deploy Clearing application.
            [-w] Deploy Website.
            [-f] Deploy Firestore Rules & Indexes
            [-u] Deploy Functions. Use together with next required params:
                  [--envtype]
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
fi

blockinfo "Executing main thing"

info "Creating Microservices configuration files" \
  && time ts-node dev-workflow-scripts/src/apply-environment.ts $envtype \
  && success "Microservices configuration files has been created" \
  || error "Creation of Microservices configuration files has been failed"

info "Start deploying Firebase" \
  && time yarn ts-node dev-workflow-scripts/src/deploy/deploy-firebase-runner.ts $envtype $eatery $clearing $website $firestore $storage $functions \
  && success "Microservices have been successfully deployed" \
  || error "Deploying Microservices failed"

info "Start deploying Microservices"
if [ $microservices = true ]; then
  info "Deploying Microservices" \
    && time yarn ts-node dev-workflow-scripts/src/deploy/deploy-microservices.ts $envtype \
    && success "Microservices have been successfully deployed" \
    || error "Deploying Microservices failed"
fi
