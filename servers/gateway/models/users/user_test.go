package users

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"math/rand"
	"strconv"
	"strings"
	"testing"

	"golang.org/x/crypto/bcrypt"
)

//repeat is how many times we want a random test to repeat
const repeat = 100

//max email length is the max length of the portion before the "@" of the email
const MaxEmailLen = 20

//valid NewUser example is used to provide a template for a valid user
var validNewUserExample NewUser = NewUser{
	Email:        "np24@gmail.com",
	Password:     "@b>Abc1234!",
	PasswordConf: "@b>Abc1234!",
	UserName:     "npham24_bs",
	FirstName:    "Nam",
	LastName:     "Pham",
}

func TestValidateUser(t *testing.T) {
	validUser := &NewUser{
		Email:        "newuser@gmail.com",
		Password:     "AgoaR#Y&(Q&!!QF",
		PasswordConf: "AgoaR#Y&(Q&!!QF",
		UserName:     "username",
		FirstName:    "First",
		LastName:     "Last",
	}

	if err := validUser.Validate(); err != nil {
		t.Errorf("Incorrect user validation. Expected no error but got %v", err)
	}

	testNUnonValidNewUserEmails(t)
	testNUvalidEmails(t)
	testNUmatchingPasswords(t)
	testNUmisMatchPasswords(t)
	testNUshortPassWords(t)
	testNUappropriateLengthPasswords(t)
	testNUemptyUserName("", t)
	testNUmanyUserNamesContainsSpaces(t)
}

func TestToUser(t *testing.T) {
	randomNewUser := GenerateValidNewUser()
	testTUFieldSetCorrectly(randomNewUser, t)
	testTUPasswordHashedCorrectly(randomNewUser, t)
	testTUPhotoURLHashedCorrectly(randomNewUser, t)

	testTUFieldSetCorrectly(&validNewUserExample, t)
	testTUPasswordHashedCorrectly(&validNewUserExample, t)
	testTUPhotoURLHashedCorrectly(&validNewUserExample, t)

	randomNewUser.FirstName = ""
	testTUFieldSetCorrectly(randomNewUser, t)
}

func TestUserFullName(t *testing.T) {
	user := &User{}

	tests := [...][3]string{
		// firstname, lastname, expected fullname
		{"first", "last", "first last"},
		{"first", "", "first"},
		{"", "last", "last"},
		{"", "", ""},
		{"fi rst", "las t", "fi rst las t"},
		{"fi rst", "", "fi rst"},
		{" first ", " last ", "first last"},
	}

	for _, test := range tests {
		user.FirstName = test[0]
		user.LastName = test[1]
		expected := test[2]
		if user.FullName() != expected {
			t.Errorf("User fullname does not return correctly. Expected %v but got %v", expected, user.FullName())
		}
	}
}

func TestAuthenticate(t *testing.T) {
	user := &User{}
	password := generatePassword(minPasswordLength)
	user.SetPassword(password)

	if err := user.Authenticate(password); err != nil {
		t.Errorf("Invalid error when authenticating correct password. Expected %v but got %v", nil, err)
	}

	password2 := password
	// keep generating a random password until you get a different
	// password than the original
	for password2 == password {
		password2 = generatePassword(minPasswordLength)
	}

	if err := user.Authenticate(password2); err != ErrInvalidPassword {
		t.Errorf("Invalid error when authenticating correct password. Expected %v but got %v", ErrInvalidPassword, err)
	}

	if err := user.SetPassword(""); err != ErrShortPassword {
		t.Errorf("Invalid error when setting short password. Expected %v but got %v", ErrShortPassword, err)
	}

	if err := user.Authenticate(""); err != ErrInvalidPassword {
		t.Errorf("Invalid error when authenticating correct password. Expected %v but got %v. If you got <nil> here try to see if you test for short password error in your SetPassword()", ErrInvalidPassword, err)
	}
}

func TestApplyUpdate(t *testing.T) {
	user := &User{}
	// test update nil
	if err := user.ApplyUpdates(nil); err != ErrUpdateCannotBeNil {
		t.Errorf("Invalid error when updating user with empty first and last name. Expected %v but got %v", ErrUpdateCannotBeNil, err)
	}

	update := &Updates{
		FirstName: "",
		LastName:  "",
	}

	//test update both empty
	if err := user.ApplyUpdates(update); err != ErrBothFirstAndLastNameEmpty {
		t.Errorf("Invalid error when updating user with empty first and last name. Expected %v but got %v", ErrBothFirstAndLastNameEmpty, err)
	}

	tests := [...][3]string{
		// firstname, lastname, expected fullname
		{"first", "last", "first last"},
		{"first", "", "first"},
		{"", "last", "last"},
		{"fi rst", "las t", "fi rst las t"},
		{"fi rst", "", "fi rst"},
		{" first ", " last ", "first last"},
	}

	for _, test := range tests {
		update.FirstName = test[0]
		update.LastName = test[1]
		expected := test[2]
		user.ApplyUpdates(update)
		if user.FullName() != expected {
			t.Errorf("Update not updating names correctly. Expected fullname %v after update but got %v", expected, user.FullName())
		}
	}
}

