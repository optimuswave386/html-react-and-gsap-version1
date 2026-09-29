import { createSlice } from '@reduxjs/toolkit'

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
  },
  reducers: {
    loginSucceeded: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.email = action.payload.email
    },
    loggedOut: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.email = null
    },
  },
})

const { loginSucceeded, loggedOut } = authSlice.actions

// Thunks: do the storage/cookie side effects, then update the store.
export const login = ({ token, email }) => (dispatch) => {
  localStorage.setItem('authToken', token)
  const expires = new Date()
  expires.setDate(expires.getDate() + 1)
  document.cookie = `email=${encodeURIComponent(email)}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`
  dispatch(loginSucceeded({ token, email }))
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('authToken')
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict'
  dispatch(loggedOut())
}

export default authSlice.reducer
