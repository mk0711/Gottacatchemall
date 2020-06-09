package users

import (
	"math/rand"
	"time"
)

// GenerateRandomString generate a random string with specified length and if it has special symbols
// from: https://yourbasic.org/golang/generate-random-string/
func GenerateRandomString(length int, hasSpecialSymbols bool) string {
	if length == 0 {
		return ""
	}
	rand.Seed(time.Now().UnixNano())
	digits := "0123456789"
	specials := "~=+%^*/()[]{}/!@#$?|"
	if !hasSpecialSymbols {
		specials = ""
	}
	all := "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		digits + specials

	if length == 1 {
		return string(all[rand.Intn(len(all))])
	}

	buf := make([]byte, length)
	buf[0] = digits[rand.Intn(len(digits))]
	if hasSpecialSymbols {
		buf[1] = specials[rand.Intn(len(specials))]
	} else {
		buf[1] = all[rand.Intn(len(digits))]
	}
	for i := 2; i < length; i++ {
		buf[i] = all[rand.Intn(len(all))]
	}
	rand.Shuffle(len(buf), func(i, j int) {
		buf[i], buf[j] = buf[j], buf[i]
	})
	str := string(buf) // E.g. "3i[g0|)z"
	return str
}

func generatePassword(length int) string {
	randPasswordLength := length
	randPassword := GenerateRandomString(randPasswordLength, true)
	return randPassword
}

func generateValidUserEmail() string {
	maxEmailLen := 20
	randUsernameLength := rand.Intn(maxEmailLen) + 1
	randUsername := GenerateRandomString(randUsernameLength, false)
	randDomainLength := rand.Intn(8) + 1
	randDomain := GenerateRandomString(randDomainLength, false)

	randEmail := randUsername + "@" + randDomain
	return randEmail
}

// GenerateValidNewUser this function generate a valid new user for testing purposes
func GenerateValidNewUser() *NewUser {
	newUser := &NewUser{}
	newUser.Email = generateValidUserEmail()
	newUser.Password = generatePassword(minPasswordLength)
	newUser.PasswordConf = newUser.Password

	nameLen := rand.Intn(6) + 5
	newUser.UserName = GenerateRandomString(nameLen, false)

	newUser.FirstName = GenerateRandomString(nameLen, false)
	newUser.LastName = GenerateRandomString(nameLen, false)
	return newUser
}
