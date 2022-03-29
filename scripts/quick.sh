#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'
NONE='\033[0m'
# Added Some Color

# Step One: Do A Quick Build Just In Case

echo "${TEXT}Compiling ${CODE}turnStyles.js"
browserify -p tinyify turnStyles.js -o build/turnStyles.js

# Step Two: Build When Files Change

echo "${TEXT}Observing ${CODE}turnStyles.js"
watchify turnStyles.js -o build/turnStyles.js &

echo "${TEXT}Observing ${CODE}package/${NONE}"
copy-and-watch --watch package/*.js* build/