package handlers

import (
	"time"

	"github.com/Gottacatchemall/servers/gateway/models/users"
)

//SessionState captures the signing key, what time the session began,
// and which user started the session
type SessionState struct {
	SigningKey string      `json:"signingKey"`
	StartAt    time.Time   `json:"startAt"`
	User       *users.User `json:"user"`
}
