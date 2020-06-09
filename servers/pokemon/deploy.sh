tsc

docker build -t npham24/pokemon .

docker push npham24/pokemon

ssh ec2-user@api.npham24.me < update.sh
