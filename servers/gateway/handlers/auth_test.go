package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/Gottacatchemall/servers/gateway/models/users"
	"github.com/Gottacatchemall/servers/gateway/sessions"
)

func TestUserHandler(t *testing.T) {
	testSingleRequestUsersHandler(t)
	testMultipleRequestsUsersHandlers(t)
	testInvalidRequestUserHandler(t)
}

func TestSpecificUserHandler(t *testing.T) {
	testGETSpecificUserHandler(t)
	testPATCHSpecificUserHandler(t)
	testInvalidPATCHSpecificUserHandler(t)
}

func TestSessionHandler(t *testing.T) {
	testValidSessionsHandler(t)
	testInvalidSessionsHandler(t)
}

func TestSpecificSessionHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// add an user to the store and make it the current user giving request
	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	userHandlerResponse := makeRequestUsersHandler("POST", requestBody, context)
	insertedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(userHandlerResponse.Body)
	if err := json.Unmarshal([]byte(responseData), insertedUser); err != nil {
		t.Errorf("Test SpecificSessionsHandler: Error unmarshalling response. Check if you are encoding properly")
	}
	authToken := userHandlerResponse.Header().Get(sessions.HeaderAuthorization)
	////////////////////////////////
	url := "/v1/sessions/mine"
	response := makeRequestSpecificSesssionHandler("DELETE", url, authToken, context)

	// check if the response contains the plain text signed out
	if response.Body.String() != "signed out" {
		t.Errorf("Test SpecificSessionsHandler: User not signedout correctly. Expected %v but got %v", "signed out", response.Body.String())
	}

	/////////////////////////////////
	// check if the session has been deleted. If we try to delete it again it should give an error
	request, _ := http.NewRequest("DELETE", url, nil)
	// add the auth token received by the POST
	request.Header.Add(sessions.HeaderAuthorization, authToken)

	sid, _ := sessions.GetSessionID(request, context.SigningKey)
	// Get from the session store should return an error because the user should already be deleted
	if err := sessionStore.Get(sid, &SessionState{}); err == nil {
		t.Errorf("Test SpecificSessionHandler: Session not deleted from store, Expected %v but got %v", sessions.ErrStateNotFound, nil)
	}

	////////////////////////////////
	// check if the request path is not mine
	url = "/v1/sessions/mee"
	response = makeRequestSpecificSesssionHandler("DELETE", url, authToken, context)
	// check if the response  code is 403
	if response.Code != http.StatusForbidden {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusForbidden, response.Code)
	}

	//////////////////////////////
	// test if method is not delete
	url = "/v1/sessions/mine"
	response = makeRequestSpecificSesssionHandler("POST", url, authToken, context)
	// check if the response  code is 405
	if response.Code != http.StatusMethodNotAllowed {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusMethodNotAllowed, response.Code)
	}
}

func testSingleRequestUsersHandler(t *testing.T) {
	context := HandlerContext{
		"npham24",
		sessions.NewMemStore(100, 10),
		NewMockUserDB(),
	}

	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	response := makeRequestUsersHandler("POST", requestBody, context)

	// test if the response code is 201
	if response.Code != http.StatusCreated {
		t.Errorf("Test UserHandler: Expected %v status code, but got %v", http.StatusCreated, response.Code)
	}

	// test if the content-type is application-json
	responseHeaderContentType := response.Header().Get(headerContentType)
	if responseHeaderContentType != applicationJSON {
		t.Errorf("Test UserHandler: Expected header content type %v, but got %v", applicationJSON, responseHeaderContentType)
	}

	// test if the returned user has correct field
	returnedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(response.Body)
	if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
		t.Errorf("Test UserHandler: Error unmarshalling response. Check if you are encoding properly")
	}

	if returnedUser.ID != 1 {
		t.Errorf("Test UserHandler: Error returned user ID. Expected %v, got %v", 1, returnedUser.ID)
	}

	if returnedUser.Email != "" {
		t.Errorf("Test UserHandler: Error returned user email. This should be empty")
	}

	if returnedUser.PassHash != nil {
		t.Errorf("Test UserHandler: Error returned user passhash. This should be nil")
	}

	if returnedUser.UserName != testNewUser.UserName {
		t.Errorf("Test UserHandler: Error returned user username. Expected %v but got %v", testNewUser.UserName, returnedUser.UserName)
	}

	if returnedUser.FirstName != testNewUser.FirstName {
		t.Errorf("Test UserHandler: Error returned user first name. Expected %v but got %v", testNewUser.FirstName, returnedUser.FirstName)
	}

	if returnedUser.LastName != testNewUser.LastName {
		t.Errorf("Test UserHandler: Error returned user last name. Expected %v but got %v", testNewUser.LastName, returnedUser.LastName)
	}

	// test if the user is authorized with the session token
	responseHeaderAuthToken := response.Header().Get(sessions.HeaderAuthorization)
	if !strings.HasPrefix(responseHeaderAuthToken, sessions.SchemeBearer) {
		t.Errorf("Test UserHandler: Error response does not have an auth token. Check if your BeginSession code")
	}
}

