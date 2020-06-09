package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
	"sync/atomic"
	"time"

	"github.com/Gottacatchemall/servers/gateway/handlers"
	"github.com/Gottacatchemall/servers/gateway/models/users"
	"github.com/Gottacatchemall/servers/gateway/sessions"
	"github.com/go-redis/redis"
)

// Director is the director
type Director func(r *http.Request)

// CustomDirector is the custom director for the reverse proxy
func CustomDirector(targets []*url.URL, context *handlers.HandlerContext) Director {
	var counter int32 = 0

	return func(r *http.Request) {
		log.Printf("here")
		log.Printf(r.RequestURI)
		targ := targets[int(counter)%len(targets)]
		atomic.AddInt32(&counter, 1)

		r.Header.Add("X-Forwarded-Host", r.Host)
		r.Host = targ.Host
		r.URL.Host = targ.Host
		r.URL.Scheme = targ.Scheme

		sessionState := &handlers.SessionState{}
		_, err := sessions.GetState(r, context.SigningKey, context.SessionStore, sessionState)
		if err != nil {
			r.Header.Del("X-User")
		} else {
			user := &users.User{ID: sessionState.User.ID}
			json, _ := json.Marshal(user)
			r.Header.Set("X-User", string(json))
		}
	}
}

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

	summaryaddr := os.Getenv("SUMMARYADDR")
	if len(summaryaddr) == 0 {
		log.Fatal("no summary address found")
	}
	var summaryAddresses []*url.URL
	for _, addr := range strings.Split(summaryaddr, ",") {
		urlParsesAddr, err := url.Parse(addr)
		if err != nil {
			log.Fatalf("error parsing address: %s", err)
		}
		summaryAddresses = append(summaryAddresses, urlParsesAddr)
	}
	summaryProxy := &httputil.ReverseProxy{Director: CustomDirector(summaryAddresses, context)}

	messagesaddr := os.Getenv("MESSAGESADDR")
	if len(messagesaddr) == 0 {
		log.Fatal("no messages address found")
	}
	var messageAddresses []*url.URL
	messagesAddrArray := strings.Split(messagesaddr, ",")
	for _, addr := range messagesAddrArray {
		urlParsesAddr, err := url.Parse(addr)
		if err != nil {
			log.Fatalf("error parsing address: %s", err)
		}
		messageAddresses = append(messageAddresses, urlParsesAddr)
	}
	messagingProxy := &httputil.ReverseProxy{Director: CustomDirector(messageAddresses, context)}

	pokemonaddr := os.Getenv("POKEMONADDR")
	if len(pokemonaddr) == 0 {
		log.Fatal("no pokemon address found")
	}
	var pokemonAddresses []*url.URL
	pokemonAddrArray := strings.Split(pokemonaddr, ",")
	for _, addr := range pokemonAddrArray {
		urlParsesAddr, err := url.Parse(addr)
		if err != nil {
			log.Fatalf("error parsing address: %s", err)
		}
		pokemonAddresses = append(pokemonAddresses, urlParsesAddr)
	}
	pokemonProxy := &httputil.ReverseProxy{Director: CustomDirector(pokemonAddresses, context)}

	// Create a new mux for the web server.
	mux := http.NewServeMux()

	mux.Handle("/v1/summary", summaryProxy)

	mux.HandleFunc("/v1/users", context.UsersHandler)
	mux.HandleFunc("/v1/users/", context.SpecificUserHandler)

	mux.HandleFunc("/v1/sessions", context.SessionHandler)
	mux.HandleFunc("/v1/sessions/", context.SpecificSessionHandler)

	mux.Handle("/v1/channels", messagingProxy)
	mux.Handle("/v1/channels/", messagingProxy)
	mux.Handle("/v1/messages", messagingProxy)
	mux.Handle("/v1/messages/", messagingProxy)

	mux.Handle("/v1/pokedex", pokemonProxy)
	mux.Handle("/v1/pokedex/", pokemonProxy)
	mux.Handle("/v1/encounter", pokemonProxy)
	mux.Handle("/v1/runaway", pokemonProxy)
	mux.Handle("/v1/catch/", pokemonProxy)
	mux.Handle("/v1/inventory", pokemonProxy)
	mux.Handle("/v1/items/", pokemonProxy)
	mux.Handle("/v1/team", pokemonProxy)
	mux.Handle("/v1/team/", pokemonProxy)

	wrappedMux := handlers.NewCORSHandler(mux)

	//	Start a web server listening on the address you read from
	// the environment variable, using the mux you created as
	// the root handler. Use log.Fatal() to report any errors
	// that occur when trying to start the web server.
	log.Printf("Server is listening at port %s", addr)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
}
