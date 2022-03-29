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

echo "${TEXT}Migrating ${CODE}package/"
cp -R package/. build/

echo "${HEAD}Finished Build"