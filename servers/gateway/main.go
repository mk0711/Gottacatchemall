package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/Gottacatchemall/servers/gateway/handlers"
	"github.com/Gottacatchemall/servers/gateway/sessions"
	"github.com/Gottacatchemall/servers/gateway/users"
	"github.com/go-redis/redis"
)

//main is the main entry point for the server
func main() {
	//	Read the ADDR environment variable to get the address
	//  the server should listen on. If empty, default to ":443"
	addr := os.Getenv("ADDR")

	if len(addr) == 0 {
		addr = ":443"
	}
	// tlsCert for HTTPS
	tlsCertPath := os.Getenv("TLSCERT")
	tlsKeyPath := os.Getenv("TLSKEY")

	if len(tlsCertPath) == 0 || len(tlsKeyPath) == 0 {
		fmt.Fprint(os.Stderr, "no TLS public or private cert environment variable")
		os.Exit(1)
	}

	sessionKey := os.Getenv("SESSIONKEY")
	if len(sessionKey) == 0 {
		log.Fatal("Missing sessionKey")
	}
	redisAddr := os.Getenv("REDISADDR")
	if len(redisAddr) == 0 {
		log.Fatal("Missing Redis Address")
	}
	dsn := os.Getenv("DSN")
	if len(dsn) == 0 {
		log.Fatal("Missing DSN to open DB")
	}

	redisClient := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0, // use default DB
	})

	hour, _ := time.ParseDuration("1h")
	sessionStore := sessions.NewRedisStore(redisClient, hour)
	userStore := users.NewSQLStore(dsn)
	if userStore == nil {
		log.Fatal("Error opening the database")
	}
	//ensure that the database gets closed when we are done
	defer userStore.Database.Close()

	context := &handlers.HandlerContext{
		SigningKey:   sessionKey,
		SessionStore: sessionStore,
		UserStore:    userStore,
	}

	// Create a new mux for the web server.
	mux := http.NewServeMux()

	// Tell the mux to call your handlers.SummaryHandler function
	// when the "/v1/summary" URL path is requested.
	mux.HandleFunc("/v1/summary", handlers.SummaryHandler)

	mux.HandleFunc("/v1/users", context.UsersHandler)
	mux.HandleFunc("/v1/users/", context.SpecificUserHandler)

	mux.HandleFunc("/v1/sessions", context.SessionHandler)
	mux.HandleFunc("/v1/sessions/", context.SpecificSessionHandler)

	wrappedMux := handlers.NewCORSHandler(mux)

	//	Start a web server listening on the address you read from
	// the environment variable, using the mux you created as
	// the root handler. Use log.Fatal() to report any errors
	// that occur when trying to start the web server.
	log.Printf("Server is listening at port %s", addr)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
}
