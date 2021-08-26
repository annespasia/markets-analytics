import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'auth-cookie'
// const EXP = 1/(48*60) // hour minute second

export function getToken() {
  const authCookie=Cookies.get(TokenKey)
  // console.log(authCookie)
  return authCookie
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)// {expires: EXP})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//“记住我”
// const userInfoKey = 'auth-cookie'
// const EXP = 0.5 // hour
// export function setUserInfo(data, persistent = true) {
//   if (persistent) {
//     localStorageSetItem(userInfoKey, data)
//   } else {
//     sessionStorage.setItem(userInfoKey, JSON.stringify(data))
//   }
// }

// // EXP * 24 * 60 * 60 * 1 * 1000
// export function getUserInfo() {
//   if (sessionStorage.getItem(userInfoKey)) {
//     return JSON.parse(sessionStorage.getItem(userInfoKey))
//   } else {
//     return localStorageGetItem(userInfoKey, EXP * 60 * 60 * 1 * 1000)
//   }
// }
