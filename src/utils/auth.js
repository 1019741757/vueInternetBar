import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Account = 'Account'
const NetbarId='NetbarId'

export function getName(name) {
  return Cookies.get(name)
}

export function getToken() {
  var Token = Cookies.get(TokenKey);
  return Token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAccount(Contacts) {
  return Cookies.set(Account, Contacts, { expires: 1 })
}
export function removeAccount() {
  return Cookies.remove(Account)
}

export function setNetbarId(Id) {
  return Cookies.set(NetbarId, Id, { expires: 1 })
}
export function removeNetbarId() {
  return Cookies.remove(NetbarId)
}
