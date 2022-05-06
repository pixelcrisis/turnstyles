#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'

# Added Some Color

if [ $# -eq 1 ] 
then
	echo "${HEAD}Updating Versions"

	echo "${TEXT}Updating ${CODE}package.json"
	jq ".version = \"$1\"" package.json > package.temp.json
	mv package.temp.json package.json

	echo "${TEXT}Updating ${CODE}static/manifest2.json"
	jq ".version = \"$1\"" static/manifest2.json > manifest2.temp.json
	mv manifest2.temp.json static/manifest2.json

	echo "${TEXT}Updating ${CODE}static/manifest3.json"
	jq ".version = \"$1\"" static/manifest3.json > manifest3.temp.json
	mv manifest3.temp.json static/manifest3.json
fi

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

echo "${TEXT}Migrating ${CODE}static/"
cp -R static/. build/

echo "${TEXT}Selecting ${CODE}manifest2.json ${TEXT}AS ${CODE}manifest.json"
mv build/manifest2.json build/manifest.json

echo "${HEAD}Finished Build"