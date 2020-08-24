const KEY = 'vue_xyAdmin'
const USERINFO_KEY = 'vue_xyAdmin_userInfo'

export function setToken(token) {
  window.localStorage.setItem(KEY, token)
}

export function getToken() {
  return window.localStorage.getItem(KEY)
}

export function removeToken() {
  window.localStorage.removeItem(KEY)
}

export function saveUserInfo(userInfo) {
  var userInfoStr = JSON.stringify(userInfo)
  window.localStorage.setItem(USERINFO_KEY, userInfoStr)
}

export function getUserInfo() {
  var userInfoStr = window.localStorage.getItem(USERINFO_KEY)
  if (userInfoStr !== '' && userInfoStr !== 'undefined') {
    return JSON.parse(userInfoStr)
  } else {
    return {}
  }
}

export function removeUserInfo() {
  window.localStorage.removeItem(USERINFO_KEY)
}

export function clearLoginInfo() {
  removeToken()
  removeUserInfo()
}
