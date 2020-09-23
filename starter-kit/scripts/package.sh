#!/bin/bash

echo "GITHUB_RUN_NUMBER : $GITHUB_RUN_NUMBER"
echo "GITHUB_WORKSPACE : $GITHUB_WORKSPACE"
echo "GITHUB_REPOSITORY : $GITHUB_REPOSITORY"

cd $GITHUB_WORKSPACE
VERSION=$(grep sonar.projectVersion sonar-project.properties | cut -d'=' -f2)
APP=$(echo $GITHUB_REPOSITORY|cut -d'/' -f2)

echo "App version: $VERSION"
echo "Build Artifact: $APP_$VERSION.$GITHUB_RUN_NUMBER"

