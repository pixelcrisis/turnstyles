#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'
# Added Some Color

echo "${HEAD}Observing Files..."
echo "${TEXT}Observing turnStyles.js"
echo "${TEXT}Observing turnStyles.sass"
echo "${TEXT}Observing themes/"
echo "${TEXT}Observing styles/"
echo "${TEXT}Observing chrome/*.js*"
watchify turnStyles.js -o build/turnStyles.js &
node-sass turnStyles.sass -wo build &
node-sass themes -wo build/themes &
node-sass styles -wo build/styles &
copy-and-watch --watch --skip-initial-copy chrome/*.js* build/ && fg