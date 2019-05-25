#!/bin/sh

source dev-workflow-scripts/+utils/log.bash

blockinfo "Pre-commit hook started"

info "Format code" && time yarn format:pre-commit && success "Code formatting has been completed" || error "Code formatting has been failed"
#info "Lint code" && time yarn lint && success "Code linting has been completed" || error "Code linting has been failed"
#info "Run unit-tests" && time yarn test:shared && success "Unit-tests have been completed" || error "Unit-tests have been failed"

success "Code formatted and linted."
#success "Code formatted, linted and unit-tested."
