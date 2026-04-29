#!/bin/bash
echo "Creating Config"

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js
env | while IFS= read -r line; do
  value=${line#*=}
  name=${line%%=*}
  if [[ $name == *"VITE"* ]]; then
    echo "$name : '$value'," >> ./env-config.js
  fi
done
echo "}" >> ./env-config.js

cp ./env-config.js ./build
cp ./build/static/css/main.*.css ./build/static/css/main.css

# Set up subpath routing if VITE_EASEY_ECMPS_UI_PATH is configured
BASE_PATH="${VITE_EASEY_ECMPS_UI_PATH:-/}"
# Ensure trailing slash for base href
[[ "$BASE_PATH" != */ ]] && BASE_HREF="$BASE_PATH/" || BASE_HREF="$BASE_PATH"

# Replace the default <base href="/"> with the configured path
sed -i "s|<base href=\"/\">|<base href=\"$BASE_HREF\">|g" ./build/index.html
sed -i "s|<base href=\"/\">|<base href=\"$BASE_HREF\">|g" ./build/error404.html

# Create a symlink so nginx can serve assets under the subpath
# e.g., /ecmps/env-config.js -> /env-config.js
if [ "$BASE_PATH" != "/" ] && [ -n "$BASE_PATH" ]; then
    PATH_DIR="${BASE_PATH#/}"
    ln -sf . "./build/$PATH_DIR"
    echo "Created symlink: build/$PATH_DIR -> build/"
fi
