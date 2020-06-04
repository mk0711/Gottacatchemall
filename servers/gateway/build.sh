GOOS=linux go build
docker build -t mtothekay/gateway .
go clean