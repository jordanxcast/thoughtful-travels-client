import config from '../config'

const TokenService = {
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  clearAuthToken(){
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
}

export default TokenService