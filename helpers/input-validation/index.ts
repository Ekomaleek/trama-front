/* eslint-disable no-useless-escape */

// Password rules:
// No trailing spaces, min 8 characters, at least one lowercase, one uppercase and one special
// Special characters:
// ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < ' : ; | _ ~ ` + = and whitespace
const passwordRegexString = /^(?! )(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W\s_])[A-Za-z\d^$*.[\]{}()?\-"!@#%&\/\\,><':;|_~`+=\s]{8,}(?<! )$/
const passwordRegex = new RegExp(passwordRegexString, 'g')
const passwordErrorMessage = `
  Senha em formato inválido: 
  ela deve conter pelo menos 8 caracteres,
  com no mínimo um maiúsculo, um minúsculo e um especial.
`

export { passwordRegex, passwordErrorMessage }
