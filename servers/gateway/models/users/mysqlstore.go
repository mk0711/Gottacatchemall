package users

import (
	"database/sql"
	"log"

	// this import is to use MySQL
	_ "github.com/go-sql-driver/mysql"
)

//SQLStore represents an SQL Database
type SQLStore struct {
	Database *sql.DB
}

// constant to hold the table name of the users schema
const users = "users"

// constant to hold the table name of the userLog schema
const usersSignInLog = "usersSignInLog"

//NewSQLStore constructs and returns a new SQLStore

//NewSQLStore initialize a new sql store
func NewSQLStore(dsn string) *SQLStore {
	//create the data source name, which identifies the
	//user, password, server address, and default database

	//create a database object, which manages a pool of
	//network connections to the database server
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatal("error opening database")
		return nil
	}
	log.Print("Opened DB successfully")

	sqlStore := &SQLStore{}
	sqlStore.Database = db

	return sqlStore
}

// GetByQuery helper function return an user struct with a query string
func GetByQuery(queryName string, query interface{}, ss *SQLStore) (*User, error) {
	// could use select * but this is more explicit
	queryParam := "id, email, pass_hash, username, first_name, last_name, photo_url"

	// expecting a single row
	row := ss.Database.QueryRow("select "+queryParam+" from "+users+" where "+queryName+"=?", query)

	user := &User{}
	if err := row.Scan(
		&user.ID,
		&user.Email,
		&user.PassHash,
		&user.UserName,
		&user.FirstName,
		&user.LastName,
		&user.PhotoURL,
	); err != nil {
		return nil, ErrUserNotFound
	}

	return user, nil
}

//GetByID returns the User with the given ID
func (ss *SQLStore) GetByID(id int64) (*User, error) {
	return GetByQuery("id", id, ss)
}

//GetByEmail returns the User with the given email
func (ss *SQLStore) GetByEmail(email string) (*User, error) {
	return GetByQuery("email", email, ss)
}

//GetByUserName returns the User with the given Username
func (ss *SQLStore) GetByUserName(username string) (*User, error) {
	return GetByQuery("username", username, ss)
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned ID
func (ss *SQLStore) Insert(user *User) (*User, error) {
	insertQuery := "insert into " + users +
		"(email, pass_hash, username, first_name, last_name, photo_url) values (?,?,?,?,?,?)"
	response, err := ss.Database.Exec(insertQuery,
		user.Email,
		user.PassHash,
		user.UserName,
		user.FirstName,
		user.LastName,
		user.PhotoURL,
	)

	if err != nil {
		return nil, err
	}

	id, err := response.LastInsertId()

	if err != nil {
		return nil, err
	}

	user.ID = id
	return user, nil
}

//Update applies UserUpdates to the given user ID
//and returns the newly-updated user
func (ss *SQLStore) Update(id int64, updates *Updates) (*User, error) {
	updateQuery := "update " + users + " " + "set first_name = ?, last_name = ? where id = ?"

	_, err := ss.Database.Exec(updateQuery, updates.FirstName, updates.LastName, id)

	if updates.FirstName == "" && updates.LastName == "" {
		return nil, ErrUpdateUser
	}

	if err != nil {
		return nil, ErrUpdateUser
	}

	return ss.GetByID(id)
}

//Delete deletes the user with the given ID
func (ss *SQLStore) Delete(id int64) error {
	deleteQuery := "delete from " + users + " where id = ?"

	_, err := ss.Database.Exec(deleteQuery, id)
	if err != nil {
		return ErrDeleteUser
	}
	return nil
}

//GetUserLogByID return the userLog with the given ID
func (ss *SQLStore) GetUserLogByID(id int64) (*UserLog, error) {
	queryParam := "id, user_id, start_at, ip_addr"

	// expecting a single row
	row := ss.Database.QueryRow("select "+queryParam+" from "+usersSignInLog+" where id=?", id)

	userLog := &UserLog{}
	if err := row.Scan(
		&userLog.ID,
		&userLog.UserID,
		&userLog.StartAt,
		&userLog.IPAddress,
	); err != nil {
		return nil, ErrUserLogNotFound
	}

	return userLog, nil
}

//InsertUserLog inserts the user log into the database
func (ss *SQLStore) InsertUserLog(userLog *UserLog) (*UserLog, error) {
	insertQuery := "insert into " + usersSignInLog +
		"(user_id, start_at, ip_addr) values (?,?,?)"
	response, err := ss.Database.Exec(insertQuery,
		userLog.UserID,
		userLog.StartAt,
		userLog.IPAddress,
	)

	if err != nil {
		return nil, ErrInsertingUserLog
	}

	id, err := response.LastInsertId()

	if err != nil {
		return nil, err
	}
	userLog.ID = id

	return userLog, nil
}

//DeleteUserLog deletes the userLog with the given ID
func (ss *SQLStore) DeleteUserLog(id int64) error {
	deleteQuery := "delete from " + usersSignInLog + " where id = ?"

	_, err := ss.Database.Exec(deleteQuery, id)
	if err != nil {
		return ErrDeleteUserLog
	}
	return nil
}
