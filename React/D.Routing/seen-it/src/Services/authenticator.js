import requester from './requester'

function isAuth () {
  return sessionStorage.getItem('authtoken') !== null
}

// user/login
function login (username, password) {
  let userData = {
    username,
    password
  }

  return requester.post('user', 'login', 'basic', userData)
}

// user/register
function register (username, password) {
  let userData = {
    username,
    password
  }

  return requester.post('user', '', 'basic', userData)
}

// user/logout
function logout () {
  let logoutData = {
    authtoken: sessionStorage.getItem('authtoken')
  }
  
  return requester.post('user', '_logout', 'kinvey', logoutData)
}

// saveSession in sessionStorage
function saveSession (userInfo) {
  let userAuth = userInfo._kmd.authtoken
  sessionStorage.setItem('authtoken', userAuth)
  let username = userInfo.username
  sessionStorage.setItem('username', username)
}

// Clear session`in sessionStorage
function clearSession () {
  sessionStorage.removeItem('authtoken')
  sessionStorage.removeItem('username')
}

export default {
  isAuth,
  login,
  register,
  logout,
  saveSession,
  clearSession
}
