./build.sh

docker push npham24/gateway

ssh ec2-user@api.npham24.me < update.sh