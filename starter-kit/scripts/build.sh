#!/bin/bash
echo "Build steps here ... "
cd starter-kit/app
npm install
cd ..
cd starter-kit/facilities-api
npm install
cd ..
cd starter-kit/posts-api
npm install
cd ..
cd starter-kit/tasks-api
npm install
npm run build
cd ..