func testTUFieldSetCorrectly(newUser *NewUser, t *testing.T) {
	invalidNU := &NewUser{}
	_, err := invalidNU.ToUser()

	if err == nil {
		t.Errorf("Invalid error validating incorrect new user, Expected some validation error but got %v", nil)
	}

	user, err := newUser.ToUser()

	if err != nil {
		t.Errorf("Invalid error validating new user. Expected %v but got %v", nil, err)
	}

	if user.Email != newUser.Email {
		t.Errorf("Mismatch email between new user and user. Expected %v but got %v", newUser.Email, user.Email)
	}

	if user.UserName != newUser.UserName {
		t.Errorf("Mismatch username between new user and user. Expected %v but got %v", newUser.UserName, user.UserName)
	}

	if user.FirstName != strings.Trim(newUser.FirstName, " ") {
		t.Errorf("Mismatch first name between new user and user. Expected %v but got %v", newUser.FirstName, user.FirstName)
	}

	if user.LastName != strings.Trim(newUser.LastName, " ") {
		t.Errorf("Mismatch last name between new user and user. Expected %v but got %v", newUser.LastName, user.LastName)
	}
}

func testTUPasswordHashedCorrectly(newUser *NewUser, t *testing.T) {
	user, _ := newUser.ToUser()

	if err := bcrypt.CompareHashAndPassword(user.PassHash, []byte(newUser.Password)); err != nil {
		t.Errorf("User's PassHash field is hashed incorrectly.")
	}
}

func testTUPhotoURLHashedCorrectly(newUser *NewUser, t *testing.T) {
	numLeadingSpaces := rand.Intn(5)
	numTrailingSpaces := rand.Intn(5)

	leadingSpaces := ""
	for i := 0; i < numLeadingSpaces; i++ {
		leadingSpaces += " "
	}

	trailingSpaces := ""
	for i := 0; i < numTrailingSpaces; i++ {
		leadingSpaces += " "
	}

	cleanNUEmail := strings.Trim(strings.ToLower(newUser.Email), " ")
	hashedBytes := md5.Sum([]byte(cleanNUEmail))
	hash := hashedBytes[:]
	cleanPhotoURL := gravatarBasePhotoURL + hex.EncodeToString(hash)

	nuEmail := newUser.Email
	newUser.Email = leadingSpaces + newUser.Email + trailingSpaces
	user, _ := newUser.ToUser()

	fmt.Println(user.PhotoURL)
	fmt.Println(cleanPhotoURL)

	if cleanPhotoURL != user.PhotoURL {
		t.Errorf("PhotoURL field hashed incorrectly. Check if you are handling leading/ traling spaces and uppercase characters.")
	}
	newUser.Email = nuEmail
}

// HELPER TESTS FOR VALIDATE()
func testNUnonValidNewUserEmails(t *testing.T) {
	tests := [...]string{
		"awuheffgwh4ojg",
		"*",
		"@",
		"@@@",
		"abc@@",
		"abc@",
		"@google.com",
		"abc@@google.com",
	}

	for _, test := range tests {
		testNonValidUserEmail(test, t)
	}

	for i := 0; i < repeat; i++ {
		randEmailLength := rand.Intn(MaxEmailLen)
		randEmail := GenerateRandomString(randEmailLength, false)
		testNonValidUserEmail(randEmail, t)
	}
}

func testNUvalidEmails(t *testing.T) {
	for i := 0; i < repeat; i++ {
		randEmail := generateValidUserEmail()
		testValidUserEmail(randEmail, t)
	}
}

func testNUshortPassWords(t *testing.T) {
	for i := 0; i < repeat; i++ {
		randShortPasswordLength := rand.Intn(minPasswordLength)
		randPassword := generatePassword(randShortPasswordLength)
		testShortPassword(randPassword, t)
	}
}

func testNUappropriateLengthPasswords(t *testing.T) {
	maxPasswordLen := rand.Intn(100-minPasswordLength-1) + 1

	for i := 0; i < repeat; i++ {
		// password length from minPasswordLength to 100
		passwordLen := minPasswordLength + rand.Intn(maxPasswordLen)
		randPassword := generatePassword(passwordLen)
		testAppropriateLengthPassword(randPassword, t)
	}

	// test passwords of length minPasswordLength
	for i := 0; i < repeat; i++ {
		randPassword := generatePassword(minPasswordLength)
		testAppropriateLengthPassword(randPassword, t)
	}
}

