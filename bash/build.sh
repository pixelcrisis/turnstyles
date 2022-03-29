#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'

# Added Some Color

echo "${TEXT}Compiling ${CODE}turnStyles.js"
browserify -p tinyify turnStyles.js -o build/turnStyles.js

echo "${TEXT}Compiling ${CODE}turnStyles.sass"
node-sass turnStyles.sass -o build > /dev/null
postcss build/turnStyles.css --use autoprefixer --d build/

echo "${TEXT}Compiling ${CODE}themes/"
node-sass themes -o build/themes > /dev/null
postcss build/themes/*.css --use autoprefixer --d build/themes/

echo "${TEXT}Compiling ${CODE}styles/"
node-sass styles -o build/styles > /dev/null
postcss build/styles/*.css --use autoprefixer --d build/styles/

if [ $# -eq 1 ] 
then
	echo "${HEAD}Updating Versions"
	echo "${TEXT}Updating ${CODE}package.json"
	jq ".version = \"$1\"" package.json > package.temp.json
	mv package.temp.json package.json
	echo "${TEXT}Updating ${CODE}chrome/manifest.json"
	jq ".version = \"$1\"" chrome/manifest.json > manifest.temp.json
	mv manifest.temp.json chrome/manifest.json
fi

echo "${TEXT}Migrating ${CODE}chrome/"
cp -R chrome/. build/

echo "${HEAD}Finished Build"