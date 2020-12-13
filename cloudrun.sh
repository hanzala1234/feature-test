#!/bin/bash
apt-get update && apt install -y jq
no_of_keys=$(cat env.json | jq 'keys[]' | wc -l)
env_vars=""
for i in $( seq 1 $no_of_keys )
do
env_vars+=$(cat env.json | jq keys[]  |  sed -n "$i p")=$(cat env.json | jq values[]  |  sed -n "$i p") 
env_vars+=","
done

gcloud run deploy ${FEATURE_ID} --update-env-vars $env_vars --image gcr.io/$PROJECT_ID/${FEATURE_ID}:${COMMIT_SHA}  --allow-unauthenticated --region us-central1 --platform managed --port 8080
# for i in {0..$no_of_keys}
# do
#   echo "Number: $i"
# done