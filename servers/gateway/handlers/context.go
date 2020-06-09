package handlers

import (
	"github.com/Gottacatchemall/servers/gateway/models/users"
	"github.com/Gottacatchemall/servers/gateway/sessions"
)

// HandlerContext is a receiver on any of your HTTP
//handler functions that need access to
//globals, such as the key used for signing
//and verifying SessionIDs, the session store
//and the user store
type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    users.Store
}
