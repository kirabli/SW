import Cookies from 'js-cookie'

const TokenKey = 'SW_token'
const UserKey = 'UserId'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(userId) {
  return Cookies.set(UserKey, userId)
}
export function getUserId(userId) {
  return Cookies.get(UserKey)
}