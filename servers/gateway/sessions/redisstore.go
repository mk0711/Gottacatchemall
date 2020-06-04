package sessions

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/go-redis/redis"
)

//RedisStore represents a session.Store backed by redis.
type RedisStore struct {
	//Redis client used to talk to redis server.
	Client *redis.Client
	//Used for key expiry time on redis.
	SessionDuration time.Duration
}

//NewRedisStore constructs a new RedisStore
func NewRedisStore(client *redis.Client, sessionDuration time.Duration) *RedisStore {
	//initialize and return a new RedisStore struct
	rs := &RedisStore{}
	rs.Client = client
	rs.SessionDuration = sessionDuration
	return rs
}

//Store implementation

//Save saves the provided `sessionState` and associated SessionID to the store.
//The `sessionState` parameter is typically a pointer to a struct containing
//all the data you want to associated with the given SessionID.
func (rs *RedisStore) Save(sid SessionID, sessionState interface{}) error {
	// marshal the `sessionState` to JSON and save it in the redis database,
	// using `sid.getRedisKey()` for the key.
	// serialize the sessionState object to JSON
	jsonBuffer, err := json.Marshal(sessionState)
	if err != nil {
		return errors.New("Error marshalling sessionState JSON")
	}

	rs.Client.Set(sid.getRedisKey(), jsonBuffer, rs.SessionDuration)
	return nil
}

//Get populates `sessionState` with the data previously saved
//for the given SessionID
func (rs *RedisStore) Get(sid SessionID, sessionState interface{}) error {
	// get the previously-saved session state data from redis, using pipelining
	rsPipeline := rs.Client.Pipeline()

	// reset the expiry time, so that it doesn't get deleted until
	// the SessionDuration has elapsed.
	prevSessionInPipeline := rsPipeline.Get(sid.getRedisKey())

	rsPipeline.Expire(sid.getRedisKey(), rs.SessionDuration)

	// Execute:
	// Get()
	// Expire()
	rsPipeline.Exec()

	prevSessionState, err := prevSessionInPipeline.Result()

	if err != nil {
		return ErrStateNotFound
	}

	// unmarshal the previously-saved session state data from redis
	// back into the `sessionState` parameter
	jsonBuffer := []byte(prevSessionState)
	if err := json.Unmarshal(jsonBuffer, sessionState); err != nil {
		return ErrStateNotFound
	}
	return nil
}

//Delete deletes all state data associated with the SessionID from the store.
func (rs *RedisStore) Delete(sid SessionID) error {
	rs.Client.Del(sid.getRedisKey())
	return nil
}

//getRedisKey() returns the redis key to use for the SessionID
func (sid SessionID) getRedisKey() string {
	//convert the SessionID to a string and add the prefix "sid:" to keep
	//SessionID keys separate from other keys that might end up in this
	//redis instance
	return "sid:" + sid.String()
}
