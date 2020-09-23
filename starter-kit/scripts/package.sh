#!/bin/bash

echo "GITHUB_RUN_NUMBER : $GITHUB_RUN_NUMBER"
echo "GITHUB_WORKSPACE : $GITHUB_WORKSPACE"
echo "GITHUB_REPOSITORY : $GITHUB_REPOSITORY"

cd $GITHUB_WORKSPACE
VERSION=$(grep sonar.projectVersion sonar-project.properties | cut -d'=' -f2)
APP=$(echo $GITHUB_REPOSITORY|cut -d'/' -f2)

echo "App Version: $VERSION"
echo "App Name: $APP"
echo "Build Artifact: $APP.$VERSION.$GITHUB_RUN_NUMBER"
cd ../
zip -r $APP.$VERSION.$GITHUB_RUN_NUMBER.zip `basename $GITHUB_WORKSPACE`
