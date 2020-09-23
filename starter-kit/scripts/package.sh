#!/bin/bash

cd $GITHUB_WORKSPACE
VERSION=$(grep sonar.projectVersion sonar-project.properties | cut -d'=' -f2)
APP=$(echo $GITHUB_REPOSITORY|cut -d'/' -f2)

echo "App Version: $VERSION"
echo "App Name: $APP"
echo "Build Artifact: $APP.$VERSION.$GITHUB_RUN_NUMBER"
cd ../
zip -q -x \*.git* -r $APP.$VERSION.$GITHUB_RUN_NUMBER.zip `basename $GITHUB_WORKSPACE`
ls -lh $APP.$VERSION.$GITHUB_RUN_NUMBER.zip
echo "Region: $AWS_DEFAULT_REGION"
