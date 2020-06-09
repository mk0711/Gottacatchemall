#creating the network and running redis
# docker network rm 441network
# docker network create 441network

docker rm -f redisServer
docker run -d --name redisServer --network 441network redis

#building the db
export MYSQL_ROOT_PASSWORD=password
export DB_NAME=441sqlserver

docker pull npham24/441mysql

docker rm -f 441mysql

docker run -d \
    --name 441mysql \
    --network 441network \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE=$DB_NAME \
    npham24/441mysql

#running the gateway
docker rm -f gateway

docker pull npham24/gateway

export TLSCERT=/etc/letsencrypt/live/api.npham24.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.npham24.me/privkey.pem
export SESSIONKEY=$(openssl rand -base64 18)
export REDISADDR=redisServer:6379
export DSN=root:$MYSQL_ROOT_PASSWORD@tcp\(441mysql:3306\)/$DB_NAME
export MESSAGESADDR=http://messaging:80 
export SUMMARYADDR=http://summary:80
export POKEMONADDR=http://pokemon:80

docker run -d \
    --name gateway \
    --network 441network \
    --restart unless-stopped \
    -p 443:443 \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e SESSIONKEY=$SESSIONKEY \
    -e REDISADDR=$REDISADDR \
    -e DSN=$DSN \
    -e MESSAGESADDR=$MESSAGESADDR \
    -e SUMMARYADDR=$SUMMARYADDR \
    -e POKEMONADDR=$POKEMONADDR \
    npham24/gateway

exit


