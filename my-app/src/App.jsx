import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
    <BrowserRouter>
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
          <Routes>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" replace /> : <AuthPage onLogin={setUser} />
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
            <Route
              path="*"
              element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
