package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Gottacatchemall/servers/gateway/sessions"
	"github.com/Gottacatchemall/servers/gateway/users"
	"golang.org/x/crypto/bcrypt"
)

const headerContentType = "Content-Type"
const applicationJSON = "application/json"

//UsersHandler handle requests for the "users" resource
func (context *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {
	// For any other HTTP method than POST, respond with an http.StatusMethodNotAllowed (405) error.
	if r.Method != "POST" {
		http.Error(w, "Status method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// If the request's Content-Type header does not start with application/json,
	// respond with status code http.StatusUnsupportedMediaType (415),
	// and a message indicating that the request body must be in JSON.
	respondErrorIfContentHeaderIsNotJSON(w, r)

	// The request body should contain JSON that can be decoded into the users.NewUser struct.
	// Ensure the data is valid and create a new user account in the database.
	newUser := &users.NewUser{}

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(newUser); err != nil {
		http.Error(w, "Error decoding JSON in request body", http.StatusBadRequest)
		return
	}

	user, err := newUser.ToUser()

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = context.UserStore.Insert(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Begin a new session for the new user.
	sessionState := &SessionState{
		SigningKey: context.SigningKey,
		StartAt:    time.Now(),
		User:       user,
	}

	_, err = sessions.BeginSession(context.SigningKey, context.SessionStore, sessionState, w)

	if err != nil {
		http.Error(w, "Error creating session", http.StatusInternalServerError)
		return
	}

	// Respond to the client with:
	// A status code of http.StatusCreated (201) to indicate that a new resource was created.
	// A response Content-Type header set to application/json to indicate that the response body is encoded as JSON.
	// The new user profile in the response body, encoded as a JSON object.
	respondJSONToClient(http.StatusCreated, user, w, r)
}

// SpecificUserHandler handles requests for a specific user.
// The resource path will be /v1/users/{UserID}, where {UserID} will be the user's ID.
// As a convenience, clients can also use the literal string me to refer to the UserID of the currently-authenticated user.
// So /v1/users/me refers to the currently-authenticated user,
// and /v1/users/1234 refers to the user with the ID 1234 (which could be the same user).
func (context *HandlerContext) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {
	// The current user must be authenticated to call this handler regardless of HTTP method.
	// If the user is not authenticated, respond immediately with an http.StatusUnauthorized (401) error status code
	// test if the user is authorized with the session token

	currSessionState := &SessionState{}
	_, err := sessions.GetState(r, context.SigningKey, context.SessionStore, currSessionState)
	if err != nil {
		// cannot find the session in the store => user not authenticated
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	if r.Method != "GET" && r.Method != "PATCH" {
		http.Error(w, "Status method not allowed. GET and PATCH only", http.StatusMethodNotAllowed)
		return
	}

	// If the request method is GET:
	if r.Method == "GET" {
		// Get the user profile associated with the requested user ID from your store.
		// If no user is found with that ID, respond with an http.StatusNotFound (404) status code.
		requestedUserID, err := strconv.Atoi(getLastURLPath(r))

		if err != nil {
			http.Error(w, "No user found with this ID", http.StatusNotFound)
			return
		}

		user, err := context.UserStore.GetByID(int64(requestedUserID))

		if err != nil {
			http.Error(w, "No user found with this ID", http.StatusNotFound)
			return
		}

		// Otherwise, respond to the client with:
		// a status code of http.StatusOK (200).
		// a response Content-Type header set to application/json to indicate that the response body is encoded as JSON
		// the users.User struct returned by your store in the response body, encoded as a JSON object.
		respondJSONToClient(http.StatusOK, user, w, r)
	}

	// If the request method is PATCH:
	if r.Method == "PATCH" {
		// If the user ID in the request URL is not "me" or does not match the currently-authenticated user,
		// immediately respond with an http.StatusForbidden (403) error status code and appropriate error message.
		requestedUserID := getLastURLPath(r)

		if requestedUserID != "me" {
			if reqIDint, err := strconv.Atoi(requestedUserID); err == nil {
				if int64(reqIDint) != currSessionState.User.ID {
					http.Error(w, "Error requesting user that is not yourself", http.StatusForbidden)
					return
				}
			} else {
				http.Error(w, "Error requesting user that is not yourself", http.StatusForbidden)
				return
			}
		}

		// If the request's Content-Type header does not start with application/json,
		// respond with status code http.StatusUnsupportedMediaType (415),
		// and a message indicating that the request body must be in JSON.
		respondErrorIfContentHeaderIsNotJSON(w, r)

		// The request body should contain JSON that can be decoded into the users.Updates struct.
		// Use that to update the user's profile.
		updates := &users.Updates{}

		decoder := json.NewDecoder(r.Body)

		if err := decoder.Decode(updates); err != nil {
			http.Error(w, "Error decoding JSON in request body", http.StatusBadRequest)
			return
		}

		user, err := context.UserStore.Update(currSessionState.User.ID, updates)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		currSessionState.User = user

		// Respond to the client with:
		// a status code of http.StatusOK (200).
		// a response Content-Type header set to application/json to indicate that the response body is encoded as JSON.
		// a full copy of the updated user profile in the response body, encoded as a JSON object.
		respondJSONToClient(http.StatusOK, currSessionState.User, w, r)
	}
}

// SessionHandler handles requests for the "sessions" resource,
// and allows clients to begin a new session using an existing user's credentials.
func (context *HandlerContext) SessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Status method not allowed. POST only", http.StatusMethodNotAllowed)
		return
	}

	// If the request's Content-Type header does not start with application/json,
	// respond with status code http.StatusUnsupportedMediaType (415),
	// and a message indicating that the request body must be in JSON.
	respondErrorIfContentHeaderIsNotJSON(w, r)

	// The request body should contain JSON that can be decoded into a users.Credentials struct.
	// Use those credentials to find the user profile and authenticate.

	credentials := &users.Credentials{}

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(credentials); err != nil {
		http.Error(w, "Error decoding JSON in request body", http.StatusBadRequest)
		return
	}

	user, err := context.UserStore.GetByEmail(credentials.Email)

	// If you don't find the user profile, do something that would take about the same amount of time as
	// authenticating, and then respond with a http.StatusUnauthorized error status code and generic message "invalid credentials".
	if user == nil || err != nil {
		bcrypt.GenerateFromPassword([]byte("abcde1234567"), 13)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Respond with the same error if you find the profile but fail to authenticate.
	if err := user.Authenticate(credentials.Password); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// log successful user sign-in attempts
	userLog := &users.UserLog{
		ID:        user.ID,
		StartAt:   time.Now(),
		IPAddress: getUserIP(r),
	}
	context.UserStore.InsertUserLog(userLog)

	// If authentication is successful, begin a new session
	sessionState := &SessionState{
		SigningKey: context.SigningKey,
		StartAt:    time.Now(),
		User:       user,
	}

	_, err = sessions.BeginSession(context.SigningKey, context.SessionStore, sessionState, w)

	if err != nil {
		http.Error(w, "Error creating session", http.StatusInternalServerError)
		return
	}

	// Respond to the client with:
	// a status code of http.StatusCreated (201) to indicate that a new resource was created.
	// a response Content-Type header set to application/json to indicate that the response body is encoded as JSON.
	// a copy of the user's profile in the response body, encoded as a JSON object.
	respondJSONToClient(http.StatusCreated, user, w, r)
}

// SpecificSessionHandler handles requests related to a specific authenticated session.
// For now, the only operation we will support is ending the current user's session.
// But this could be expanded to allow administrators to end sessions started by other users that have gone rogue.
// The resource path for the current user's session will be /v1/sessions/mine.
func (context *HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		http.Error(w, "Status method not allowed. DELETE only", http.StatusMethodNotAllowed)
		return
	}

	mine := getLastURLPath(r)

	// If the last path segment does not equal "mine",
	// immediately respond with an http.StatusForbidden (403) error status code and appropriate error message.
	if mine != "mine" {
		http.Error(w, "Delete action forbidden", http.StatusForbidden)
		return
	}

	// End the current session.
	_, err := sessions.EndSession(r, context.SigningKey, context.SessionStore)

	if err != nil {
		http.Error(w, "Error ending session", http.StatusForbidden)
		return
	}

	// Respond with the plain text message "signed out"
	w.Write([]byte("signed out"))
}

// HELPER FUNCTIONS ////////////

func respondErrorIfContentHeaderIsNotJSON(w http.ResponseWriter, r *http.Request) {
	// If the request's Content-Type header does not start with application/json,
	// respond with status code http.StatusUnsupportedMediaType (415),
	// and a message indicating that the request body must be in JSON.
	if !strings.HasPrefix(r.Header.Get(headerContentType), applicationJSON) {
		http.Error(w, "Request body must be JSON", http.StatusUnsupportedMediaType)
		return
	}
}

func respondJSONToClient(statusCode int, responseObj interface{}, w http.ResponseWriter, r *http.Request) {
	w.Header().Set(headerContentType, applicationJSON)
	w.WriteHeader(statusCode)

	responseBody, _ := json.Marshal(responseObj)

	w.Write(responseBody)
}

func getLastURLPath(r *http.Request) string {
	lastSlashIndex := strings.LastIndex(r.URL.String(), "/")
	lastURLPath := r.URL.String()[lastSlashIndex+1:]
	return lastURLPath
}

func getUserIP(r *http.Request) string {
	// The client IP address from which the sign-in request came.
	// Use the RemoteAddr field from the http.Request struct to get this value.
	//  If an X-Forwarded-For header is included, use the first IP address in the list instead.
	IPAddress := r.Header.Get("X-Forwarded-For")
	if IPAddress != "" {
		IPAddress = strings.Split(IPAddress, ", ")[0]
	} else {
		IPAddress = r.RemoteAddr
	}
	return IPAddress
}
