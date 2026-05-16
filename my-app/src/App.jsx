import { useState, useEffect } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import { subscribeAuth } from './firebase'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = subscribeAuth((fbUser) => {
      setUser(fbUser)
    })
    return unsub
  }, [])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <div className="brand-flag"></div>
          <div>
            <h1>FinPlan</h1>
            <p>Simple spending tracker</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <AuthPage onLogin={setUser} />
        )}
      </main>
    </div>
  )
}

export default App
