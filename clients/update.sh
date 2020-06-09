docker rm -f clientauth

docker pull npham24/clientauth

docker run -d \
    --name clientauth \
    -p 80:80 \
    -p 443:443 \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    npham24/clientauth

exit