import Cookies from 'js-cookie'

const tokenKey = 'SW_token'
const userKey = 'UserId'
export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function setUserId(userId) {
  return Cookies.set(userKey, userId)
}
export function getUserId(userId) {
  return Cookies.get(userKey)
}

export function removeToken() {
  Cookies.remove(userKey)
  return Cookies.remove(tokenKey)
}
