import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp, signInWithGoogle } from '../firebase'

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formatFirebaseError = (err, provider) => {
    const code = err?.code || ''
    if (code === 'auth/configuration-not-found') {
      if (provider === 'google') {
        return 'Google sign-in is not enabled for this Firebase project. Enable Google under Authentication → Sign-in method.'
      }
      return 'Email/password sign-in is not enabled for this Firebase project. Enable Email/Password under Authentication → Sign-in method.'
    }
    if (code === 'auth/user-not-found') {
      return 'No account exists with that email. Please sign up first.'
    }
    if (code === 'auth/wrong-password') {
      return 'Incorrect password. Please try again.'
    }
    if (code === 'auth/invalid-email') {
      return 'The email address is not valid.'
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google sign-in popup was closed. Please try again.'
    }
    return err?.message || 'An unexpected authentication error occurred.'
  }

  const handleLoginSuccess = (user) => {
    onLogin && onLogin(user)
    navigate('/dashboard')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      let res
      if (mode === 'signin') res = await signIn(email, password)
      else res = await signUp(email, password)
      handleLoginSuccess(res.user)
    } catch (err) {
      setError(formatFirebaseError(err, mode))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await signInWithGoogle()
      handleLoginSuccess(res.user)
    } catch (err) {
      setError(formatFirebaseError(err, 'google'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-card">
      <h2>Welcome to FinPlan</h2>
      <p>Sign in or create an account to start tracking your spending.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <div style={{ color: 'crimson' }}>{error}</div>}

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="primary" disabled={loading}>
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleGoogle}
            disabled={loading}
          >
            Continue with Google
          </button>
        </div>
      </form>

      <p style={{ marginTop: 12 }}>
        {mode === 'signin' ? (
          <>
            New here?{' '}
            <button type="button" onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: '#0066d6', cursor: 'pointer', fontWeight: 700 }}>
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button type="button" onClick={() => setMode('signin')} style={{ background: 'none', border: 'none', color: '#0066d6', cursor: 'pointer', fontWeight: 700 }}>
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  )
}

export default AuthPage
