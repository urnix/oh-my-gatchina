#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

blockinfo "Commit-msg hook started"

info "Check commit message format" && time yarn check-commit-message-format && success "Commit message format is correct" || error "Commit message format is not correct"

success "Commit message format checked. Long tests and test build will run on CI side. Now pray :D"
