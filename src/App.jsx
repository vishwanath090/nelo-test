import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import { checkAuth } from './utils/session'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authStatus = checkAuth()
    setIsAuthenticated(authStatus)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
      </div>
    )
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  )
}

export default App