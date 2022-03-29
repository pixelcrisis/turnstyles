#!/usr/bin/env bash

# Step One: Compile All Just In Case
echo ">>> Begin tS:Full Development <<<"

echo "[tS] Compiling [ turnStyles.sass ] ..."
node-sass turnStyles.sass -o build > /dev/null
postcss build/turnStyles.css --use autoprefixer --d build/

echo "[tS] Compiling [ themes/ ] ..."
node-sass sass/themes -o build/themes > /dev/null
postcss build/themes/*.css --use autoprefixer --d build/themes/

echo "[tS] Compiling [ styles/ ] ..."
node-sass sass/styles -o build/styles > /dev/null
postcss build/styles/*.css --use autoprefixer --d build/styles/

echo ">>> Initial Build Complete <<<"

# Step Two: Build When Files Change
echo ">>> Begin Monitoring Files <<<"

echo "[tS] Watching [ turnStyles.sass ] ..."
node-sass turnStyles.sass -wo build &

echo "[tS] Watching [ themes/ ] ..."
node-sass sass/themes -wo build/themes &

echo "[tS] Watching [ styles/ ] ..."
node-sass sass/styles -wo build/styles &