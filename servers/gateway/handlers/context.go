package handlers

import (
	"github.com/Gottacatchemall/servers/gateway/sessions"
	"github.com/Gottacatchemall/servers/gateway/users"
)

// HandlerContext is a receiver on any of your HTTP
type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    users.Store
}
