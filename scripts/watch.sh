#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'
NONE='\033[0m'
# Added Some Color

echo "${TEXT}Observing ${CODE}turnStyles.js"
watchify turnStyles.js -o build/turnStyles.js &

echo "${TEXT}Observing ${CODE}turnStyles.sass"
node-sass turnStyles.sass -wo build &

echo "${TEXT}Observing ${CODE}themes/"
node-sass sass/themes -wo build/themes &

echo "${TEXT}Observing ${CODE}styles/"
node-sass sass/styles -wo build/styles &

echo "${TEXT}Observing ${CODE}package/${NONE}"
copy-and-watch --watch --skip-initial-copy package/*.js* build/