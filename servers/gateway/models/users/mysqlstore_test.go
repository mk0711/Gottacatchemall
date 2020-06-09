package users

import (
	"reflect"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
)

// TestGetByID is a test function for the SQLStore's GetByID
func TestGetByID(t *testing.T) {
	// Create a slice of test cases
	cases := []struct {
		name         string
		expectedUser *User
		idToGet      int64
		expectError  bool
	}{
		{
			"User Found",
			&User{
				1,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			1,
			false,
		},
		{
			"User Not Found",
			&User{},
			2,
			true,
		},
		{
			"User With Large ID Found",
			&User{
				1234567890,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			1234567890,
			false,
		},
		{
			"User With Empty firstname",
			&User{
				3,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"",
				"lastname",
				"photourl",
			},
			3,
			false,
		},
		{
			"User With Empty lastname",
			&User{
				4,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"",
				"photourl",
			},
			4,
			false,
		},
	}

	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New()
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		// Create an expected row to the mock DB
		row := mock.NewRows([]string{
			"id",
			"email",
			"pass_hash",
			"username",
			"first_name",
			"last_name",
			"photo_url"},
		).AddRow(
			c.expectedUser.ID,
			c.expectedUser.Email,
			c.expectedUser.PassHash,
			c.expectedUser.UserName,
			c.expectedUser.FirstName,
			c.expectedUser.LastName,
			c.expectedUser.PhotoURL,
		)

		query := "select id, email, pass_hash, username, first_name, last_name, photo_url from users where id=?"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectQuery(query).WithArgs(c.idToGet).WillReturnError(ErrUserNotFound)

			// Test GetByID()
			user, err := mainSQLStore.GetByID(c.idToGet)
			if user != nil || err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrUserNotFound, err)
			}
		} else {
			// Set up an expected query with the expected row from the mock DB
			mock.ExpectQuery(query).WithArgs(c.idToGet).WillReturnRows(row)

			// Test GetByID()
			user, err := mainSQLStore.GetByID(c.idToGet)
			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}
			if !reflect.DeepEqual(user, c.expectedUser) {
				t.Errorf("Error, invalid match in test [%s]", c.name)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}

// TestGetByEmail is a test function for the SQLStore's GetByEmail
func TestGetByEmail(t *testing.T) {
	// Create a slice of test cases
	randomEmail := generateValidUserEmail()
	randomLongEmail := GenerateRandomString(255-len("@test.com"), false) + "@test.com"
	cases := []struct {
		name         string
		expectedUser *User
		emailToGet   string
		expectError  bool
	}{
		{
			"User Found",
			&User{
				1,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			"test@test.com",
			false,
		},
		{
			"User Not Found",
			&User{},
			"",
			true,
		},
		{
			"User Found 2",
			&User{
				2,
				"test2@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			"test2@test.com",
			false,
		},
		{
			"User With Randomly Generated Email",
			&User{
				3,
				randomEmail,
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			randomEmail,
			false,
		},
		{
			"User With Long Email",
			&User{
				4,
				randomLongEmail,
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			randomLongEmail,
			false,
		},
	}

	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New()
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		// Create an expected row to the mock DB
		row := mock.NewRows([]string{
			"id",
			"email",
			"pass_hash",
			"username",
			"first_name",
			"last_name",
			"photo_url"},
		).AddRow(
			c.expectedUser.ID,
			c.expectedUser.Email,
			c.expectedUser.PassHash,
			c.expectedUser.UserName,
			c.expectedUser.FirstName,
			c.expectedUser.LastName,
			c.expectedUser.PhotoURL,
		)

		query := "select id, email, pass_hash, username, first_name, last_name, photo_url from users where email=?"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectQuery(query).WithArgs(c.emailToGet).WillReturnError(ErrUserNotFound)

			// Test GetByEmail()
			user, err := mainSQLStore.GetByEmail(c.emailToGet)
			if user != nil || err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrUserNotFound, err)
			}
		} else {
			// Set up an expected query with the expected row from the mock DB
			mock.ExpectQuery(query).WithArgs(c.emailToGet).WillReturnRows(row)

			// Test GetByEmail()
			user, err := mainSQLStore.GetByEmail(c.emailToGet)
			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}
			if !reflect.DeepEqual(user, c.expectedUser) {
				t.Errorf("Error, invalid match in test [%s]", c.name)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}

// TestGetByUserName is a test function for the SQLStore's GetByUserName
func TestGetByUserName(t *testing.T) {
	// Create a slice of test cases
	randomUsername := GenerateRandomString(10, true)
	randomLongUsername := GenerateRandomString(255, true)
	cases := []struct {
		name          string
		expectedUser  *User
		usernameToGet string
		expectError   bool
	}{
		{
			"User Found",
			&User{
				1,
				"test@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			"username",
			false,
		},
		{
			"User Not Found",
			&User{},
			"",
			true,
		},
		{
			"User Found 2",
			&User{
				2,
				"test@test.com",
				[]byte("passhash123"),
				"username2",
				"firstname",
				"lastname",
				"photourl",
			},
			"username2",
			false,
		},
		{
			"User With Randomly Generated Username",
			&User{
				3,
				"test@test.com",
				[]byte("passhash123"),
				randomUsername,
				"firstname",
				"lastname",
				"photourl",
			},
			randomUsername,
			false,
		},
		{
			"User With Long Username Email",
			&User{
				4,
				"test@test.com",
				[]byte("passhash123"),
				randomLongUsername,
				"firstname",
				"lastname",
				"photourl",
			},
			randomLongUsername,
			false,
		},
	}

	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New()
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		// Create an expected row to the mock DB
		row := mock.NewRows([]string{
			"id",
			"email",
			"pass_hash",
			"username",
			"first_name",
			"last_name",
			"photo_url"},
		).AddRow(
			c.expectedUser.ID,
			c.expectedUser.Email,
			c.expectedUser.PassHash,
			c.expectedUser.UserName,
			c.expectedUser.FirstName,
			c.expectedUser.LastName,
			c.expectedUser.PhotoURL,
		)

		query := "select id, email, pass_hash, username, first_name, last_name, photo_url from users where username=?"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectQuery(query).WithArgs(c.usernameToGet).WillReturnError(ErrUserNotFound)

			// Test GetByUserName()
			user, err := mainSQLStore.GetByUserName(c.usernameToGet)
			if user != nil || err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrUserNotFound, err)
			}
		} else {
			// Set up an expected query with the expected row from the mock DB
			mock.ExpectQuery(query).WithArgs(c.usernameToGet).WillReturnRows(row)

			// Test GetByUserName()
			user, err := mainSQLStore.GetByUserName(c.usernameToGet)
			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}
			if !reflect.DeepEqual(user, c.expectedUser) {
				t.Errorf("Error, invalid match in test [%s]", c.name)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}

// TestInsert is a test function for the SQLStore's Insert
func TestInsert(t *testing.T) {
	// Create a slice of test cases
	cases := []struct {
		name        string
		user        *User
		expectError bool
	}{
		{
			"Insert Valid User",
			&User{
				1,
				"test1@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			false,
		},
		{
			"Insert Invalid User",
			&User{},
			true,
		},
		{
			"Insert User with LargeID",
			&User{
				1234567890,
				"test2@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			false,
		},
		{
			"Insert User with ID = 0",
			&User{
				0,
				"test3@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			false,
		},
	}

	var expectedID int64 = 0
	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		query := "insert into " + users +
			"(email, pass_hash, username, first_name, last_name, photo_url) values (?,?,?,?,?,?)"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectExec(query).WithArgs(
				c.user.Email,
				c.user.PassHash,
				c.user.UserName,
				c.user.FirstName,
				c.user.LastName,
				c.user.PhotoURL).WillReturnError(ErrInsertingUser)

			// Test Insert()
			user, err := mainSQLStore.Insert(c.user)
			if user != nil || err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrInsertingUser, err)
			}
		} else {
			// Set up an expected query with the expected row from the mock DB

			// incremente expectedID on successful query
			expectedID++

			mock.ExpectExec(query).WithArgs(
				c.user.Email,
				c.user.PassHash,
				c.user.UserName,
				c.user.FirstName,
				c.user.LastName,
				c.user.PhotoURL).WillReturnResult(sqlmock.NewResult(expectedID, 1))

			// Test Insert()
			user, err := mainSQLStore.Insert(c.user)

			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}
			if user.ID != expectedID {
				t.Errorf("Error, invalid returned ID, expected %v but got %v", expectedID, user.ID)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}

//TestUpdate test the update function
func TestUpdate(t *testing.T) {
	// Create a slice of test cases
	cases := []struct {
		name        string
		user        *User
		updates     *Updates
		idToUpdate  int64
		expectError bool
	}{
		{
			"Update Valid User",
			&User{
				1,
				"test1@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"updatedFirstName",
				"updatedLastName",
			},
			1,
			false,
		},
		{
			"Update non existent Invalid User",
			&User{},
			&Updates{
				"updatedFirstName",
				"updatedLastName",
			},
			2,
			true,
		},
		{
			"Update User with LargeID",
			&User{
				1234567890,
				"test2@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"updatedFirstName",
				"updatedLastName",
			},
			1234567890,
			false,
		},
		{
			"Update User with ID = 0",
			&User{
				0,
				"test3@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"updatedFirstName",
				"updatedLastName",
			},
			0,
			false,
		},
		{
			"Update User with Empty firstname",
			&User{
				4,
				"test4@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"",
				"updatedLastName",
			},
			4,
			false,
		},
		{
			"Update User with Empty lastname",
			&User{
				5,
				"test5@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"updatedFirstName",
				"",
			},
			5,
			false,
		},
		{
			"Update User with Empty firstname and lastname",
			&User{
				5,
				"test5@test.com",
				[]byte("passhash123"),
				"username",
				"firstname",
				"lastname",
				"photourl",
			},
			&Updates{
				"",
				"",
			},
			5,
			true,
		},
	}

	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		// Create an expected row to the mock DB
		row := mock.NewRows([]string{
			"id",
			"email",
			"pass_hash",
			"username",
			"first_name",
			"last_name",
			"photo_url"},
		).AddRow(
			c.user.ID,
			c.user.Email,
			c.user.PassHash,
			c.user.UserName,
			c.updates.FirstName,
			c.updates.LastName,
			c.user.PhotoURL,
		)

		updateQuery := "update " + users + " " + "set first_name = ?, last_name = ? where id = ?"
		selectQuery := "select id, email, pass_hash, username, first_name, last_name, photo_url from users where id=?"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectExec(updateQuery).WithArgs(
				c.updates.FirstName,
				c.updates.LastName,
				c.idToUpdate).WillReturnError(ErrUpdateUser)

			// Test Update()
			user, err := mainSQLStore.Update(c.idToUpdate, c.updates)

			if user != nil || err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrUpdateUser, err)
			}
		} else {
			// Set up an expected query with the expected result from the mock DB
			mock.ExpectExec(updateQuery).WithArgs(
				c.updates.FirstName,
				c.updates.LastName,
				c.idToUpdate).WillReturnResult(sqlmock.NewResult(c.idToUpdate, 1))

			// Set up an expected query with the expected row from the mock DB
			mock.ExpectQuery(selectQuery).WithArgs(c.idToUpdate).WillReturnRows(row)

			// Test Update()
			user, err := mainSQLStore.Update(c.idToUpdate, c.updates)

			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}

			if !reflect.DeepEqual(user.FirstName, c.updates.FirstName) {
				t.Errorf("Error, invalid firstname match in test [%s]", c.name)
			}

			if !reflect.DeepEqual(user.LastName, c.updates.LastName) {
				t.Errorf("Error, invalid lastname match in test [%s]", c.name)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}

//TestDelete test the update function
func TestDelete(t *testing.T) {
	// Create a slice of test cases
	cases := []struct {
		name        string
		idToDelete  int64
		expectError bool
	}{
		{
			"Delete Valid ID",
			1,
			false,
		},
		{
			"Delete negative ID",
			-1,
			true,
		},
		{
			"Delete non-existent ID",
			9999999999,
			true,
		},
		{
			"Delete User with large ID",
			1234567890,
			false,
		},
	}

	for _, c := range cases {
		// Create a new mock database for each case
		db, mock, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
		if err != nil {
			t.Fatalf("There was a problem opening a database connection: [%v]", err)
		}
		defer db.Close()

		mainSQLStore := &SQLStore{db}

		deleteQuery := "delete from " + users + " where id = ?"

		if c.expectError {
			// Set up expected query that will expect an error
			mock.ExpectExec(deleteQuery).WithArgs(c.idToDelete).WillReturnError(ErrDeleteUser)

			// Test Delete()
			err := mainSQLStore.Delete(c.idToDelete)

			if err == nil {
				t.Errorf("Expected error [%v] but got [%v] instead", ErrDeleteUser, err)
			}
		} else {
			// Set up an expected query with the expected result from the mock DB
			mock.ExpectExec(deleteQuery).WithArgs(c.idToDelete).WillReturnResult(
				sqlmock.NewResult(c.idToDelete, 1))

			// Test Delete()
			err := mainSQLStore.Delete(c.idToDelete)

			if err != nil {
				t.Errorf("Unexpected error on successful test [%s]: %v", c.name, err)
			}
		}

		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("There were unfulfilled expectations: %s", err)
		}
	}
}
