#!/bin/bash

cd $GITHUB_WORKSPACE

echo "Retrieving keys ..."
cf api  https://api.fr.cloud.gov
cf auth $1 $2
cf target -o "epa-prototyping" -s "dev-easey-in"

# S3_CREDENTIALS=`cf service-key "${SERVICE_INSTANCE_NAME}" "${KEY_NAME}" | tail -n +2`
S3_CREDENTIALS=`cf service-key "deployment-artifacts" "deployment-artifacts-svc-key" | tail -n +2`
export AWS_ACCESS_KEY_ID=`echo "${S3_CREDENTIALS}" | jq -r .access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${S3_CREDENTIALS}" | jq -r .secret_access_key`
export BUCKET_NAME=`echo "${S3_CREDENTIALS}" | jq -r .bucket`
export AWS_DEFAULT_REGION=`echo "${S3_CREDENTIALS}" | jq -r '.region'`

export appname=$(grep ^$3.appname deployment.properties|cut -d'=' -f2)
export version=$(grep ^$3.version deployment.properties|cut -d'=' -f2)
export build=$(grep ^$3.build deployment.properties|cut -d'=' -f2)

echo "DEBUG appname: $appname"
echo "DEBUG version: $version"
echo "DEBUG build: $build"

mkdir deployments
aws s3 cp  s3://cg-2f1f8ec0-a961-4d0b-af39-2ed9f109078e/$appname.$version.$build.zip deployments/
cd deployments
unzip -q $appname.$version.$build.zip
ls -l 
cd $appname/starter-kit
cf push

