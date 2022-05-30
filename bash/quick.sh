#!/usr/bin/env bash
source bash/_util.sh

build_main

log "Finished Build"

if [ $# -gt 0 ]
then
	log "Observing Files..."
	log "Observing" "turnStyles.js"
	log "Ready To Serve"
	watchify turnStyles.js -o build/turnStyles.js
fi