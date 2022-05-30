#!/usr/bin/env bash
source bash/build

build_main
build_sass

log "Finished Build"

log "Observing Styles..."
log "Observing" "sass/turnStyles.sass"
log "Observing" "sass/themes/*"
log "Observing" "sass/colors/*"

log "Ready To Serve"

concurrently \
	"node-sass sass/turnStyles.sass -wo build" \
	"node-sass sass/themes -wo build/themes" \
	"node-sass sass/colors -wo build/colors"