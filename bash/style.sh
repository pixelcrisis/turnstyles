#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'
# Added Some Color

# Step One: Compile All Just In Case

echo "${TEXT}Compiling ${CODE}turnStyles.sass"
node-sass turnStyles.sass -o build > /dev/null
postcss build/turnStyles.css --use autoprefixer --d build/

echo "${TEXT}Compiling ${CODE}themes/"
node-sass themes -o build/themes > /dev/null
postcss build/themes/*.css --use autoprefixer --d build/themes/

echo "${TEXT}Compiling ${CODE}styles/"
node-sass styles -o build/styles > /dev/null
postcss build/styles/*.css --use autoprefixer --d build/styles/

echo "${HEAD}Finished Build"

# Step Two: Build When Files Change

echo "${HEAD}Observing Styles..."
echo "${TEXT}Observing ${CODE}turnStyles.sass"
echo "${TEXT}Observing ${CODE}themes/"
echo "${TEXT}Observing ${CODE}styles/"

concurrently \
	"node-sass turnStyles.sass -wo build" \
	"node-sass themes -wo build/themes" \
	"node-sass styles -wo build/styles"