func testNUmatchingPasswords(t *testing.T) {
	maxPasswordLen := rand.Intn(100-minPasswordLength-1) + 1

	for i := 0; i < repeat; i++ {
		passwordLen := minPasswordLength + rand.Intn(maxPasswordLen)
		randPassword := generatePassword(passwordLen)
		randConfPassword := randPassword
		testMatchingPassword(randPassword, randConfPassword, t)
	}
}

func testNUmisMatchPasswords(t *testing.T) {
	maxPasswordLen := rand.Intn(100-minPasswordLength-1) + 1

	for i := 0; i < repeat; i++ {
		passwordLen := minPasswordLength + rand.Intn(maxPasswordLen)
		randPassword := generatePassword(passwordLen)
		randPassword2 := generatePassword(passwordLen)
		if randPassword != randPassword2 {
			testMisMatchPassword(randPassword, randPassword2, t)
		}
	}
}

func testNonValidUserEmail(email string, t *testing.T) {
	newUser := validNewUserExample
	newUser.Email = email

	if err := newUser.Validate(); err != ErrInvalidEmail {
		t.Errorf("Testing NewUser.Email= \""+newUser.Email+"\": \nIncorrect error when having an invalid email: expected %v but got %v",
			ErrInvalidEmail, err)
	}
}

func testValidUserEmail(email string, t *testing.T) {

	newUser := validNewUserExample
	newUser.Email = email

	if err := newUser.Validate(); err != nil {
		t.Errorf("Testing NewUser.Email= \""+newUser.Email+"\": \nIncorrect error when having a valid email: expected %v but got %v",
			nil, err)
	}
}

func testShortPassword(password string, t *testing.T) {
	newUser := validNewUserExample
	newUser.Password = password
	newUser.PasswordConf = password

	if err := newUser.Validate(); err != ErrShortPassword {
		t.Errorf("Testing NewUser.Password= \""+newUser.Password+"\": \nIncorrect error when having a password of length not at least "+strconv.Itoa(minPasswordLength)+" characters: expected %v but got %v",
			ErrShortPassword, err)
	}
}

func testAppropriateLengthPassword(password string, t *testing.T) {
	newUser := validNewUserExample
	newUser.Password = password
	newUser.PasswordConf = password

	if err := newUser.Validate(); err != nil {
		t.Errorf("Testing NewUser.Password= \""+newUser.Password+"\": \nIncorrect error when having appropriate password length (at least "+strconv.Itoa(minPasswordLength)+" characters): expected %v but got %v",
			nil, err)
	}
}

func testMisMatchPassword(password string, confirmPassword string, t *testing.T) {
	newUser := validNewUserExample
	newUser.Password = password
	newUser.PasswordConf = confirmPassword

	if err := newUser.Validate(); err != ErrMismatchPassword {
		t.Errorf("Testing NewUser.Password= \""+newUser.Password+"\" and NewUser.PasswordConf= \""+newUser.PasswordConf+"\": \nIncorrect error when having a mismatched password: expected %v but got %v",
			ErrMismatchPassword, err)
	}
}

func testMatchingPassword(password string, confirmPassword string, t *testing.T) {
	newUser := validNewUserExample
	newUser.Password = password
	newUser.PasswordConf = confirmPassword

	if err := newUser.Validate(); err != nil {
		t.Errorf("Testing NewUser.Password= \""+newUser.Password+"\" and NewUser.PasswordConf= \""+newUser.PasswordConf+"\": \nIncorrect error when having identical password and confirm password: expected %v but got %v",
			nil, err)
	}
}

func testNUemptyUserName(userName string, t *testing.T) {
	newUser := validNewUserExample
	newUser.UserName = userName

	if err := newUser.Validate(); err != ErrEmptyUserName {
		t.Errorf("Testing NewUser.UserName= \""+newUser.UserName+"\": \nIncorrect error when having a zero-length userName: expected %v but got %v",
			ErrEmptyUserName, err)
	}
}

func testNUmanyUserNamesContainsSpaces(t *testing.T) {
	testUserNameContainsSpaces(" ", t)

	for i := 1; i < repeat; i++ {
		userNameLen := rand.Intn(MaxEmailLen) + 2
		randUserName := []byte(GenerateRandomString(userNameLen, false))

		numOfSpaces := rand.Intn(len(randUserName))/4 + 1

		for j := 0; j < numOfSpaces; j++ {
			randSpaceIndex := rand.Intn(len(randUserName))
			randUserName[randSpaceIndex] = ' '
		}
		testUserNameContainsSpaces(string(randUserName), t)
	}
}

func testUserNameContainsSpaces(userName string, t *testing.T) {
	newUser := validNewUserExample
	newUser.UserName = userName

	if err := newUser.Validate(); err != ErrUserNameContainsSpaces {
		t.Errorf("Testing NewUser.UserName= \""+newUser.UserName+"\": \nIncorrect error when userName contains spaces: expected %v but got %v",
			ErrUserNameContainsSpaces, err)
	}
}
