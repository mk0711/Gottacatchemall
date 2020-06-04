package handlers

import (
	"net/http"
)

// CORSHandler is  middleware handler, as described
// in https://drstearns.github.io/tutorials/cors/ that responds
// with the following headers to all requests:
//  Access-Control-Allow-Origin: *
//  Access-Control-Allow-Methods: GET, PUT, POST, PATCH, DELETE
//  Access-Control-Allow-Headers: Content-Type, Authorization
//  Access-Control-Expose-Headers: Authorization
//  Access-Control-Max-Age: 600
type CORSHandler struct {
	Handler http.Handler
}

const headerCORS = "Access-Control-Allow-Origin"
const corsAnyOrigin = "*"

const headerAccessControlAllowMethods = "Access-Control-Allow-Methods"
const headerAccessControlAllowHeaders = "Access-Control-Allow-Headers"
const headerAccessControlExposeHeaders = "Access-Control-Expose-Headers"
const headerAccessControlMaxAge = "Access-Control-Max-Age"

// ServeHTTP handles the request by passing it to the real
// handler and logging the request details
func (c *CORSHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//  Access-Control-Allow-Origin: *
	w.Header().Set(headerCORS, corsAnyOrigin)
	w.Header().Set(headerAccessControlAllowMethods, "GET, PUT, POST, PATCH, DELETE")
	w.Header().Set(headerAccessControlAllowHeaders, "Content-Type, Authorization")
	w.Header().Set(headerAccessControlExposeHeaders, "Authorization")
	w.Header().Set(headerAccessControlMaxAge, "600")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	c.Handler.ServeHTTP(w, r)
}

// NewCORSHandler constructs a new CORS handler that writes to the header of all incoming request middleware handler
func NewCORSHandler(handlerToWrap http.Handler) *CORSHandler {
	return &CORSHandler{handlerToWrap}
}
