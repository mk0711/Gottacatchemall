package users

import "time"

// UserLog is used to log the data of the user who signs in
type UserLog struct {
	ID        int64
	UserID    int64
	StartAt   time.Time
	IPAddress string
}
