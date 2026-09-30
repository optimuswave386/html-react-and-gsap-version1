import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Login state lives here. The token is still kept in localStorage (so a page
// refresh keeps you signed in); the slice is what every component reads.

function getCookie(name) {
  const match = document.cookie.split('; ').find((c) => c.startsWith(name + '='))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

const storedToken = localStorage.getItem('authToken')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: Boolean(storedToken),
    token: storedToken,
    email: storedToken ? getCookie('email') : null,
    isAdmin: false, // never trusted from storage; confirmed by the server via checkAdmin()
    adminLoaded: false, // true once the server has answered, so routes know whether to wait
  },
  reducers: {
    loginSucceeded: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.email = action.payload.email
    },
    adminChecked: (state, action) => {
      state.isAdmin = action.payload
      state.adminLoaded = true
    },
    loggedOut: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.email = null
      state.isAdmin = false
      state.adminLoaded = false
    },
  },
})

const { loginSucceeded, loggedOut, adminChecked } = authSlice.actions

// Thunks: do the storage/cookie side effects, then update the store.
// Ask the server whether this user is an admin (used on login and on page load).
// Concurrent callers share one request.
let inflight = null
export const checkAdmin = () => (dispatch) => {
  if (inflight) return inflight
  const token = localStorage.getItem('authToken')
  if (!token) return Promise.resolve(dispatch(adminChecked(false)))
  inflight = axios
    .get(import.meta.env.VITE_EXPRESSAPI_URL + 'user/is-admin', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then(({ data }) => dispatch(adminChecked(Boolean(data.is_admin))))
    .catch(() => dispatch(adminChecked(false)))
    .finally(() => { inflight = null })
  return inflight
}

export const login = ({ token, email }) => (dispatch) => {
  localStorage.setItem('authToken', token)
  const expires = new Date()
  expires.setDate(expires.getDate() + 1)
  document.cookie = `email=${encodeURIComponent(email)}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`
  dispatch(loginSucceeded({ token, email }))
  dispatch(checkAdmin())
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('authToken')
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict'
  dispatch(loggedOut())
}

export default authSlice.reducer
