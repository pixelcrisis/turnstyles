#!/usr/bin/env bash

echo "[tS] Watching [ turnStyles.js ] ..."
watchify turnStyles.js -o build/turnStyles.js &

echo "[tS] Watching [ turnStyles.sass ] ..."
node-sass turnStyles.sass -wo build &

echo "[tS] Watching [ themes/ ] ..."
node-sass sass/themes -wo build/themes &

echo "[tS] Watching [ styles/ ] ..."
node-sass sass/styles -wo build/styles &

echo "[tS] Watching [ package/ ] ..."
copy-and-watch --watch --skip-initial-copy package/*.js* build/ &