import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { getToken, login as doLogin, logout as doLogout } from '../services/authService'
import type { LoginCredentials } from '../services/authService'

interface AuthContextValue {
  isAuthenticated: boolean
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken())

  const login = useCallback(async (credentials: LoginCredentials) => {
    await doLogin(credentials)
    setToken(getToken())
  }, [])

  const logout = useCallback(() => {
    doLogout()
    setToken(null)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(token),
    token,
    login,
    logout,
  }), [token, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


