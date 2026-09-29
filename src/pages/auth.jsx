// src/pages/auth.jsx — sign in, register and forgot password, one file, three routes.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authSlice.jsx'
import '../assets/css/main.css'
import '../assets/css/auth.css'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import HeaderForLoginPage from '../components/headerForLoginPage.jsx' // real filename casing

const API = import.meta.env.VITE_EXPRESSAPI_URL
// ASSUMPTIONS: only user/login came from your old code. Change these two to your Express routes.
const REGISTER_ENDPOINT = 'user/register'
const FORGOT_ENDPOINT = 'user/forgot-password'

/* ---------- helpers ---------- */

function Field({ id, label, ...inputProps }) {
  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-label">{label}</label>
      <input id={id} name={id} className="auth-input" {...inputProps} />
    </div>
  )
}

// Shared two-column shell: intro on the left, one form card on the right.
function AuthLayout({ eyebrow, title, children }) {
  return (
    <>
      <Header />
      <div className="auth-layout">
        <section className="auth-intro">
          <p className="auth-eyebrow">{eyebrow}</p>
          <h1 className="display-5 fw-bold">{title}</h1>
          <HeaderForLoginPage />
        </section>
        <section className="auth-panel">
          <div className="auth-card">{children}</div>
        </section>
      </div>
      <Footer />
    </>
  )
}

/* ---------- /login ---------- */

export function Login() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const notice = location.state?.notice // e.g. "Account created" from /register

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please enter both email and password.')

    setLoading(true)
    try {
      const { data } = await axios.post(API + 'user/login', { email, password })
      dispatch(login({ token: data.token, email }))
      navigate(location.state?.from || '/dashboard', { state: { email }, replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your email and password and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout eyebrow="Account / Sign in" title="Sign in">
      {isAuthenticated ? (
        <>
          <h2 className="auth-heading">You are logged in</h2>
          <p><Link to="/dashboard">Go to dashboard →</Link></p>
        </>
      ) : (
        <>
          <h2 className="auth-heading">Welcome back 👋</h2>
          <p className="auth-sub">We’re glad to see you again.</p>
          {notice && <p className="auth-alert auth-alert-ok" role="status">{notice}</p>}
          {error && <p className="auth-alert auth-alert-error" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <Field id="email" label="Email address" type="email" placeholder="Enter email"
                   autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field id="password" label="Password" type="password" placeholder="Password"
                   autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <span aria-hidden="true">·</span>
            <Link to="/register">Create an account</Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

/* ---------- /register ---------- */

export function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', age: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) return setError('Name, email and password are required.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')

    setLoading(true)
    try {
      await axios.post(API + REGISTER_ENDPOINT, {
        name: form.name,
        age: form.age ? Number(form.age) : undefined,
        email: form.email,
        password: form.password,
      })
      navigate('/login', { replace: true, state: { notice: 'Account created. You can sign in now.' } })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create the account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout eyebrow="Account / Register" title="Register">
      <h2 className="auth-heading">Create an account</h2>
      <p className="auth-sub">Access is granted to approved users only.</p>
      {error && <p className="auth-alert auth-alert-error" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <Field id="name" label="Name" type="text" placeholder="Enter name" autoComplete="name" value={form.name} onChange={update} />
        <Field id="age" label="Age" type="number" min="0" placeholder="Age" autoComplete="off" value={form.age} onChange={update} />
        <Field id="email" label="Email address" type="email" placeholder="Enter email" autoComplete="email" value={form.email} onChange={update} />
        <Field id="password" label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" value={form.password} onChange={update} />
        <Field id="confirm" label="Confirm password" type="password" placeholder="Repeat password" autoComplete="new-password" value={form.confirm} onChange={update} />
        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
      <p className="auth-links">
        <span>Already have an account?</span>
        <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

/* ---------- /forgot-password ---------- */

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email) return setError('Please enter your email address.')

    setLoading(true)
    try {
      await axios.post(API + FORGOT_ENDPOINT, { email })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout eyebrow="Account / Recovery" title="Forgot password">
      <h2 className="auth-heading">Reset your password</h2>
      {sent ? (
        <p className="auth-alert auth-alert-ok" role="status">
          If an account exists for {email}, a reset link is on its way.
        </p>
      ) : (
        <>
          <p className="auth-sub">Enter your email and we’ll send you a link to choose a new password.</p>
          {error && <p className="auth-alert auth-alert-error" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <Field id="email" label="Email address" type="email" placeholder="Enter email"
                   autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        </>
      )}
      <p className="auth-links"><Link to="/login">← Back to sign in</Link></p>
    </AuthLayout>
  )
}
