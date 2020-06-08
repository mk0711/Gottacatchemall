#!/usr/bin/env bash
./build.sh 
docker push mtothekay/gateway 

export TLSCERT=/etc/letsencrypt/live/api.mtothekay.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.mtothekay.me/privkey.pem

ssh ec2-user@api.mtothekay.me << EOF 
docker rm -f gateway 
docker pull mtothekay/gateway
docker run \
    -d \
    --name gateway \
    -p 443:443 \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    mtothekay/gateway 
exit 
EOF 