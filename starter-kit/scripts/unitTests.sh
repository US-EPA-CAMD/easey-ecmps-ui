#!/bin/bash

echo "Run Unit tests here ... "
cd starter-kit/tasks-api
npm install jest
npm run test

cd ../app
CI=true npm test
