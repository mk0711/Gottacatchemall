package users

import (
	"database/sql"
	"fmt"
)

//SQLStore ...
type SQLStore struct {
	db *sql.DB
}

//NewSQLStore ...
func NewSQLStore(db *sql.DB) (*SQLStore, error) {
	if db == nil {
		return nil, fmt.Errorf("empty database")
	}
	return &SQLStore{db}, nil
}

//GetByID returns the user with the given id
func (mql *SQLStore) GetByID(id int64) (*User, error) {
	rows, err := mql.db.Query("SELECT * FROM users WHERE id = ?", id)
	if err != nil {
		return nil, fmt.Errorf("id not found %v", err)
	}
	defer rows.Close()
	user := &User{}
	for rows.Next() {
		err := rows.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName, &user.FirstName, &user.LastName)
		if err != nil {
			return nil, fmt.Errorf("error scanning rows %v", err)
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, fmt.Errorf("user not found %v", err)
	}
	return user, nil
}


//GetByEmail returns the user with the given email 
func (mql *SQLStore) GetByEmail(email string) (*User, error) {
	rows, err := mql.db.Query("SELECT * FROM users WHERE email = ?", email)
	if err != nil {
		return nil, fmt.Errorf("id not found %v", err)
	}
	defer rows.Close()
	user := &User{}
	for rows.Next() {
		err := rows.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName, &user.FirstName, &user.LastName)
		if err != nil {
			return nil, fmt.Errorf("error scanning rows %v", err)
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, fmt.Errorf("user not found %v", err)
	}
	return user, nil
}

//GetByUserName returns the user with the given username 
func (mql *SQLStore) GetByUserName(username string) (*User, error) {
	rows, err := mql.db.Query("SELECT * FROM users WHERE userName = ?", username)
	if err != nil {
		return nil, fmt.Errorf("id not found %v", err)
	}
	defer rows.Close()
	user := &User{}
	for rows.Next() {
		err := rows.Scan(&user.ID, &user.Email, &user.PassHash, &user.UserName, &user.FirstName, &user.LastName)
		if err != nil {
			return nil, fmt.Errorf("error scanning rows %v", err)
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, fmt.Errorf("user not found %v", err)
	}
	return user, nil
}

//Insert inserts the user into the database, and returns
//the newly-inserted user
func (mql *SQLStore) Insert(user *User) (*User, error) {
	insq := "INSERT INTO users(email, pass_hash, user_name, first_name, last_name) values (?,?,?,?,?)"
	res, err := mql.db.Exec(insq, user.Email, user.PassHash, user.UserName, user.FirstName, user.LastName)
	if err != nil {
		return nil, fmt.Errorf("Insertion failed")
	}

	id, err := res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("error getting new ID: %v", err)
	}
	user.ID = id
	return user, nil
}

//Update applies UserUpdates to the given user ID and returns the newly updated user 
func (mql *SQLStore) Update(id int64, updates *Updates) (*User, error) {
	user, err := mql.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("user id not found %v", err)
	}
	insq := "UPDATE INTO users SET firstName = ? lastName = ? WHERE id = ?"
	_, err = mql.db.Exec(insq, updates.FirstName, updates.LastName, id)
	if err != nil {
		return nil, fmt.Errorf("update failed")
	}
	return user, nil
 }

 //Delete deltes the user with the given ID 
 func (mql *SQLStore) Delete(id int64) (err error) {
 	_, err = mql.db.Exec("DELETE * FROM users WHERE id = ?", id)
 	if err != nil {
 		return ErrUserNotFound
	 }
	 return nil
 }