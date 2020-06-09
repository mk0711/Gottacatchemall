package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCORSHandler(t *testing.T) {
	response := httptest.NewRecorder()
	request, _ := http.NewRequest("GET", "/v1/test/", bytes.NewReader([]byte("")))

	handler := NewCORSHandler(http.HandlerFunc(dummyHandler))
	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Errorf("Correct headers are not being written, expected status code %v but got %v", http.StatusOK, response.Code)
	}

	response = httptest.NewRecorder()
	request, _ = http.NewRequest("OPTIONS", "/v1/test/", bytes.NewReader([]byte("")))

	handler = NewCORSHandler(http.HandlerFunc(dummyHandler))
	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Errorf("Correct headers are not being written, expected status code %v but got %v", http.StatusOK, response.Code)
	}
}

func dummyHandler(w http.ResponseWriter, r *http.Request) {
	if w.Header().Get(headerCORS) != corsAnyOrigin {
		w.WriteHeader(http.StatusBadRequest)
	}

	if w.Header().Get(headerAccessControlAllowMethods) != "GET, PUT, POST, PATCH, DELETE" {
		w.WriteHeader(http.StatusBadRequest)
	}

	if w.Header().Get(headerAccessControlAllowHeaders) != "Content-Type, Authorization" {
		w.WriteHeader(http.StatusBadRequest)
	}

	if w.Header().Get(headerAccessControlExposeHeaders) != "Authorization" {
		w.WriteHeader(http.StatusBadRequest)
	}

	if w.Header().Get(headerAccessControlMaxAge) != "600" {
		w.WriteHeader(http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
}
