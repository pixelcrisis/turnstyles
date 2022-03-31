#!/usr/bin/env bash
HEAD='\033[0;32m'
CODE='\033[0;34m'
TEXT='\033[0;33m'
# Added Some Color

# Step One: Do A Quick Build Just In Case

echo "${TEXT}Compiling ${CODE}turnStyles.js"
browserify -p tinyify turnStyles.js -o build/turnStyles.js

echo "${HEAD}Finished Build${NONE}"

# Step Two: Build When Files Change

echo "${HEAD}Observing Files..."
echo "${TEXT}Observing ${CODE}turnstyles.js"
echo "${TEXT}Observing ${CODE}chrome/*.js*"

concurrently \
	"watchify turnStyles.js -o build/turnStyles.js" \
	"copy-and-watch --watch chrome/*.js* build/" 