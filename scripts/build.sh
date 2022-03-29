#!/usr/bin/env bash

echo "[tS] Compiling [ turnStyles.js ] ..."
browserify -p tinyify turnStyles.js -o build/turnStyles.js

echo "[tS] Compiling [ turnStyles.sass ] ..."
node-sass turnStyles.sass -o build > /dev/null
postcss build/turnStyles.css --use autoprefixer --d build/

echo "[tS] Compiling [ themes/ ] ..."
node-sass sass/themes -o build/themes > /dev/null
postcss build/themes/*.css --use autoprefixer --d build/themes/

echo "[tS] Compiling [ styles/ ] ..."
node-sass sass/styles -o build/styles > /dev/null
postcss build/styles/*.css --use autoprefixer --d build/styles/

echo "[tS] Migrating [ package/ ]  ..."
cp -R package/. build/