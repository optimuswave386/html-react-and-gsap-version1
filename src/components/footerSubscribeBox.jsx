import { useState } from 'react'
import Axios from 'axios'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FooterSubscribeBox() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')

  // React state replaces the old document.getElementById / style.display juggling.
  async function handleSubmit(event) {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email)) {
      setStatus('error')
      setMessage('A valid email address is required to register.')
      return
    }

    setStatus('sending')
    setMessage('')
    try {
      // server endpoint that sends the email (nodemailer), unchanged
      await Axios.post('http://localhost:3000/subscribe-with-email', { SubscriberEmail: email })
      setEmail('')
      setStatus('success')
      setMessage('Thank you for subscribing!')
    } catch (error) {
      console.error('Error during subscription:', error)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form id="emailsubscribers" className="footer-subscribe" onSubmit={handleSubmit} noValidate>
      <p className="footer-subscribe-text">
        <strong>Stay connected and never miss an update — </strong>
        subscribe to our newsletter and get the latest stories, insights, and exclusive offers delivered straight to your inbox.
      </p>

      <div className="footer-subscribe-row">
        <label htmlFor="newsletter1emailaddress" className="visually-hidden">Email address</label>
        <input
          id="newsletter1emailaddress"
          className="footer-subscribe-input"
          type="email"
          name="SubscriberEmail"
          placeholder="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'sending'}
        />
        <button className="footer-subscribe-btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>

      {message && (
        <p
          id="subscriptionErrorMessage"
          className={`footer-subscribe-msg footer-subscribe-msg-${status}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </form>
  )
}

export default FooterSubscribeBox
