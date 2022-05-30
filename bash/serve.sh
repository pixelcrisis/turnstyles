#!/usr/bin/env bash
source bash/_util.sh

build_main
build_sass

log "Finished Build"

log "Observing Files..."
log "Observing" "turnStyles.js"
log "Observing" "sass/turnStyles.sass"
log "Observing" "sass/themes/"
log "Observing" "sass/colors/"

log "Ready To Serve"

concurrently \
	"watchify turnStyles.js -o build/turnStyles.js" \
	"node-sass sass/turnStyles.sass -wo build" \
	"node-sass sass/themes -wo build/themes" \
	"node-sass sass/colors -wo build/colors"