func testMultipleRequestsUsersHandlers(t *testing.T) {
	repeat := 5
	var expectedID int64 = 1

	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()

	for i := 0; i < repeat; i++ {
		context := HandlerContext{
			users.GenerateRandomString(6, true),
			sessionStore,
			userStore,
		}

		testNewUser := users.GenerateValidNewUser()
		requestBody, err := json.Marshal(testNewUser)

		// in case our generateValidNewUser is not working as intended
		if err != nil {
			t.Errorf("Test UserHandler: Error marshalling JSON for random new user. This is not your fault.")
		}

		response := makeRequestUsersHandler("POST", requestBody, context)

		// test if the response code is 201
		if response.Code != http.StatusCreated {
			t.Errorf("Test UserHandler: Expected %v status code, but got %v", http.StatusCreated, response.Code)
		}

		// test if the content-type is application-json
		responseHeaderContentType := response.Header().Get(headerContentType)
		if responseHeaderContentType != applicationJSON {
			t.Errorf("Test UserHandler: Expected header content type %v, but got %v", applicationJSON, responseHeaderContentType)
		}

		// test if the returned user has correct field
		returnedUser := &users.User{}
		responseData, _ := ioutil.ReadAll(response.Body)
		if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
			t.Errorf("Test UserHandler: Error unmarshalling response. Check if you are encoding properly")
		}

		if returnedUser.ID != expectedID {
			t.Errorf("Test UserHandler: Error returned user ID. Expected %v, got %v", expectedID, returnedUser.ID)
		}

		if returnedUser.Email != "" {
			t.Errorf("Test UserHandler: Error returned user email. This should be empty")
		}

		if returnedUser.PassHash != nil {
			t.Errorf("Test UserHandler: Error returned user passhash. This should be nil")
		}

		if returnedUser.UserName != testNewUser.UserName {
			t.Errorf("Test UserHandler: Error returned user username. Expected %v but got %v", testNewUser.UserName, returnedUser.UserName)
		}

		if returnedUser.FirstName != testNewUser.FirstName {
			t.Errorf("Test UserHandler: Error returned user first name. Expected %v but got %v", testNewUser.FirstName, returnedUser.FirstName)
		}

		if returnedUser.LastName != testNewUser.LastName {
			t.Errorf("Test UserHandler: Error returned user last name. Expected %v but got %v", testNewUser.LastName, returnedUser.LastName)
		}

		// test if the user is authorized with the session token
		responseHeaderAuthToken := response.Header().Get(sessions.HeaderAuthorization)
		if !strings.HasPrefix(responseHeaderAuthToken, sessions.SchemeBearer) {
			t.Errorf("Test UserHandler: Error response does not have an auth token. Check if your BeginSession code")
		}
		expectedID++
	}
}

