docker rm -f 441mongo

docker run -d \
    -p 27017:27017 \
    --name 441mongo \
    mongo
