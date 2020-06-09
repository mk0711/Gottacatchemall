package users

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"net/mail"
	"strconv"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

//gravatarBasePhotoURL is the base URL for Gravatar image requests.
//See https://id.gravatar.com/site/implement/images/ for details
const gravatarBasePhotoURL = "https://www.gravatar.com/avatar/"

//minPasswordLength is the mininum password length needed for new
//user to be valid
const minPasswordLength int = 6

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
	PhotoURL  string `json:"photoURL"`
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
}

//ErrInvalidEmail is returned from NewUser.Validate() when the email
//field is not valid
var ErrInvalidEmail = fmt.Errorf("Email field must be a valid email address")

var shortPasswrdErrMsg = "Password must be at least " + strconv.Itoa(minPasswordLength) + " characters"

//ErrShortPassword is returned from NewUser.Validate() when
//the password is not at least 6 characters
var ErrShortPassword = fmt.Errorf(shortPasswrdErrMsg)

//ErrMismatchPassword is returned from NewUser.Validate() when
//the password is not the same as the confirm password
var ErrMismatchPassword = fmt.Errorf("Password and PasswordConf must match")

//ErrEmptyUserName is returned from NewUser.Validate() when
//the username is of zero length
var ErrEmptyUserName = errors.New("UserName must be non-zero length")

//ErrUserNameContainsSpaces  is returned from NewUser.Validate() when
//the username contains spaces
var ErrUserNameContainsSpaces = fmt.Errorf("UserName may not contain spaces")

//Validate validates the new user and returns an error if
//any of the validation rules fail, or nil if its valid
func (nu *NewUser) Validate() error {
	if _, err := mail.ParseAddress(nu.Email); err != nil {
		return ErrInvalidEmail
	}

	if len(nu.Password) < minPasswordLength {
		return ErrShortPassword
	}

	if nu.Password != nu.PasswordConf {
		return ErrMismatchPassword
	}

	if len(nu.UserName) == 0 {
		return ErrEmptyUserName
	}

	if strings.Contains(nu.UserName, " ") {
		return ErrUserNameContainsSpaces
	}
	return nil
}

//ToUser converts the NewUser to a User, setting the
//PhotoURL and PassHash fields appropriately
func (nu *NewUser) ToUser() (*User, error) {
	if errValidateUsr := nu.Validate(); errValidateUsr != nil {
		return nil, errValidateUsr
	}

	user := &User{}
	user.Email = nu.Email
	user.UserName = nu.UserName

	user.FirstName = strings.Trim(nu.FirstName, " ")
	user.LastName = strings.Trim(nu.LastName, " ")

	user.SetPassword(nu.Password)

	trimmedLowerCaseNUEmail := strings.Trim(strings.ToLower(nu.Email), " ")
	hashedBytes := md5.Sum([]byte(trimmedLowerCaseNUEmail))
	hash := hashedBytes[:]
	user.PhotoURL = gravatarBasePhotoURL + hex.EncodeToString(hash)

	return user, nil
}

//FullName returns the user's full name, in the form:
// "<FirstName> <LastName>"
//If either first or last name is an empty string, no
//space is put between the names. If both are missing,
//this returns an empty string
func (u *User) FullName() string {
	firstName := ""
	if u.FirstName != "" {
		firstName = strings.Trim(u.FirstName, " ")
	}

	lastName := ""
	if u.LastName != "" {
		lastName = strings.Trim(u.LastName, " ")
	}

	seperator := " "
	if u.FirstName == "" || u.LastName == "" {
		seperator = ""
	}

	return firstName + seperator + lastName
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	if len(password) < minPasswordLength {
		return ErrShortPassword
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return errors.New("Error genereating bcrypt hash")
	}
	u.PassHash = hash

	return nil
}

// ErrInvalidPassword is returned from Authenticate() when
// the user enter a password that does not match the PashHash
var ErrInvalidPassword = fmt.Errorf("Invalid password")

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	if err := bcrypt.CompareHashAndPassword(u.PassHash, []byte(password)); err != nil {
		// password does not match sotred hash
		return ErrInvalidPassword
	}
	return nil
}

//ErrBothFirstAndLastNameEmpty is returned from ApplyUpdates() when
//both first and last name is empty
var ErrBothFirstAndLastNameEmpty = fmt.Errorf("Both FirstName and LastName cannot be empty")

//ErrUpdateCannotBeNil is returned from ApplyUpdates() when
//updates is nil
var ErrUpdateCannotBeNil = fmt.Errorf("Both FirstName and LastName cannot be empty")

//ApplyUpdates applies the updates to the user. An error
//is returned if the updates are invalid
func (u *User) ApplyUpdates(updates *Updates) error {
	if updates == nil {
		return ErrUpdateCannotBeNil
	}
	if len(updates.FirstName) == 0 && len(updates.LastName) == 0 {
		return ErrBothFirstAndLastNameEmpty
	}
	u.FirstName = strings.Trim(updates.FirstName, " ")
	u.LastName = strings.Trim(updates.LastName, " ")
	return nil
}
