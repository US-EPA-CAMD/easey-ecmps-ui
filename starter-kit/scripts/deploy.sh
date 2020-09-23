#!/bin/bash

echo "Deploy steps here ... "
cf api  https://api.fr.cloud.gov
cf auth $1 $2
cf target -o "epa-prototyping" -s "dev-easey-in"
cd starter-kit
cf push

# S3_CREDENTIALS=`cf service-key "${SERVICE_INSTANCE_NAME}" "${KEY_NAME}" | tail -n +2`
S3_CREDENTIALS=`cf service-key "deployment-artifacts" "deployment-artifacts-svc-key" | tail -n +2`
export AWS_ACCESS_KEY_ID=`echo "${S3_CREDENTIALS}" | jq -r .access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${S3_CREDENTIALS}" | jq -r .secret_access_key`
export BUCKET_NAME=`echo "${S3_CREDENTIALS}" | jq -r .bucket`
export AWS_DEFAULT_REGION=`echo "${S3_CREDENTIALS}" | jq -r '.region'`
