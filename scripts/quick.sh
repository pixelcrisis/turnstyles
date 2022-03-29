#!/usr/bin/env bash

# Step One: Do A Quick Build Just In Case
echo ">>> Begin tS:Quick Script Development <<<"

echo "[tS] Compiling [ turnStyles.js ] ..."
browserify -p tinyify turnStyles.js -o build/turnStyles.js

echo "[tS] Migrating [ package/ ]  ..."
cp -R package/. build/

echo ">>> Initial Build Complete <<<"

# Step Two: Build When Files Change
echo ">>> Begin Monitoring Files <<<"

echo "[tS] Watching [ turnStyles.js ] ..."
watchify turnStyles.js -o build/turnStyles.js &

echo "[tS] Watching [ package/ ] ..."
copy-and-watch --watch --skip-initial-copy package/*.js* build/ &