func testInvalidRequestUserHandler(t *testing.T) {
	context := HandlerContext{
		"npham24",
		sessions.NewMemStore(100, 10),
		NewMockUserDB(),
	}
	// test valid new user with a GET request
	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	response := makeRequestUsersHandler("GET", requestBody, context)

	if response.Code != http.StatusMethodNotAllowed {
		t.Errorf("Test UserHandler: Wrong error code on GET request: expected %v but got %v", http.StatusMethodNotAllowed, response.Code)
	}

	// test if requestBody is not JSON
	response = httptest.NewRecorder()
	request, _ := http.NewRequest("POST", "v1/users/", bytes.NewReader([]byte("")))
	request.Header.Set(headerContentType, "text/plain")
	context.UsersHandler(response, request)
	if response.Code != http.StatusUnsupportedMediaType {
		t.Errorf("Test UserHandler: Expected %v status code, but got %v", http.StatusUnsupportedMediaType, response.Code)
	}

	// try to insert the user into the same database twice, should give an error
	// this should be valid since we are inserting a valid user
	response = makeRequestUsersHandler("POST", requestBody, context)
	if response.Code != http.StatusCreated {
		t.Errorf("Test UserHandler: Expected %v status code, but got %v", http.StatusCreated, response.Code)
	}

	// this should give error since we are inserting an user twice
	response = makeRequestUsersHandler("POST", requestBody, context)
	if response.Code != http.StatusBadRequest {
		t.Errorf("Test UserHandler: Expected %v status code on repeatedly requesting the same user, but got %v", http.StatusBadRequest, response.Code)
	}

	// test invalid new user json
	response = makeRequestUsersHandler("POST", []byte(""), context)

	if response.Code != http.StatusBadRequest {
		t.Errorf("Test UserHandler: Wrong error code on a bad request (not a new user json): expected %v but got %v", http.StatusBadRequest, response.Code)
	}

	// if signing key is empty, a new sessionID cannot be created, thus we cannot begin a session for the user
	context.SigningKey = ""
	testNewUser2 := users.GenerateValidNewUser()
	requestBody, _ = json.Marshal(testNewUser2)
	response = makeRequestUsersHandler("POST", requestBody, context)
	if response.Code != http.StatusInternalServerError {
		t.Errorf("Test UserHandler: Wrong error code on empty signing key request: expected %v but got %v", http.StatusInternalServerError, response.Code)
	}
}

func makeRequestUsersHandler(requestMethod string, requestBody []byte, context HandlerContext) *httptest.ResponseRecorder {
	response := httptest.NewRecorder()

	request, _ := http.NewRequest(requestMethod, "v1/users/", bytes.NewReader(requestBody))
	request.Header.Set(headerContentType, applicationJSON)
	context.UsersHandler(response, request)

	return response
}

func testGETSpecificUserHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// add an user to the store and make it the current user giving request
	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	userHandlerResponse := makeRequestUsersHandler("POST", requestBody, context)
	insertedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(userHandlerResponse.Body)
	if err := json.Unmarshal([]byte(responseData), insertedUser); err != nil {
		t.Errorf("Test UserHandler GET: Error unmarshalling response. Check if you are encoding properly")
	}
	authToken := userHandlerResponse.Header().Get(sessions.HeaderAuthorization)
	////////////////////////////////

	response := httptest.NewRecorder()

	url := "/v1/users/1"
	request, _ := http.NewRequest("GET", url, nil)
	// add the auth token received by the POST
	request.Header.Add(sessions.HeaderAuthorization, authToken)

	context.SpecificUserHandler(response, request)

	// test if the response code is 200
	if response.Code != http.StatusOK {
		t.Errorf("Test SpecificUserHandler GET: Expected %v status code, but got %v", http.StatusOK, response.Code)
	}

	// test if the content-type is application-json
	responseHeaderContentType := response.Header().Get(headerContentType)
	if responseHeaderContentType != applicationJSON {
		t.Errorf("Test SpecificUserHandler GET: Expected header content type %v, but got %v", applicationJSON, responseHeaderContentType)
	}

	returnedUser := &users.User{}
	responseData, _ = ioutil.ReadAll(response.Body)
	if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
		t.Errorf("Test SpecificUserHandler GET: Error unmarshalling response. Check if you are encoding properly")
	}

	// insertedUser and returnedUser should have same fields except for email and passhash
	if returnedUser.ID != 1 {
		t.Errorf("Test SpecificUserHandler GET: Error returned user ID. Expected %v, got %v", 1, returnedUser.ID)
	}

	if returnedUser.Email != "" {
		t.Errorf("Test SpecificUserHandler GET: Error returned user email. This should be empty")
	}

	if returnedUser.PassHash != nil {
		t.Errorf("Test SpecificUserHandler GET: Error returned user passhash. This should be nil")
	}

	if returnedUser.UserName != insertedUser.UserName {
		t.Errorf("Test SpecificUserHandler GET: Error returned user username. Expected %v but got %v", insertedUser.UserName, returnedUser.UserName)
	}

	if returnedUser.FirstName != insertedUser.FirstName {
		t.Errorf("Test SpecificUserHandler GET: Error returned user first name. Expected %v but got %v", insertedUser.FirstName, returnedUser.FirstName)
	}

	if returnedUser.LastName != insertedUser.LastName {
		t.Errorf("Test SpecificUserHandler GET: Error returned user last name. Expected %v but got %v", insertedUser.LastName, returnedUser.LastName)
	}

	if returnedUser.PhotoURL != insertedUser.PhotoURL {
		t.Errorf("Test SpecificUserHandler GET: Error returned user photoURL name. Expected %v but got %v", insertedUser.PhotoURL, returnedUser.PhotoURL)
	}

	// check if we can GET other people in the user store
	num := 3
	otherUsers := addRandomPeopleToStore(num, sessionStore, userStore)
	for id := 2; id < 2+num; id++ {
		response = httptest.NewRecorder()
		url = "/v1/users/" + strconv.Itoa(id)
		request, _ = http.NewRequest("GET", url, nil)
		// add the auth token received by the POST
		request.Header.Add(sessions.HeaderAuthorization, authToken)

		context.SpecificUserHandler(response, request)

		returnedUser = &users.User{}
		responseData, _ = ioutil.ReadAll(response.Body)
		if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
			t.Errorf("Test SpecificUserHandler GET: Error unmarshalling response. Check if you are encoding properly")
		}

		if returnedUser.ID != otherUsers[id-2].ID {
			t.Errorf("Test SpecificUserHandler GET: Error returned user ID. Expected %v, got %v", otherUsers[id-2].ID, returnedUser.ID)
		}

		if returnedUser.UserName != otherUsers[id-2].UserName {
			t.Errorf("Test SpecificUserHandler: GET Error returned username. Expected %v, got %v", otherUsers[id-2].UserName, returnedUser.UserName)
		}
	}

	// check if GET non exist user will yield error
	invalidUserIds := []int{0, 10, 123156}
	for i := 0; i <= len(invalidUserIds); i++ {
		response = httptest.NewRecorder()
		if i == len(invalidUserIds) {
			url = "/v1/users/giejipgeq"
		} else {
			url = "/v1/users/" + strconv.Itoa(invalidUserIds[i])
		}
		request, _ = http.NewRequest("GET", url, nil)
		// add the auth token received by the POST
		request.Header.Add(sessions.HeaderAuthorization, authToken)

		context.SpecificUserHandler(response, request)

		if response.Code != http.StatusNotFound {
			t.Errorf("Test SpecificUserHandler GET: Expected %v status code, but got %v", http.StatusNotFound, response.Code)
		}
	}
}

func testPATCHSpecificUserHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// add an user to the store and make it the current user giving request
	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	userHandlerResponse := makeRequestUsersHandler("POST", requestBody, context)
	insertedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(userHandlerResponse.Body)
	if err := json.Unmarshal([]byte(responseData), insertedUser); err != nil {
		t.Errorf("Test UserHandler: Error unmarshalling response. Check if you are encoding properly")
	}
	authToken := userHandlerResponse.Header().Get(sessions.HeaderAuthorization)
	////////////////////////////////

	urlPath := []string{"1", "me"}

	for i := 0; i < len(urlPath); i++ {
		url := "/v1/users/" + urlPath[i]

		update := &users.Updates{
			FirstName: "updatedFirstName",
			LastName:  "updatedLastName",
		}

		requestBody, _ = json.Marshal(update)

		response := makeRequestSpecificUserHandler("PATCH", url, authToken, requestBody, context)

		// test if the response code is 200
		if response.Code != http.StatusOK {
			t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusOK, response.Code)
		}

		// test if the content-type is application-json
		responseHeaderContentType := response.Header().Get(headerContentType)
		if responseHeaderContentType != applicationJSON {
			t.Errorf("Test SpecificUserHandler PATCH: Expected header content type %v, but got %v", applicationJSON, responseHeaderContentType)
		}

		returnedUser := &users.User{}
		responseData, _ = ioutil.ReadAll(response.Body)
		if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
			t.Errorf("Test SpecificUserHandler PATCH: Error unmarshalling response. Check if you are encoding properly")
		}

		// insertedUser and returnedUser should have same fields except for email and passhash
		if returnedUser.ID != 1 {
			t.Errorf("Test SpecificUserHandler PATCH: Error returned user ID. Expected %v, got %v", 1, returnedUser.ID)
		}

		if returnedUser.FirstName != "updatedFirstName" {
			t.Errorf("Test SpecificUserHandler PATCH: Error returned user firstname. Expected %v, got %v", "updatedFirstName", returnedUser.FirstName)
		}

		if returnedUser.LastName != "updatedLastName" {
			t.Errorf("Test SpecificUserHandler PATCH: Error returned user lastname. Expected %v, got %v", "updatedLastName", returnedUser.LastName)
		}
	}
}

func testInvalidPATCHSpecificUserHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// test an unauthorizedUser
	response := makeRequestSpecificUserHandler("POST", "v1/users/1", "", []byte(""), context)
	if response.Code != http.StatusUnauthorized {
		t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusUnauthorized, response.Code)
	}

	// add an user to the store and make it the current user giving request
	testNewUser := users.GenerateValidNewUser()
	requestBody, _ := json.Marshal(testNewUser)

	userHandlerResponse := makeRequestUsersHandler("POST", requestBody, context)
	insertedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(userHandlerResponse.Body)
	if err := json.Unmarshal([]byte(responseData), insertedUser); err != nil {
		t.Errorf("Test UserHandler: Error unmarshalling response. Check if you are encoding properly")
	}
	authToken := userHandlerResponse.Header().Get(sessions.HeaderAuthorization)
	////////////////////////////////

	// test for a method that is not GET or PATCH and see if status code is 405
	response = makeRequestSpecificUserHandler("POST", "v1/users/1", authToken, []byte(""), context)
	if response.Code != http.StatusMethodNotAllowed {
		t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusMethodNotAllowed, response.Code)
	}

	// test for url path that is not the current user and me
	urlPath := []string{"2", "meeeee"}
	for i := 0; i < len(urlPath); i++ {
		url := "/v1/users/" + urlPath[i]

		update := &users.Updates{
			FirstName: "updatedFirstName",
			LastName:  "updatedLastName",
		}

		requestBody, _ = json.Marshal(update)

		response := makeRequestSpecificUserHandler("PATCH", url, authToken, requestBody, context)

		// test if the response code is 403
		if response.Code != http.StatusForbidden {
			t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusForbidden, response.Code)
		}
	}

	// test bad request body
	url := "/v1/users/1" //valid URL
	response = makeRequestSpecificUserHandler("PATCH", url, authToken, []byte(""), context)
	// test if the response code is 403
	if response.Code != http.StatusBadRequest {
		t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusBadRequest, response.Code)
	}

	// test bad update
	update := &users.Updates{
		FirstName: "",
		LastName:  "",
	}
	requestBody, _ = json.Marshal(update)
	response = makeRequestSpecificUserHandler("PATCH", url, authToken, requestBody, context)
	// test if the response code is 403
	if response.Code != http.StatusBadRequest {
		t.Errorf("Test SpecificUserHandler PATCH: Expected %v status code, but got %v", http.StatusBadRequest, response.Code)
	}
}

func makeRequestSpecificUserHandler(requestMethod string, url string, authToken string, requestBody []byte, context HandlerContext) *httptest.ResponseRecorder {
	response := httptest.NewRecorder()

	request, _ := http.NewRequest(requestMethod, url, bytes.NewReader(requestBody))
	// add the auth token received by the POST
	request.Header.Add(sessions.HeaderAuthorization, authToken)
	request.Header.Set(headerContentType, applicationJSON)

	context.SpecificUserHandler(response, request)

	return response
}

func addRandomPeopleToStore(num int, sessionStore sessions.Store, userStore users.Store) []*users.User {
	result := []*users.User{}
	context := HandlerContext{
		users.GenerateRandomString(6, true),
		sessionStore,
		userStore,
	}
	for i := 0; i < num; i++ {
		newUser := users.GenerateValidNewUser()
		user, _ := newUser.ToUser()
		returnedUser, _ := context.UserStore.Insert(user)
		result = append(result, returnedUser)
	}
	return result
}

func testValidSessionsHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// put an user in the user store
	newUser := users.GenerateValidNewUser()
	user, _ := newUser.ToUser()
	insertedUser, _ := context.UserStore.Insert(user)

	// constructing the POST request to session handler
	credentials := &users.Credentials{
		Email:    newUser.Email,
		Password: newUser.Password,
	}

	requestBody, _ := json.Marshal(credentials)
	url := "/v1/sessions/"
	response := makeRequestSesssionHandler("POST", url, requestBody, context)

	// test if the response code is 201
	if response.Code != http.StatusCreated {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusCreated, response.Code)
	}

	// test if the content-type of response is application-json
	responseHeaderContentType := response.Header().Get(headerContentType)
	if responseHeaderContentType != applicationJSON {
		t.Errorf("Test UserHandler: Expected header content type %v, but got %v", applicationJSON, responseHeaderContentType)
	}

	// test if the returned user has correct field
	returnedUser := &users.User{}
	responseData, _ := ioutil.ReadAll(response.Body)
	if err := json.Unmarshal([]byte(responseData), returnedUser); err != nil {
		t.Errorf("Test SessionHandler: Error unmarshalling response. Check if you are encoding properly")
	}

	if returnedUser.UserName != insertedUser.UserName {
		t.Errorf("Test SessionHandler: Incorrect returned username. Expected %v but got %v", insertedUser.UserName, returnedUser.UserName)
	}

	if returnedUser.Email != "" {
		t.Errorf("Test SessionHandler: Incorrect returned user. Expected %v but got %v", "", returnedUser.Email)
	}

	// test if a session was began
	responseHeaderAuthToken := response.Header().Get(sessions.HeaderAuthorization)
	if !strings.HasPrefix(responseHeaderAuthToken, sessions.SchemeBearer) {
		t.Errorf("Test UserHandler: Error response does not have an auth token. Check if your BeginSession code")
	}
}

func testInvalidSessionsHandler(t *testing.T) {
	minute, _ := time.ParseDuration("1m")
	sessionStore := sessions.NewMemStore(minute, minute)
	userStore := NewMockUserDB()
	context := HandlerContext{
		"npham24",
		sessionStore,
		userStore,
	}

	// put an user in the user store
	newUser := users.GenerateValidNewUser()
	user, _ := newUser.ToUser()
	context.UserStore.Insert(user)

	// get a random password that is different from the original
	randPassword := users.GenerateRandomString(6, true)
	for randPassword == newUser.Password {
		randPassword = users.GenerateRandomString(6, true)
	}

	url := "/v1/sessions/"

	// constructing the wrong Password credential POST request to session handler
	credentials := &users.Credentials{
		Email:    newUser.Email,
		Password: randPassword,
	}

	requestBody, _ := json.Marshal(credentials)
	response := makeRequestSesssionHandler("POST", url, requestBody, context)

	// test if the response code is 401
	if response.Code != http.StatusUnauthorized {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusUnauthorized, response.Code)
	}

	///////////////
	// construct a request with empty request body
	response = makeRequestSesssionHandler("POST", url, []byte(""), context)
	// test if the response code is 400
	if response.Code != http.StatusBadRequest {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusBadRequest, response.Code)
	}

	////////////////
	// constructing the wrong Email credential POST request to session handler
	credentials = &users.Credentials{
		Email:    "abc@1234.com",
		Password: newUser.Password,
	}

	requestBody, _ = json.Marshal(credentials)
	response = makeRequestSesssionHandler("POST", url, requestBody, context)

	// test if the response code is 401
	if response.Code != http.StatusUnauthorized {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusUnauthorized, response.Code)
	}

	////////////////
	// test if content header is not JSON
	response = httptest.NewRecorder()

	request, _ := http.NewRequest("POST", url, bytes.NewReader(requestBody))
	// add the auth token received by the POST
	request.Header.Set(headerContentType, "plain/text")

	context.SessionHandler(response, request)
	// test if the response code is 415
	if response.Code != http.StatusUnsupportedMediaType {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusUnsupportedMediaType, response.Code)
	}

	////////////////
	// test if we send another method than POST
	credentials = &users.Credentials{
		Email:    newUser.Email,
		Password: newUser.Password,
	}
	requestBody, _ = json.Marshal(credentials)
	response = makeRequestSesssionHandler("GET", url, requestBody, context)
	// test if response code is 405
	if response.Code != http.StatusMethodNotAllowed {
		t.Errorf("Test SessionHandler: Expected %v status code, but got %v", http.StatusMethodNotAllowed, response.Code)
	}
}

func makeRequestSesssionHandler(requestMethod string, url string, requestBody []byte, context HandlerContext) *httptest.ResponseRecorder {
	response := httptest.NewRecorder()

	request, _ := http.NewRequest(requestMethod, url, bytes.NewReader(requestBody))
	// add the auth token received by the POST
	request.Header.Set(headerContentType, applicationJSON)

	context.SessionHandler(response, request)

	return response
}

func makeRequestSpecificSesssionHandler(requestMethod string, url string, authToken string, context HandlerContext) *httptest.ResponseRecorder {
	response := httptest.NewRecorder()
	request, _ := http.NewRequest(requestMethod, url, nil)
	// add the auth token received by the POST
	request.Header.Add(sessions.HeaderAuthorization, authToken)

	context.SpecificSessionHandler(response, request)
	return response
}
