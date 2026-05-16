import { useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState(null)

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
          <Dashboard user={user} onLogout={() => setUser(null)} />
        ) : (
          <AuthPage onLogin={setUser} />
        )}
      </main>
    </div>
  )
}

export default App
