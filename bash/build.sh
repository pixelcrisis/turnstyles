#!/usr/bin/env bash
source bash/_util.sh

if [ $# -eq 1 ] 
then
	log "Updating Version"
	build_vers $1
fi

build_main
build_sass
build_full

log "Finished Build"