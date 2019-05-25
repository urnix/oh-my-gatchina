#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

eatery=false
clearing=false
website=false
firestore=false
functions=false
environmentType=false
websiteBaseUrl=false

optspec=":ecwfu-:"
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
    -)
      case "${OPTARG}" in
        websiteBaseUrl=*)
          websiteBaseUrl=${OPTARG#*=}
          ;;
        environmentType=*)
          environmentType=${OPTARG#*=}
          ;;
        help)
          normal "Options:
            [-e] Build Eatery application. Use together with --environmentType
            [-c] Build Clearing application. Use together with --environmentType
            [-w] Build Website. Use together with --websiteBaseUrl
            [-f] Build Firestore Rules & Indexes
            [-u] Build Functions
            [--environmentType] prod | qa | e2e
            [--websiteBaseUrl] Base URL with / on the end
            \n\nExample: \"$ bash build.bash -ecw --environmentType=prod --websiteBaseUrl=https://website.com/\""
          exit 2
          ;;
      esac
      ;;
  esac
done

[ $eatery = false ] && [ clearing = false ] && [ $website = false ] && [ $firestore = false ] && [ $functions = false ] \
  && error "Nothing to build. You have to choose something. For help use --help"

[ $eatery = true ] && [ $environmentType = false ] \
  && error "Environment type is required when you want to build Eatery application. For help use --help"

[ $clearing = true ] && [ $environmentType = false ] \
  && error "Environment type is required when you want to build Clearing application. For help use --help"

environmentTypeOptions=('prod' 'qa' 'e2e')
[ $eatery = true ] && [[ ! " ${environmentTypeOptions[@]} " =~ " ${environmentType} " ]] \
  && error "environmentType should be one of 'prod' | 'qa' | 'e2e'"
  environmentTypeOptions=('prod' 'qa' 'e2e')

[ $clearing = true ] && [[ ! " ${environmentTypeOptions[@]} " =~ " ${environmentType} " ]] \
  && error "environmentType should be one of 'prod' | 'qa' | 'e2e'"

[ $website = true ] && [ $websiteBaseUrl = false ] \
  && error "websiteBaseUrl is required when you want to build Website. For help use --help"



# Main thing
# Things below will be built in order of "faster first" to make sure if something could fail - it will fail fast

[ $firestore = true ] && \
  ( info "Building Firestore" \
  && time yarn build:firestore \
  && info "Building Firestore has been completed" \
  || error "Building Firestore failed" )

[ $functions = true ] && \
  ( info "Building Functions" \
  && time yarn build:functions \
  && info "Building Functions has been completed" \
  || error "Building Functions failed" )

[ $website = true ] && \
  ( info "Building Website" \
  && time yarn build:website --env.baseAppUrl ${websiteBaseUrl} \
  && info "Building Website has been completed" \
  || error "Building Website failed" )

[ $eatery = true ] && \
  ( info "Building Eatery application" \
  && time bash dev-workflow-scripts/+utils/build-angular.bash eatery ${environmentType} \
  && info "Building Eatery has been completed" \
  || error "Building Eatery failed" )

[ $clearing = true ] && \
  ( info "Building Clearing application" \
  && time bash dev-workflow-scripts/+utils/build-angular.bash clearing ${environmentType} \
  && info "Building Clearing has been completed" \
  || error "Building Clearing failed" )

success "Everything has been built!"
