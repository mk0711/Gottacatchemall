package sessions

import (
	"errors"
	"net/http"
	"strings"
)

// HeaderAuthorization to refer to the authorization in the header
const HeaderAuthorization = "Authorization"
const paramAuthorization = "auth"

// SchemeBearer to refer to the start of an auth token
const SchemeBearer = "Bearer "

//ErrNoSessionID is used when no session ID was found in the Authorization header
var ErrNoSessionID = errors.New("no session ID found in " + HeaderAuthorization + " header")

//ErrInvalidScheme is used when the authorization scheme is not supported
var ErrInvalidScheme = errors.New("authorization scheme not supported")

//BeginSession creates a new SessionID, saves the `sessionState` to the store, adds an
//Authorization header to the response with the SessionID, and returns the new SessionID
func BeginSession(signingKey string, store Store, sessionState interface{}, w http.ResponseWriter) (SessionID, error) {
	// create a new SessionID
	sid, err := NewSessionID(signingKey)

	if err != nil {
		// sid should = InvalidSessionID in this case
		return InvalidSessionID, err
	}

	// save the sessionState to the store
	store.Save(sid, sessionState)

	// add a header to the ResponseWriter that looks like this:
	// "Authorization: Bearer <sessionID>"
	// where "<sessionID>" is replaced with the newly-created SessionID
	w.Header().Add(HeaderAuthorization, SchemeBearer+sid.String())

	return sid, nil
}

//GetSessionID extracts and validates the SessionID from the request headers
func GetSessionID(r *http.Request, signingKey string) (SessionID, error) {
	//get the value of the Authorization header,
	//or the "auth" query string parameter if no Authorization header is present,
	//and validate it. If it's valid, return the SessionID. If not
	//return the validation error.

	auth := r.Header.Get(HeaderAuthorization)

	if auth == "" {
		// get sid from the "auth" query string parameter if no
		// Authorization header is present,
		auth = r.URL.Query().Get(paramAuthorization)
	}

	headerSid := strings.Split(auth, " ")

	if len(headerSid) < 2 {
		return InvalidSessionID, ErrNoSessionID
	}

	scheme := headerSid[0] + " "
	if scheme != SchemeBearer {
		return InvalidSessionID, ErrInvalidScheme
	}
	id := headerSid[1]

	sid, err := ValidateID(id, signingKey)

	if err != nil {
		return InvalidSessionID, err
	}

	return sid, nil
}

//GetState extracts the SessionID from the request,
//gets the associated state from the provided store into
//the `sessionState` parameter, and returns the SessionID
func GetState(r *http.Request, signingKey string, store Store, sessionState interface{}) (SessionID, error) {
	sid, errExtractSid := GetSessionID(r, signingKey)
	if errExtractSid != nil {
		return InvalidSessionID, errExtractSid
	}

	errGetSidFromStore := store.Get(sid, sessionState)
	if errGetSidFromStore != nil {
		return InvalidSessionID, errGetSidFromStore
	}

	return sid, nil
}

//EndSession extracts the SessionID from the request,
//and deletes the associated data in the provided store, returning
//the extracted SessionID.
func EndSession(r *http.Request, signingKey string, store Store) (SessionID, error) {
	sid, errExtractSid := GetSessionID(r, signingKey)
	if errExtractSid != nil {
		return InvalidSessionID, errExtractSid
	}

	errDelSidFromStore := store.Delete(sid)
	if errDelSidFromStore != nil {
		return InvalidSessionID, errDelSidFromStore
	}

	return sid, nil
}
