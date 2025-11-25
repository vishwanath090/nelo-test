import { useState } from 'react'
import { login } from '../utils/session'

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    const success = login(formData.email, formData.password)
    if (success) {
      onLogin()
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-slate-700 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-slate-600 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-slate-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card py-8 px-6 shadow-2xl rounded-2xl border border-slate-600 border-opacity-30">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-slate-700 bg-opacity-50 rounded-xl flex items-center justify-center mb-4 border border-slate-600 border-opacity-30">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-200 text-glow mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-400">
              Sign in to your Task Manager
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-800 border-opacity-50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 px-4 rounded-xl shadow-lg backdrop-blur-sm border border-slate-600 border-opacity-30 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm