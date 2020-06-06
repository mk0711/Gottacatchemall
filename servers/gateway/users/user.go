package users

import (
	"fmt"
	"net/mail"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

//bcryptCost is the default bcrypt cost to use when hashing passwords
var bcryptCost = 13

//User represents a user account in the database
type User struct {
	ID        int64  `json:"id"`
	Email     string `json:"-"` //never JSON encoded/decoded
	PassHash  []byte `json:"-"` //never JSON encoded/decoded
	UserName  string `json:"userName"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

//Credentials represents user sign-in credentials
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//NewUser represents a new user signing up for an account
type NewUser struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	UserName     string `json:"userName"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
}

//Updates represents allowed updates to a user profile
type Updates struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	//password or email
}

//Validate validates the new user and returns an error if
//any of the validation rules fail, or nil if its valid
func (nu *NewUser) Validate() error {
	_, err := mail.ParseAddressList(nu.Email)
	if err != nil {
		return fmt.Errorf("Email field must be a valid email address")
	}
	if len([]rune(nu.Password)) < 6 {
		return fmt.Errorf("Pasword must be at least 6 characters")
	}
	if nu.Password != nu.PasswordConf {
		return fmt.Errorf("Password must match PasswordConf")
	}
	if len(nu.UserName) == 0 {
		return fmt.Errorf("User name not provided")
	}
	if strings.Contains(nu.UserName, " ") {
		return fmt.Errorf("User name cannot contain spaces")
	}
	return nil
}

//ToUser converts the NewUser to a User, setting the
func (nu *NewUser) ToUser() (*User, error) {
	err := nu.Validate()
	if err != nil {
		return nil, err
	}
	emailValid := strings.ToLower(strings.TrimSpace(nu.Email))
	user := &User{
		Email:     emailValid,
		UserName:  nu.UserName,
		FirstName: nu.FirstName,
		LastName:  nu.LastName,
	}
	errs := user.SetPassword(nu.Password)
	if errs != nil {
		return nil, errs
	}
	return user, nil
}

//FullName returns the user's full name, in the form:
// "<FirstName> <LastName>"
//If either first or last name is an empty string, no
//space is put between the names. If both are missing,
//this returns an empty string
func (u *User) FullName() string {
	if len(u.FirstName) != 0 && len(u.LastName) != 0 {
		return u.FirstName + " " + u.LastName
	} else if len(u.FirstName) == 0 && len(u.LastName) != 0 {
		return u.LastName
	} else if len(u.LastName) == 0 && len(u.FirstName) != 0 {
		return u.FirstName
	}
	return ""
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	p, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return err
	}
	u.PassHash = p
	return nil
}

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	return bcrypt.CompareHashAndPassword(u.PassHash, []byte(password))
}

//ApplyUpdates applies the updates to the user. An error
//is returned if the updates are invalid
func (u *User) ApplyUpdates(updates *Updates) error {
	if updates.FirstName == "" && updates.LastName == "" {
		fmt.Errorf("no update %s")
	}
	if len(updates.FirstName) > 0 && len(updates.LastName) == 0 {
		u.FirstName = updates.FirstName
	}
	if len(updates.LastName) > 0 && len(updates.FirstName) == 0 {
		u.LastName = updates.LastName
	}
	return nil
}
