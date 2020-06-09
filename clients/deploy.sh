./build.sh

docker push npham24/clientauth

ssh ec2-user@npham24.me < update.sh