docker rm -f 441mongopokemon

docker run -d \
    --network 441network \
    --name 441mongopokemon \
    mongo

docker rm -f pokemon

docker pull npham24/pokemon

docker run -d \
    --restart unless-stopped \
    --name pokemon \
    --network 441network \
    -e PORT=80 \
    npham24/pokemon

exit
