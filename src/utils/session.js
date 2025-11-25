// Session management utilities
export const login = (email, password) => {
  // Simple validation - in real app, this would be an API call
  if (email && password) {
    const userData = {
      email,
      loginTime: new Date().toISOString()
    }
    sessionStorage.setItem('user', JSON.stringify(userData))
    return true
  }
  return false
}

export const logout = () => {
  sessionStorage.removeItem('user')
}

export const checkAuth = () => {
  const user = sessionStorage.getItem('user')
  return !!user
}

export const getUser = () => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : null
}