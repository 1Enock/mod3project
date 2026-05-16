import { useState } from 'react'
import { signIn, signUp, signInWithGoogle } from '../firebase'

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      let res
      if (mode === 'signin') res = await signIn(email, password)
      else res = await signUp(email, password)
      onLogin && onLogin(res.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await signInWithGoogle()
      onLogin && onLogin(res.user)
    } catch (err) {
      setError(err.message)
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
