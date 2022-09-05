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
  if [[ $name == "PUBLIC_URL" ]]; then
    echo "$name : '$value'," >> ./env-config.js
  fi
  if [[ $name == *"REACT_APP"* ]]; then
    echo "$name : '$value'," >> ./env-config.js
  fi
done
echo "}" >> ./env-config.js

cp ./env-config.js ./build
cp ./build/static/css/main.*.css ./build/static/css/main.css
