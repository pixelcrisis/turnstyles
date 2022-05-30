#!/usr/bin/env bash

log () {
	NONE='\033[0m'
	HEAD='\033[0;32m'
	CODE='\033[0;34m'
	TEXT='\033[0;33m'
	if [ $# -eq 1 ]
	then
		echo "${HEAD}$1 ${NONE}"
	else
		echo "${TEXT}$1 ${CODE}$2 ${NONE}"
	fi
}

build_vers () {
	log "Updating" "package.json"
	jq ".version = \"$1\"" package.json > package.temp.json
	mv package.temp.json package.json

	log "Updating" "static/manifest2.json"
	jq ".version = \"$1\"" static/manifest2.json > manifest2.temp.json
	mv manifest2.temp.json static/manifest2.json

	log "Updating" "static/manifest3.json"
	jq ".version = \"$1\"" static/manifest3.json > manifest3.temp.json
	mv manifest3.temp.json static/manifest3.json
}

build_main () {
	log "Compiling" "turnStyles.js"
	browserify -p tinyify turnStyles.js -o build/turnStyles.js
}

build_sass () {
	log "Compiling" "sass/turnStyles.sass"
	node-sass sass/turnStyles.sass -o build > /dev/null
	postcss build/turnStyles.css --use autoprefixer --d build/
	log "Compiling" "sass/themes/"
	node-sass sass/themes -o build/themes > /dev/null
	postcss build/themes/*.css --use autoprefixer --d build/themes/
	log "Compiling" "sass/colors/"
	node-sass sass/colors -o build/colors > /dev/null
	postcss build/colors/*.css --use autoprefixer --d build/colors/
}

build_full () {
	log "Migrating" "static/"
	cp -R static/. build/
	log "Selecting" "manifest2.json" 
	mv build/manifest2.json build/manifest.json
	rm build/manifest3.json
}