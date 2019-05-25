#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

root=false
shared=false
angular=false
firebaseFirestore=false
firebaseFunctions=false
firebaseTools=false
dws=false

optspec=":-:"
while getopts "$optspec" param; do
  case "${param}" in
    -)
      case "${OPTARG}" in
        root)
          root=true
          ;;
        shared)
          shared=true
          ;;
        angular)
          angular=true
          ;;
        firebaseFirestore)
          firebaseFirestore=true
          ;;
        firebaseFunctions)
          firebaseFunctions=true
          ;;
        firebaseTools)
          firebaseTools=true
          ;;
        dws)
          dws=true
          ;;
        help)
          normal "Options:
            [--root] Install root package.json dependencies
            [--shared] Install shared package.json dependencies
            [--angular] Install angular package.json dependencies
            [--clearing] Install angular package.json dependencies
            [--website] Install website package.json dependencies
            [--firebaseDevScripts] Install firebase/dev-scripts/* package.json dependencies
            [--firebaseFirestore] Install firebase/firestore/* package.json dependencies
            [--firebaseFunctions] Install firebase/functions package.json dependencies
            [--firebaseTools] Install global \"firebase-tools\" dependency
            [--dws] Install global \"dws\" dependency
            \n\nExample: \"$ bash install-deps.bash --root --angular"
          exit 2
          ;;
      esac
      ;;
  esac
done


# Main thing

[ $root = true ] && \
  ( info "Installing root package.json dependencies" \
  && time yarn \
  && info "Installing root package.json has been completed" \
  || error "Installing root package.json failed" )

[ $shared = true ] && \
  ( info "Installing shared package.json dependencies" \
  && time yarn --cwd shared \
  && info "Installing shared package.json has been completed" \
  || error "Installing shared package.json failed" )

[ $angular = true ] && \
  ( info "Installing angular package.json dependencies" \
  && time yarn --cwd angular --network-timeout 100000 \
  && info "Installing angular package.json has been completed" \
  || error "Installing angular package.json failed" )

[ $firebaseFirestore = true ] && \
  ( info "Installing firebase/firestore/* package.json dependencies" \
  && time yarn --cwd firebase/firestore install \
  && info "Installing firebase/firestore/* package.json has been completed" \
  || error "Installing firebase/firestore/* package.json failed" )

[ $firebaseFunctions = true ] && \
  ( info "Installing firebase/functions package.json dependencies" \
  && time yarn --cwd firebase/functions \
  && info "Installing firebase/functions package.json has been completed" \
  || error "Installing firebase/functions package.json failed" )

[ $firebaseTools = true ] && \
  ( info "Installing global \"firebase-tools\" dependency" \
  && time yarn add firebase-tools \
  && info "Installing global \"firebase-tools\" dependency has been completed" \
  || error "Installing global \"firebase-tools\" dependency failed" )

[ $dws = true ] && \
  ( info "Installing global \"dws\" dependency" \
  && time yarn --cwd dev-workflow-scripts install \
  && info "Installing global \"dev-workflow-scripts\" dependency has been completed" \
  || error "Installing global \"dev-workflow-scripts\" dependency failed" )

success "Dependencies have been installed"
