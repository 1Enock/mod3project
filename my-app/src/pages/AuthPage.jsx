import { useState } from 'react'

function AuthPage({ onLogin }) {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onLogin(trimmedName)
  }

  return (
    <div className="page-card">
      <h2>Welcome to FinPlan</h2>
      <p>Start tracking your spending with a simple app in orange and blue.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
        <button type="submit" className="primary">Start tracking</button>
      </form>
    </div>
  )
}

export default AuthPage
